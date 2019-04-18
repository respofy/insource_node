import path from 'path'
import multer from 'multer'

let storage = multer.diskStorage({
	destination: function(req, file, callback) {
		// upload directory
		callback(null, 'uploads')
	},
	filename: function(req, file, callback) {
		// generate unique name with date
		callback(null, file.fieldname + Date.now() + path.extname(file.originalname))
	}
})

export default storage
