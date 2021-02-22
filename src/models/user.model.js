const query = require('../db/connect')
const pairSQL = require('../utils/pairSQL')
const Roles = require('../utils/Role')
const HttpException = require('../utils/HttpException.utils')

class UserModel {
    table = 'users'

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.table}`

        if(Object.keys(params).length == 0)
            return await query(sql)
        
        const {columns, values} = pairSQL(params)
        sql += ` WHERE ${columns}`
        return await query(sql, [...values])
    }

    findOne = async (params) => {
        const {columns, values} = pairSQL(params) 
        const sql = `SELECT * FROM ${this.table} WHERE ${columns}`
        const result = await query(sql, [...values], (err, res) => {
            if(err)
                throw new HttpException(401, 'not have user')
            return res
        })
        return result[0]
    }

    create = async ({uid ,email, password, phone, role = Roles.user}) => {
        const sql = `INSERT INTO ${this.table} (uid, email, password, phone, role) VALUES (?,?,?,?,?)`
        const result = await query(sql, [uid, email, password, phone, role], (err, res) => {
            if(err)
                throw new HttpException(400, 'create user failed')
            return res
        })
        const affectedRows = result ? result.affectedRows : 0
        return affectedRows
    }

    update = async(params, id) => {
        const {columns, values} = pairSQL(params)
        const sql = `UPDATE ${this.table} SET ${columns} WHERE uid = ?`
        const result = await query(sql, [...values,id], (err, res) => {
            if(err)
                throw new HttpException(400, 'update user failed')
            return res
        })
        return result
    }

    delete = async(id) => {
        const sql = `DELETE FROM ${this.table} WHERE uid = ?`
        const result = await query(sql, [id], (err, res) => {
            if(err)
                throw new HttpException(400, 'delete user failed')
            return res
        })
        const affectedRows = result ? result.affectedRows : 0
        return affectedRows
    }
}

module.exports = new UserModel
