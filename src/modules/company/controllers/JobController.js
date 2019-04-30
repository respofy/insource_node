import ka from 'lang/ka'
import JobService from '../services/JobService'
import response from 'helper/Response'

/**
 *
 */
class JobController {
	/**
	 * create job from company
	 */
	static async create(req, res) {
		try {
			// create job from service
			let job = await JobService.create(req.user.id, req.body)
			// response
			res.json(response.success(ka.job.created, job))
		} catch (error) {
			res.json(response.error(ka.job.create_error, {}, error))
		}
	}

	/**
	 * read job
	 */
	static async read(req, res) {
		try {
			// fetch all jobs
			let jobs = await JobService.read()
			// response
			res.json(response.success(ka.request_success, jobs))
		} catch (error) {
			res.json(response.error(ka.request_error))
		}
	}

	/**
	 * Delete job
	 */
	static async delete(req, res) {
		try {
			// delete job from service
			await JobService.delete(req.params.id)
			// response
			res.json(response.success(ka.job.deleted))
		} catch (error) {
			res.json(response.error(ka.job.delete_error))
		}
	}

	/**
	 * Set job requirements
	 */
	static async setJobRequirements(req, res) {
		try {
			// set requirements from service
			let requirements = await JobService.setJobRequirements(req.body)
			// response
			res.json(response.success(ka.request_success, requirements))
		} catch (error) {
			res.json(response.error(ka.job.set_requirement_error))
		}
	}
}

export default JobController
