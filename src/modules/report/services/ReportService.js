// import moment from 'moment'
import models from 'database/modelBootstrap'
import sequelize from 'sequelize'
// const operator = sequelize.Op
/**
 * Report Service
 */
class ReportService {
	/**
	 *
	 */
	static async mostWantedPositions() {
		//industry_id, date_from
		/**
		 *
		 */
		return await models.Profession.findAll({
			attributes: {
				include: [[sequelize.fn('COUNT', sequelize.col('jobs.id')), 'jobCount']]
			},
			include: {
				model: models.Job,
				attributes: []
			}
		})
	}
}

export default ReportService
