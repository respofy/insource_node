/**
 * Class for seeding db with Factory objects
 */
class Seeder {
	/**
	 * Model: Sequelize model
	 * Factory: factory version of given model
	 * Count: number of objects to create
	 *
	 * Loop as many times as count and create record in db
	 */
	static async generateMany(Model, Factory, Count) {
		for (let iteration = 0; iteration < Count; iteration++) {
			// create new Factory instances
			Model.create(new Factory())
		}

		return true
	}

	// Bulk insert prepared js objects
	static async generateByCollection(model, collection) {
		return await model.findByPk(1).then(result => {
			// check records in db to avoid useless duplications
			if (!result) {
				model.bulkCreate(collection)
			}
		})
	}
}
export default Seeder
