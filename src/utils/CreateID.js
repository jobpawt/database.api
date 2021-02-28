const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const HttpException = require('../utils/HttpException.utils')

class CreateID {
    hash = async (data) => {
        if(typeof data != 'object')
            throw new HttpException(501, 'Invalid input')
        const values = Object.values(data)
        const dataString = values.map(value => `${value}`).join()
        return await crypto.randomBytes(16).toString("hex") 
    }    
}

module.exports = new CreateID
