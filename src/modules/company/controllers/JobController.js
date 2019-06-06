import ka from 'lang/ka'
import JobService from '../services/JobService'
import response from 'helper/Response'

/**
 *
 */
class JobController {
	/**
	 * read active job
	 */
	static async list(req, res) {
		try {
			// fetch all jobs
			let jobs = await JobService.list(req.body.params.company_id)
			// response
			res.json(response.success(ka.request_success, jobs))
		} catch (error) {
			res.json(response.error(ka.request_error, {}, error.message))
		}
	}

	/**
	 * read active job
	 */
	static async detail(req, res) {
		try {
			// fetch all jobs
			let jobs = await JobService.detail(req.body.params.job_id)
			// response
			res.json(response.success(ka.request_success, jobs))
		} catch (error) {
			res.json(response.error(ka.request_error, {}, error.message))
		}
	}

	/**
	 * Read archived jobs
	 */
	static async readArchived(req, res) {
		try {
			// get archived jobs from service
			let jobs = await JobService.read(req.body.params.company_id, 0)
			// response
			res.json(response.success(ka.request_success, jobs))
		} catch (error) {
			res.json(response.error(ka.request_error, {}, error.message))
		}
	}

	/**
	 * Archive job
	 */
	static async archive(req, res) {
		try {
			// archive job from service
			await JobService.archive(req.params.id)
			// response
			res.json(response.success(ka.job.archived))
		} catch (error) {
			res.json(response.error(ka.job.archived_error, {}, error.message))
		}
	}
}

export default JobController
