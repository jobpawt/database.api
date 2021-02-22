const HttpException = require('../utils/HttpException.utils')

const pairSQL = (data) => {
    if(typeof data != 'object')
        throw new HttpException(501, 'Invalid input')
    
    const keys = Object.keys(data)
    const values = Object.values(data)

    columns = keys.map(key => `${key} = ?`).join(', ')

    return {
        columns,
        values
    }
}

module.exports = pairSQL