// import moment from 'moment'
import models from 'database/modelBootstrap'
import sequelize from 'sequelize'
const operator = sequelize.Op
/**
 * Report Service
 */
class CompanyReportService {
	/**
	 * most wanted possition
	 */
	static async mostWantedPositions(industry_id, date_from, date_to) {
		// professions
		let professions = await models.Role.findAll({
			// TODO: get by dates and industry
			include: {
				model: models.Job,
				where: {
					started_at: {
						[operator.lte]: date_to
					},
					finished_at: {
						[operator.gte]: date_from
					}
				},
				include: {
					model: models.Company,
					where: {
						industry_id
					}
				}
			}
		})

		let result = []
		professions.forEach(profession => {
			// minimum sallary
			let minSallary = []
			let maxSallary = []
			let averageSallary = []

			profession.jobs.forEach(job => {
				// put into result
				minSallary.push(job.salary_from)
				maxSallary.push(job.salary_to)
				averageSallary.push(job.salary_from)
				averageSallary.push(job.salary_to)
			})

			if (profession.jobs.length) {
				// push to result
				result.push({
					id: profession.id,
					title: profession.title,
					job_length: profession.jobs.length,
					min_sallary: Math.min(...minSallary),
					max_sallary: Math.max(...maxSallary),
					avr_sallary: averageSallary.reduce((a, b) => a + b, 0) / averageSallary.length
				})
			}
		})

		return result
	}

	/**
	 * most wanted professions
	 */
	static async mostWantedProfessions(industry_id, date_from, date_to) {
		// professions
		let professions = await models.Profession.findAll({
			include: {
				model: models.Job,
				where: {
					started_at: {
						[operator.lte]: date_to
					},
					finished_at: {
						[operator.gte]: date_from
					}
				},
				include: {
					model: models.Company,
					where: {
						industry_id
					}
				}
			}
		})

		let result = []
		professions.forEach(profession => {
			// minimum sallary
			let minSallary = []
			let maxSallary = []
			let averageSallary = []

			profession.jobs.forEach(job => {
				// put into result
				minSallary.push(job.salary_from)
				maxSallary.push(job.salary_to)
				averageSallary.push(job.salary_from)
				averageSallary.push(job.salary_to)
			})

			// push to result
			if (profession.jobs.length) {
				result.push({
					id: profession.id,
					title: profession.title,
					job_length: profession.jobs.length,
					min_sallary: Math.min(...minSallary),
					max_sallary: Math.max(...maxSallary),
					avr_sallary: averageSallary.reduce((a, b) => a + b, 0) / averageSallary.length
				})
			}
		})

		return result
	}

	/**
	 * active industries
	 */
	static async activeIndustries(date_from, date_to) {
		// professions
		let industries = await models.Industry.findAll({
			include: {
				model: models.Company,
				include: {
					model: models.Job,
					where: {
						started_at: {
							[operator.lte]: date_to
						},
						finished_at: {
							[operator.gte]: date_from
						}
					}
				}
			}
		})

		let result = []
		industries.forEach(industry => {
			// push to result
			if (industry.companies[0]) {
				if (industry.companies[0].jobs) {
					result.push({
						id: industry.id,
						title: industry.title,
						job_length: industry.companies[0].jobs.length
					})
				}
			}
		})

		return result
	}

	/**
	 * top companies
	 */
	static async topCompanies(industry_id) {
		// professions
		let companies = await models.Company.findAll({
			where: {
				industry_id
			},
			include: {
				model: models.User,
				as: 'FavouredByUsers'
			}
		})

		let result = []
		companies.forEach(company => {
			// push to result
			if (company.FavouredByUsers) {
				result.push({
					id: company.id,
					title: company.name,
					logo: company.logo,
					favoured_by_users: company.FavouredByUsers.length
				})
			}
		})

		return result
	}

	/**
	 * most wanted possition
	 */
	static async mostWantedEducation(industry_id, date_from, date_to, profession_id, position_id) {
		let extraFilter = {}
		if (profession_id) {
			extraFilter.profession_id = profession_id
		}
		if (position_id) {
			extraFilter.role_id = position_id
		}

		// degrees
		let degrees = await models.Degree.findAll({
			include: {
				model: models.Job,
				where: {
					started_at: {
						[operator.lte]: date_to
					},
					finished_at: {
						[operator.gte]: date_from
					},
					...extraFilter
				},
				include: {
					model: models.Company,
					where: {
						industry_id
					}
				}
			}
		})

		let result = []
		degrees.forEach(degree => {
			// push to result
			if (degree.jobs.length) {
				result.push({
					id: degree.id,
					title: degree.title,
					job_length: degree.jobs.length
				})
			}
		})

		return result
	}

	/**
	 * most wanted langauge
	 */
	static async mostWantedLanguage(industry_id, date_from, date_to, profession_id, position_id) {
		let extraFilter = {}
		if (profession_id) {
			extraFilter.profession_id = profession_id
		}
		if (position_id) {
			extraFilter.role_id = position_id
		}

		// languages
		let languages = await models.Language.findAll({
			include: {
				model: models.Job,
				where: {
					started_at: {
						[operator.lte]: date_to
					},
					finished_at: {
						[operator.gte]: date_from
					},
					...extraFilter
				},
				include: {
					model: models.Company,
					where: {
						industry_id
					}
				}
			}
		})

		let result = []
		languages.forEach(Language => {
			// push to result
			if (Language.jobs.length) {
				result.push({
					id: Language.id,
					title: Language.title,
					job_length: Language.jobs.length
				})
			}
		})

		return result
	}
}

export default CompanyReportService
