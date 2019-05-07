import Joi from '@hapi/joi'
import Boom from '@hapi/boom'
import Extend from 'extend'

module.exports = function validate(schema) {
	return function validateRequest(req, res, next) {
		var toValidate = { body: {} }
		/* istanbul ignore if */
		if (!schema) {
			return next()
		}

		toValidate.body = req.body

		return Joi.validate(toValidate, schema, { abortEarly: false }, onValidationComplete)

		function onValidationComplete(err, validated) {
			if (err) {
				return next(Boom.badRequest(err, err.details))
			}

			// copy the validated data to the req object
			Extend(req, validated)

			return next()
		}
	}
}
