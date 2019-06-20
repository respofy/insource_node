import models from 'database/modelBootstrap'
import ka from 'lang/ka'
import moment from 'moment'
import jwt from 'jsonwebtoken'
import sequelize from 'sequelize'
// import nodemailer from 'nodemailer'
import generator from '../../../helper/Generator'
import AuthService from 'modules/users/services/AuthService'
import mailgun from 'mailgun-js'

const operator = sequelize.Op

/**
 * company service
 */
class CompanyService {
	/**
	 * Fill company data
	 */
	static async register(user_id, data, image_path) {
		// create company from service
		let createdCompany = await models.Company.create({
			name: data.name,
			industry_id: data.industry_id,
			identification_code: data.identification_code,
			logo: image_path
		})
		// attach user to owners
		await createdCompany.addOwner(user_id)
		// return result
		return createdCompany
	}

	/**
	 * Generate new token after company registration
	 */
	static async newCompanyToken(req, created_company) {
		// push new company inside request.companies
		req.companies.push({ id: created_company.id })
		// new object for token
		let newToken = {
			user: req.user,
			companies: req.companies
		}
		// sign and return new token
		return jwt.sign(newToken, process.env.JWT_SECRET)
	}

	/**
	 * Invite user in company by active company id
	 */
	static async inviteUsers(company_id, user_emails) {
		// find company
		let company = await models.Company.findByPk(company_id)
		// generate random hash
		let hash = generator.getRandomString(40)
		// save hash to db
		await models.InviteHash.create({ hash, company_id })

		// send email
		const mg = mailgun({ apiKey: 'key-f25a884c247378aa8dd34083fe6e4b28', domain: 'sandbox454409b9d64449f7b661a00c48d6a721.mailgun.org' })
		const data = {
			from: '<me@samples.mailgun.org>',
			to: user_emails,
			subject: 'Hello',
			text: `Dear  user you have been invited in ${company.name} <a href="http://localhost:3000/company/join/${hash}/">Join company by hash: ${hash}</a>`
		}
		mg.messages().send(data, function(error, body) {
			console.log(body)
		})

		return true

		// // Generate test SMTP service account from ethereal.email
		// let testAccount = await nodemailer.createTestAccount()
		// // create reusable transporter object using the default SMTP transport
		// let transporter = nodemailer.createTransport({
		// 	host: 'smtp.ethereal.email',
		// 	port: 587,
		// 	secure: false, // true for 465, false for other ports
		// 	auth: {
		// 		user: testAccount.user, // generated ethereal user
		// 		pass: testAccount.pass // generated ethereal password
		// 	}
		// })

		// send mail with defined transport object
		// let info = await transporter.sendMail({
		// 	from: '"Fred Foo 👻" <foo@example.com>', // sender address
		// 	to: user_emails, // list of receivers
		// 	subject: `Invitation from ${company.name}`, // Subject line
		// 	text: `Dear  user you have been invited in ${company.name}`, // plain text body
		// 	html: `<a href="http://localhost:3000/company/join/${hash}/">Join company by hash: ${hash}</a>` // html body
		// })

		// return nodemailer.getTestMessageUrl(info)
	}

	static async checkInviteHash(hash) {
		// set valid duration
		let duration = moment.duration(`${process.env.INVITE_HASH_LIFETIME}`)
		// get current date
		let date = moment()
		// subtract time
		date.subtract(duration)
		// try to fetch valid hash record
		let inviteHash = await models.InviteHash.findOne({
			where: {
				[operator.and]: {
					hash,
					// created_at should be bigger then subtracted date
					created_at: {
						[operator.gt]: date
					}
				}
			}
		})
		// return hash if found
		if (inviteHash) {
			return inviteHash
		} else {
			throw new Error(ka.company.hash_error)
		}
	}

	/**
	 * verify candidate
	 */
	static async verifyCompanyJoin(phone, code, company_id) {
		// sms code verification
		let verification = await AuthService.verify(phone, code)
		if (verification) {
			// check user
			let user = await models.User.findOne({ where: { phone } })
			if (user) {
				// fetch company
				let company = await models.Company.findByPk(company_id)
				// add user in company
				await company.addOwners(user.id)
			} else {
				throw new Error(ka.company.invited_user_error)
			}
		} else {
			throw new Error(ka.company_code_error)
		}
	}

	/**
	 * Search companies by name (criteria)
	 */
	static async searchCompaniesByName(criteria, user_id) {
		// get list of companies
		let companies = await models.Company.findAll({
			where: {
				name: {
					[operator.like]: `%${criteria}%`
				}
			},
			include: [
				{
					model: models.User,
					as: 'FavouredByUsers',
					where: {
						id: user_id
					},
					required: false
				},
				{
					model: models.Industry
				}
			]
		})
		// response
		return companies
	}

	/**
	 * Get list of companies that user owns
	 */
	static async getUserOwnedCompanies(user_id) {
		// get user instance
		let user = await models.User.findByPk(user_id)
		// returns result
		return await user.getOwnedCompanies()
	}

	/**
	 * Get list of companies that user owns
	 */
	static async leftStats(company_id) {
		// job user
		let interested = await models.User.findAndCountAll({
			include: {
				model: models.JobUser,
				where: {
					approved_by_user: true
				},
				include: {
					model: models.Job,
					where: {
						company_id
					}
				}
			}
		})

		// job user
		let interview = await models.Meeting.findAndCountAll({
			where: {
				company_id
			}
		})

		return { interested, interview }
		//     {
		// 	include: {
		// 		model: models.Job,
		// 		where: {
		// 			company_id,
		// 			active: 1
		// 			// started_at: {
		// 			// 	[operator.lte]: moment()
		// 			// },
		// 			// finished_at: {
		// 			// 	[operator.gte]: moment()
		// 			// }
		// 		}
		// 	}
		// }

		// job user
		// let finishing = await models.JobUser.findAndCountAll({
		// 	where: {
		// 		user_id
		// 	},
		// 	include: {
		// 		model: models.Job,
		// 		where: {
		// 			active: 1,
		// 			finished_at: {
		// 				[operator.gte]: moment().subtract(5, 'days')
		// 			}
		// 		}
		// 	}
		// })
	}
}

export default CompanyService
