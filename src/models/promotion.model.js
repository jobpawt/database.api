const query = require('../db/connect')
const pairSQL = require('../utils/pairSQL')

class PromotionModel{

    table = 'promotions'

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

    create = async({pro_id, pid, name, price, start, end}) => {
        const sql = `INSERT INTO ${this.table} (pro_id, pid, name, price, start, end) VALUES (?,?,?,?,?,?)`
        console.log(sql);
        const result = await query(sql, [pro_id, pid, name, price, start, end])
        const affectedrows = result ? result.affectedRows : 0
        return affectedrows
    }

    update = async(params, id) => {
        const {columns, values} = pairSQL(params)
        const sql = `UPDATE ${this.table} SET ${columns} WHERE pro_id = ?`
        const result = await query(sql, [...values, id])
        return result
    }

    delete = async(id) => {
        const sql = `DELETE FROM ${this.table} WHERE pro_id = ?`
        const result = await query(sql, [id])
        const affectedRows = result ? result.affectedRows : 0
        return affectedRows
    }
}

module.exports = new PromotionModel 
