import models from 'database/modelBootstrap'
// import AuthService from '../services/AuthService'
import moment from 'moment'

import sequelize from 'sequelize'
const operator = sequelize.Op

class InterestService {
	/**
	 * set interest for user
	 */
	static async setInterest(user_id, request) {
		// set sallary to user wishlist
		this.setSalary(user_id, request.salary)
		// set multiple industries to user
		this.setRole(user_id, request.roles)
		// set profession
		this.setProfession(user_id, request.profession)
		// set skills
		this.setSkills(user_id, request.skills)
		// set multiple industries to user
		this.setIndustry(user_id, request.industries)
		// set multiple industries to user
		this.setWorkingType(user_id, request.working_type)
	}

	/**
	 * Set salary interest to user
	 */
	static async setSalary(user_id, salary_amount) {
		// find or create
		models.Salary.findOrCreate({
			where: {
				user_id: user_id,
				salary_amount: salary_amount,
				active: true
			},
			defaults: {
				user_id: user_id,
				salary_amount: salary_amount,
				started_at: moment.now()
			}
		})
		// update
		models.Salary.update(
			{ active: false, finished_at: moment.now() },
			{
				where: {
					salary_amount: {
						[operator.not]: salary_amount
					},
					user_id: user_id,
					active: true
				}
			}
		)

		return true
	}

	/**
	 * Set role interest to user
	 */
	static async setRole(user_id, roles) {
		// iterate the industries
		// set new industry if the isdusty is not set
		roles.map(roles => {
			// set the active industries
			models.UserRole.findOrCreate({
				where: {
					user_id: user_id,
					role_id: roles,
					active: true
				},
				defaults: {
					user_id: user_id,
					role_id: roles,
					started_at: moment.now(),
					active: true
				}
			})
		})
		// update and inactive the industries which industries was remarked by user
		models.UserRole.update(
			{ active: false, finished_at: moment.now() },
			{
				where: {
					role_id: {
						[operator.notIn]: roles
					},
					user_id: user_id,
					active: true
				}
			}
		)
	}

	/**
	 * Set profession interest to user
	 */
	static async setProfession(user_id, profession) {
		// find or create
		models.UserProfession.findOrCreate({
			where: {
				user_id: user_id,
				profession_id: profession,
				active: true
			},
			defaults: {
				user_id: user_id,
				profession_id: profession,
				started_at: moment.now()
			}
		})
		// update
		models.UserProfession.update(
			{ active: false, finished_at: moment.now() },
			{
				where: {
					profession_id: {
						[operator.not]: profession
					},
					user_id: user_id,
					active: true
				}
			}
		)

		return true
	}

	/**
	 * Set skill interest to user
	 */
	static async setSkills(user_id, skills) {
		// iterate the industries
		// set new industry if the isdusty is not set
		skills.map(skill_id => {
			// set the active industries
			models.UserSkill.findOrCreate({
				where: {
					user_id: user_id,
					skill_id: skill_id,
					active: true
				},
				defaults: {
					user_id: user_id,
					skill_id: skill_id,
					started_at: moment.now(),
					active: true
				}
			})
		})
		// update and inactive the industries which industries was remarked by user
		models.UserSkill.update(
			{ active: false, finished_at: moment.now() },
			{
				where: {
					skill_id: {
						[operator.notIn]: skills
					},
					user_id: user_id,
					active: true
				}
			}
		)

		return true
	}

	/**
	 * Set industry interest to user
	 */
	static async setIndustry(user_id, industries) {
		// iterate the industries
		// set new industry if the isdusty is not set
		industries.map(industry => {
			// set the active industries
			models.UserIndustry.findOrCreate({
				where: {
					user_id: user_id,
					industry_id: industry,
					active: true
				},
				defaults: {
					user_id: user_id,
					industry_id: industry,
					started_at: moment.now(),
					active: true
				}
			})
		})
		// update and inactive the industries which industries was remarked by user
		models.UserIndustry.update(
			{ active: false, finished_at: moment.now() },
			{
				where: {
					industry_id: {
						[operator.notIn]: industries
					},
					user_id: user_id,
					active: true
				}
			}
		)

		return true
	}

	/**
	 * Set working type interest to user
	 */
	static async setWorkingType(user_id, working_type) {
		// find or create
		models.UserWorkingType.findOrCreate({
			where: {
				user_id: user_id,
				working_type_id: working_type,
				active: true
			},
			defaults: {
				user_id: user_id,
				working_type_id: working_type,
				started_at: moment.now()
			}
		})
		// update
		models.UserWorkingType.update(
			{ active: false, finished_at: moment.now() },
			{
				where: {
					working_type_id: {
						[operator.not]: working_type
					},
					user_id: user_id,
					active: true
				}
			}
		)

		return true
	}
	/**
	 * Get all user interest
	 */
	static async getInterests(user_id) {
		// working type
		let working_type = await models.UserWorkingType.findAll({
			where: {
				user_id: user_id,
				active: true
			},
			include: { model: models.WorkingType, required: true },
			attributes: ['user_id', 'working_type_id', 'started_at', 'finished_at']
		})

		return working_type
	}
}

export default InterestService
