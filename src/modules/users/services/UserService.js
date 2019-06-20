import models from 'database/modelBootstrap'
import ka from 'lang/ka'
import AuthService from '../services/AuthService'
import moment from 'moment'
import sequelize from 'sequelize'
import InterestService from '../services/InterestService'
const operator = sequelize.Op

/**
 * User Services
 */
class UserService {
	/**
	 * Set profile info
	 */
	static async setProfileInfo(user_id, data, avatar) {
		// get user
		let user = await AuthService.authUser(user_id)
		// update user
		return await user.update({
			name: data.name,
			surname: data.surname,
			birthday: data.birthday,
			avatar: avatar,
			gender: data.gender,
			city_id: data.city_id,
			status_id: data.status_id,
			incognito: data.incognito,
			about_me: data.about_me
		})
	}

	static async getProfileInfo(user_id) {
		// get user
		return await models.User.findOne({
			where: { id: user_id },
			attributes: ['name', 'surname', 'gender', 'avatar', 'birthday', 'about_me', 'incognito'],
			include: [
				{
					model: models.Status,
					attributes: ['id', 'title']
				},
				{
					model: models.City,
					attributes: ['id', 'name']
				},
				{
					model: models.UserProfession,
					where: {
						active: true
					},
					include: {
						model: models.Profession,
						required: false
					},
					required: false
				}
			]
		})
	}

	/**
	 * add user working experience
	 */
	static async addWorkingExperience(user_id, params) {
		// create working experience item
		let newWorkingExp = await models.UserWorkingExperience.create({
			started_at: params.started_at,
			finished_at: params.finished_at,
			company_name: params.company.name,
			company_id: params.company.id,
			user_id: user_id,
			profession_id: params.profession_id,
			role_id: params.role_id
		})
		// create skill record if id equals null
		params.skills.forEach(async item => {
			// check if item does not have id
			if (item.id == null) {
				let skill = await models.Skill.create({
					title: item.title
				})
				// after creating skill record, relate the record to profession
				// get profession instance
				let profession = await models.Profession.findByPk(params.profession_id)
				// attach skill to profession
				await profession.addSkill(skill.id)
				// associate new skill with user working experience
				await newWorkingExp.addWorkingExpSkill(skill.id)
			}
			// associate existing skill with user working experience
			await newWorkingExp.addWorkingExpSkill(item.id)
		})
	}

	/**
	 * update working experience
	 */
	// eslint-disable-next-line no-unused-vars
	static async updateWorkingExperience(id, user_id, params) {
		// get instance of working exp
		let workingExp = await models.UserWorkingExperience.findByPk(id)
		// update working exp
		let updatedWorkingExp = await workingExp.update({
			started_at: params.started_at,
			finished_at: params.finished_at,
			company_name: params.company.name,
			company_id: params.company.id,
			user_id: user_id,
			profession_id: params.profession_id,
			role_id: params.role_id
		})
		// skills[id] that needs to be set (delete others)
		let currentSkills = []
		// create skill record if id equals null
		params.skills.forEach(async item => {
			// check if item does not have id
			if (item.id == null) {
				let skill = await models.Skill.create({
					title: item.title
				})
				// push in new skills in currentSkills
				currentSkills.push(skill.id)
				// after creating skill record, relate the record to profession
				// get profession instance
				let profession = await models.Profession.findByPk(params.profession_id)
				// attach skill to profession
				await profession.addSkill(skill.id)
				// associate new skill with user working experience
				await workingExp.addWorkingExpSkill(skill.id)
			}
			// push new skill to current skills
			currentSkills.push(item.id)
		})
		// set skills using currentSkills array
		// associate existing skill with user working experience
		await workingExp.setWorkingExpSkills(currentSkills)

		return updatedWorkingExp
	}

	/**
	 * delete working experience
	 */
	static async deleteWorkingExperience(id, user_id) {
		// get working experience by id
		let workingExp = await models.UserWorkingExperience.findOne({ where: { id, user_id } })
		// delete working experience
		return await workingExp.destroy()
	}

	/**
	 * Get all working experience
	 */
	static async listWorkingExperiences(userId) {
		// get auth user
		let user = await AuthService.authUser(userId)
		// read user working experiences
		return await user.getUserWorkingExperiences({
			attributes: ['id', 'started_at', 'finished_at', 'company_name'],
			include: [models.Role, models.Company, models.Profession, 'workingExpSkills'],
			order: [['started_at', 'DESC']]
		})
	}

	/** -------------------------------------------------------------------- */

	/**
	 * add language to user
	 */
	static async addLanguage(user_id, data) {
		// create the item
		return await models.UserLanguage.create({
			user_id: user_id,
			language_id: data.language_id,
			language_knowledge_id: data.language_knowledge_id
		})
	}

	/**
	 * Update user language
	 */
	static async updateLanguage(id, data) {
		// get working experience by id
		let userLanguage = await models.UserLanguage.findOne({ where: { id } })
		// update working experience
		let updatedUserLanguage = await userLanguage.update({
			language_id: data.language_id,
			language_knowledge_id: data.language_knowledge_id
		})
		// return updated record
		return updatedUserLanguage
	}

	/**
	 * delete user language
	 */
	static async deleteLanguage(id) {
		// get working experience by id
		let userLanguage = await models.UserLanguage.findOne({ where: { id } })
		// delete working experience
		return await userLanguage.destroy()
	}

	/**
	 * Read all user languages
	 */
	static async readLanguages(user_id) {
		// get auth user
		let user = await AuthService.authUser(user_id)
		// read user working experiences
		return await user.getUserLanguages({
			attributes: ['id'],
			include: [models.Language, models.LanguageKnowledge] // get relationship
		})
	}

	/** -------------------------------------------------------------------- */

	/**
	 * create record for user and education
	 */
	static async addEducation(user_id, data) {
		// create the user education
		let education = models.UserEducation.create({
			user_id: user_id,
			started_at: data.started_at,
			finished_at: data.finished_at,
			degree_id: data.degree_id,
			university_id: data.university_id,
			faculty_id: data.faculty_id
		})
		// create working experience
		return education
	}

	/**
	 * Update user education
	 */
	static async updateEducation(id, data) {
		// get working experience by id
		let userEducation = await models.UserEducation.findOne({ where: { id } })
		// update working experience
		let updatedUserEducation = await userEducation.update({
			started_at: data.started_at,
			finished_at: data.finished_at,
			degree_id: data.degree_id,
			university_id: data.university_id,
			faculty_id: data.faculty_id
		})
		// return updated record
		return updatedUserEducation
	}

	/**
	 * Delete user education
	 */
	static async deleteEducation(id, user_id) {
		// get instance by id
		let userEducation = await models.UserEducation.findOne({ where: { id, user_id } })
		// check result
		if (userEducation === null) {
			throw new Error()
		}
		// destroy record
		return await userEducation.destroy()
	}

	/**
	 * get list of user education
	 */
	static async readEducation(userId) {
		// get auth user instance
		let user = await models.User.findByPk(userId)
		// fetch and return list of user education
		return await user.getUserEducations({
			attributes: ['id', 'started_at', 'finished_at'],
			include: [models.Degree, models.University, models.Faculty]
		})
	}

	/** -------------------------------------------------------------------- */

	/**
	 * create user certificate
	 */
	static async addCertificate(user_id, data) {
		// create new certificate and attach to user
		let certificate = await models.UserCertificate.create({
			user_id: user_id,
			title: data.title,
			additional_information: data.additional_information,
			website: data.website,
			issue_date: data.issue_date
		})
		// response
		return certificate
	}

	/**
	 * update user certificate
	 */
	static async updateCertificate(id, data) {
		// get working experience by id
		let userCertificate = await models.UserCertificate.findOne({ where: { id } })
		// update working experience
		let updatedUserCertificate = await userCertificate.update({
			title: data.title,
			additional_information: data.additional_information,
			website: data.website,
			issue_date: data.issue_date
		})
		// return updated record
		return updatedUserCertificate
	}

	/**
	 * delete certificate
	 */
	static async deleteCertificate(id) {
		// get instance by id
		let userCertificate = await models.UserCertificate.findOne({ where: { id } })
		// destroy record
		return await userCertificate.destroy()
	}

	/**
	 * Get list of user certificates
	 */
	static async readCertificate(user_id) {
		// get user instance
		let user = await models.User.findByPk(user_id)
		// return result
		return await user.getUserCertificates()
	}

	/** -------------------------------------------------------------------- */

	/**
	 * Create qualification
	 */
	static async createQualification(user_id, data) {
		return await models.UserQualification.create({
			user_id: user_id,
			qualification_id: data.qualification_id,
			started_at: data.started_at,
			finished_at: data.finished_at
		})
	}

	/**
	 * Read auth user qualifications
	 */
	static async readQualifications(user_id) {
		// get auth user
		let user = await AuthService.authUser(user_id)
		// get qualifications
		return await user.getUserQualifications({
			attributes: ['id', 'user_id', 'qualification_id', 'started_at', 'finished_at'],
			include: { model: models.Qualification }
		})
	}

	/**
	 * Update qualifications
	 */
	static async updateQualification(id, data) {
		// fetch record by id
		let qualification = await models.UserQualification.findByPk(id)
		// update record
		let updatedQualification = await qualification.update({
			qualification_id: data.qualification_id,
			started_at: data.started_at,
			finished_at: data.finished_at
		})
		// return result
		return updatedQualification
	}

	/**
	 * Delete qualification
	 */
	static async deleteQualification(id) {
		// fetch record by id
		let qualification = await models.UserQualification.findByPk(id)
		// delete
		return await qualification.destroy()
	}

	/** -------------------------------------------------------------------- */

	/**
	 * check the user by different criteria
	 */
	static async create(data, avatar) {
		return await models.User.create({
			password: data.password,
			phone: data.phone,
			name: data.name,
			surname: data.surname,
			gender: data.gender,
			avatar: avatar,
			birthday: data.birthday,
			city_id: data.city_id
		})
	}

	/**
	 * Update user data, filter by criteria and update by newValues
	 */
	static async update(criteria, values) {
		// find user
		let user = await models.User.findOne({ where: criteria })
		// update user password
		let updatedUser = await user.update(values)
		// validate process
		if (updatedUser === null) {
			throw new Error(ka.auth.user_not_updated)
		}
		return updatedUser
	}

	/**
	 *
	 */
	static async getFavoriteCompanies(user_id) {
		// get auth user
		let user = await AuthService.authUser(user_id)
		// return favorite companies
		return await user.getFavoriteCompanies({
			attributes: ['id', 'name', 'logo', 'identification_code'],
			include: [models.Industry]
		})
	}

	/**
	 * Add company to favorites
	 */
	static async addCompanyToFavorites(user_id, company_id) {
		// get auth user instance
		let user = await models.User.findByPk(user_id)
		// add company to favorites by company_id
		return await user.addFavoriteCompany(company_id)
	}

	/**
	 * Remove company from favorites
	 */
	static async removeCompanyFromFavorites(user_id, company_id) {
		// get auth user instance
		let user = await models.User.findByPk(user_id)
		// remove company to favorites by company_id
		return await user.removeFavoriteCompany(company_id)
	}

	/**
	 * Get active company
	 */
	static async getActiveCompany(user_id) {
		// get user instance
		let user = await models.User.findByPk(user_id)
		// get active company id
		return await models.Company.findByPk(user.active_company_id)
	}

	/**
	 * Get active company
	 */
	static async jobs(user_id, filter) {
		// criteria
		let criteria = {
			user_id,
			approved_by_user: false
		}

		// swich case
		switch (filter) {
		case 'all':
			break
		case 'new':
			criteria = {
				...criteria,
				created_at: {
					[operator.gte]: moment().subtract(5, 'days')
				}
			}
			break
		case 'best':
			criteria = {
				...criteria,
				percentage: {
					[operator.gte]: 80
				}
			}
			break
		case 'finishing':
			criteria = {
				...criteria,
				created_at: {
					[operator.lte]: moment().subtract(25, 'days')
				}
			}
			break
		case 'favourite':
			criteria = {
				...criteria
			}
			// TODO: criteria for favourite
			break
		}

		// return jobs for user
		return await models.JobUser.findAll({
			where: criteria,
			include: [
				{
					model: models.Job,
					attributes: ['id', 'started_at', 'finished_at', 'title', 'salary_from', 'salary_to', 'experience_from', 'experience_to', 'description'],
					include: [
						{
							model: models.Company,
							attributes: ['id', 'name', 'logo'],
							include: [
								{
									model: models.Industry,
									attributes: ['id', 'title']
								},
								{
									model: models.User,
									as: 'FavouredByUsers',
									where: {
										id: user_id
									},
									required: false
								}
							]
						},
						{ model: models.WorkingType, attributes: ['id', 'title'] },
						{ model: models.City, attributes: ['id', 'name'] },
						{ model: models.Role, attributes: ['id', 'title'] },
						{ association: 'jobSkill', through: { attributes: [] } },
						{ association: 'jobQualification', through: { attributes: [] } },
						{ model: models.Profession, attributes: ['id', 'title'] },
						{ model: models.Degree, attributes: ['id', 'title'] },
						{ model: models.Language, attributes: ['id', 'title'] },
						{ model: models.LanguageKnowledge, attributes: ['id', 'title', 'weight'] }
					]
				}
			]
		})
	}

	/**
	 *
	 */
	static async jobsDetail(job_id, user_id) {
		/**
		 *
		 */
		return await models.JobUser.findOne({
			where: {
				job_id,
				user_id
			},
			include: {
				model: models.Job,
				attributes: ['id', 'started_at', 'finished_at', 'title', 'salary_from', 'salary_to', 'experience_from', 'experience_to', 'description'],
				include: [
					{
						model: models.Company,
						attributes: ['id', 'name', 'logo'],
						include: [
							{
								model: models.Industry,
								attributes: ['id', 'title']
							},
							{
								model: models.User,
								as: 'FavouredByUsers',
								where: {
									id: user_id
								},
								required: false
							}
						]
					},
					{ model: models.WorkingType, attributes: ['id', 'title'] },
					{ model: models.City, attributes: ['id', 'name'] },
					{ model: models.Role, attributes: ['id', 'title'] },
					{ association: 'jobSkill', through: { attributes: [] } },
					{ association: 'jobQualification', through: { attributes: [] } },
					{ model: models.Profession, attributes: ['id', 'title'] },
					{ model: models.Degree, attributes: ['id', 'title'] },
					{ model: models.Language, attributes: ['id', 'title'] },
					{ model: models.LanguageKnowledge, attributes: ['id', 'title', 'weight'] }
				]
			}
		})
	}

	/**
	 *
	 */
	static async jobsApprove(job_id, user_id) {
		// job user
		let JobUser = await models.JobUser.findOne({
			where: {
				job_id,
				user_id
			}
		})

		// return update
		return await JobUser.update({
			approved_by_user: true
		})
	}

	/**
	 *
	 */
	static async leftStats(user_id) {
		// job user
		let total = await models.JobUser.findAndCountAll({
			where: {
				user_id
			},
			include: {
				model: models.Job,
				where: {
					active: 1,
					started_at: {
						[operator.lte]: moment()
					},
					finished_at: {
						[operator.gte]: moment()
					}
				}
			}
		})

		// job user
		let finishing = await models.JobUser.findAndCountAll({
			where: {
				user_id
			},
			include: {
				model: models.Job,
				where: {
					active: 1,
					finished_at: {
						[operator.gte]: moment().subtract(5, 'days')
					}
				}
			}
		})

		return { total, finishing }
	}

	/**
	 *
	 */
	static async userFullInfo(user_id) {
		// return the data
		return {
			profileInfo: await this.getProfileInfo(user_id),
			workingExperiences: await this.listWorkingExperiences(user_id),
			languages: await this.readLanguages(user_id),
			educations: await this.readEducation(user_id),
			qualifications: await this.readQualifications(user_id),
			certificates: await this.readCertificate(user_id),
			interests: await InterestService.getInterests(user_id)
		}
	}
}

export default UserService
