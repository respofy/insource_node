import path from 'path'
import multer from 'multer'
import fs from 'fs'

export default (destination, public_path) => {
	// intialize storage
	let storage = multer.diskStorage({
		destination: function(req, file, callback) {
			// create directory if not exsist
			if (!fs.existsSync(public_path + destination)) {
				fs.mkdirSync(public_path + destination)
			}
			// upload directory
			callback(null, public_path + destination)
		},
		filename: function(req, file, callback) {
			// generate unique name with date
			callback(null, file.fieldname + Date.now() + path.extname(file.originalname))
		}
	})

	return storage
}
