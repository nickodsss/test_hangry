const errorHandler = async (err, request, response, next) => {
    if (err.name === 'Menu not found') {
        response.status(404).json({
            message: 'Menu not found'
        })
    } else if (err.name === 'Location not found') {
        response.status(404).json({
            message: 'Location Data not found'
        })
    } else if (err.name === 'Exceeded Availability Limit') {
        response.status(400).json({
            message: 'Not Enough Availability'
        })
    } else if (err.name === 'Cart is Empty') {
        response.status(400).json({
            message: 'Cart is Empty'
        })
    } else if (err.name === 'Not Enough Availability') {
        response.status(400).json({
            message: `Not Enough Availability for item ${err.itemName}`,
        });
    } else if (err.name === 'Error Delete') {
        response.status(404).json({
            message: 'Cart Not Found for Deletion'
        })
    } else if (err.name === 'Cart Unavailable') {
        response.status(404).json({
            message: 'No Cart Data Found'
        })
    } else {
        response.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

module.exports = { errorHandler }