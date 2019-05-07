import path from 'path'
import multer from 'multer'
import fs from 'fs'

export default destination => {
	// intialize storage
	let storage = multer.diskStorage({
		destination: function(req, file, callback) {
			// create directory if not exsist
			if (!fs.existsSync(destination)) {
				fs.mkdirSync(destination)
			}
			// upload directory
			callback(null, destination)
		},
		filename: function(req, file, callback) {
			// generate unique name with date
			callback(null, file.fieldname + Date.now() + path.extname(file.originalname))
		}
	})

	return storage
}
