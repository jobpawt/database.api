const query = require('../db/connect')
const pairSQL = require('../utils/pairSQL')

class ProductModel {
    table = 'products'

    find = async(params = {}) => {
        const keys = Object.keys(params) 
        let sql = `SELECT * FROM ${this.table}`
        if(keys.length == 0)
            return await query(sql)
        const {columns, values} = pairSQL(params)    
        sql += ` WHERE ${columns}`
        return await query(sql, [...values])
    }
    
    findOne = async(params) => {
        const {columns, values} = pairSQL(params)
        const sql = `SELECT * FROM ${this.table} WHERE ${columns}`
        const result = await  query(sql, [...values])
        return result[0]
    }

    create = async({pid, sid, name, description, url, price, stock, type_id}) => {
        const sql = `INSERT INTO ${this.table} (pid, sid, type_id, name, description, url, price, stock, status) VALUES (?,?,?,?,?,?,?,?,?)`
        const result = await query(sql, [pid, sid, type_id, name, description, url, price, stock, "not allow"])
        const affectedRows = result ? result.affectedRows : 0
        return affectedRows
    }

    update = async(params, id) => {
        const {columns, values} = pairSQL(params)
        const sql = `UPDATE ${this.table} SET ${columns} WHERE pid = ?`
        const result = await query(sql, [...values, id])
        return result
    }

    delete = async(params) => {
        const {columns, values} = pairSQL(params)
        const sql = `UPDATE ${this.table} SET status='DELETED' WHERE ${columns}`
        const result = await query(sql, [values])
        const affectedRows = result ? result.affectedRows : 0
        return affectedRows
    }
}

module.exports = new ProductModel
