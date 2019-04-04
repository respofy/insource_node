import Jwt from 'jsonwebtoken'

export default function verify(req, res, next) {
    let token = req.get('Authorization')
	Jwt.verify(token, '21j1231!@314', (error, authData) => {
        console.log('enter in jwt verify func')
        console.log(req.get('Authorization'))
		if (error) {
            console.log(error)
			res.sendStatus(403)
		} else {
			console.log(authData)
			next()
		}
	})
}
