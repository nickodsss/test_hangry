const { Location } = require('../models/index')

class Controller {
    static async fetchLocationList(request, response, next) {
        try {
            const result = await Location.findAll({
                attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
            })

            if (!result || result.length === 0) {
                throw { name: 'Location not found' }
            }
            response.status(200).json(result)
        }
        catch (err) {
            next(err)
        }
    }
}

module.exports = Controller