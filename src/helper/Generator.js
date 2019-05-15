/* eslint-disable indent */
/**
 * Generating useful things
 */
class Generator {
	/**
	 * Generate random integer value
	 */
	static getRandomInteger(min, max) {
		min = Math.ceil(min)
		max = Math.floor(max)
		return Math.floor(Math.random() * (max - min + 1)) + min
	}

	/**
	 * Generate random string based on charset options: numeric, alphabetic, default(alphanumeric)
	 */
	static getRandomString(length, charset) {
		let result = ''
		let characters = ''
		// switch case to choose charset
		switch (charset) {
			case 'numeric':
				characters = '0123456789'
				break
			case 'alphabetic':
				characters = 'abcdefghijklmnopqrstuvwxyz'
				break
			default:
				characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
				break
		}
		// get length
		let charactersLength = characters.length
		// append random values to result variable
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength))
		}

		return result
	}
}

export default Generator
