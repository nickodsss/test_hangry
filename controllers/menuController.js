const { Menu } = require('../models/index')

class Controller {
    static async fetchMenuList(request, response, next) {
        try {
            const result = await Menu.findAll({
                attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
            })

            if (!result || result.length === 0) {
                throw { name: 'Menu not found' }
            }
            response.status(200).json(result)
        }
        catch (err) {
            next(err)
        }
    }
}

module.exports = Controller