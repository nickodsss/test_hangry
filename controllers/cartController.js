const { Cart, Menu } = require('../models/index')

class Controller {
    static async listCart(request, response, next) {
        try {
            const result = await Cart.findAll({
                include: {
                    model: Menu,
                    attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
                },
                attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
            })

            if (!result || result.length === 0) {
                throw { name: 'Cart Unavailable' }
            }
            response.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }

    static async addCart(request, response, next) {
        try {
            const { id } = request.params
            const menu = await Menu.findOne({
                where: {
                    id: id
                }
            })

            if (!menu) {
                throw { name: 'Menu not found' }
            }

            if (menu.availability > 0) {
                const existingCart = await Cart.findOne({
                    where: {
                        MenuId: id,
                    },
                });
                if (existingCart) {
                    if (existingCart.totalOrder < menu.availability) {
                        await existingCart.update({ totalOrder: existingCart.totalOrder + 1 });
                        response.status(201).json(existingCart);
                    } else {
                        throw { name: 'Exceeded Availability Limit' };
                    }
                } else {
                    const result = await Cart.create({
                        MenuId: id,
                        totalOrder: 1,
                    });

                    response.status(201).json(result);
                }
            } else {
                throw { name: 'Not Enough Availability', itemName: menu.name };
            }

        } catch (err) {
            next(err)
        }
    }

    static async removeCart(request, response, next) {
        try {
            const { id } = request.params
            const result = await Cart.destroy({
                where: {
                    MenuId: id
                }
            })

            if (!result) {
                throw { name: 'Error Delete' }
            }

            response.status(200).json({
                message: `Success to delete`
            })
        } catch (err) {
            next(err)
        }
    }
    static async checkout(request, response, next) {
        try {
            const cartItems = await Cart.findAll({
                include: Menu
            })

            if (!cartItems || cartItems.length === 0) {
                throw { name: 'Cart is Empty' }
            }

            const orderedItems = cartItems.map(cartItem => ({
                menuName: cartItem.Menu.name,
                totalOrder: cartItem.totalOrder
            }))

            for (const cartItem of cartItems) {
                if (cartItem.totalOrder > cartItem.Menu.availability) {
                    throw { name: 'Not Enough Availability', itemName: cartItem.Menu.name };
                }
            }

            for (const cartItem of cartItems) {
                await cartItem.Menu.update({ availability: cartItem.Menu.availability - cartItem.totalOrder });
            }

            await Cart.destroy({ where: {} });

            response.status(200).json({ message: 'Checkout successful', orderedItems });
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller