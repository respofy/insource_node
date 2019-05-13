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
	static generateMany(Model, Factory, Count) {
		for (let iteration = 0; iteration < Count; iteration++) {
			// create new Factory instances
			Model.create(new Factory())
		}
	}

	// Bulk insert prepared js objects
	static generateByCollection(model, collection) {
		model.findByPk(1).then(result => {
			if (!result) {
				model.bulkCreate(collection)
			}
		})
	}
}
export default Seeder
