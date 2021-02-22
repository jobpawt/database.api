const query = require('../db/connect')
const pairSQL = require('../utils/pairSQL')

class BuyModel{
    table = 'buy'

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

    create = async({bid, uid, pid, pro_id, amount, sum, send_type, payment_id}) => {
        const sql = `INSERT INTO ${this.table} (bid, uid, pid, pro_id, amount, sum, send_type, payment_id, buy_date) VALUES (?,?,?,?,?,?,?,?,?)`
        const result = await query(sql, [bid, uid, pid, pro_id, amount, sum, send_type, payment_id, Date.now()])
        const affectedRows = result ? result.affectedRows : 0
        return affectedRows
    }

    update = async(params, id) => {
        const {columns, values} = pairSQL(params)
        const sql = `UPDATE ${this.table} SET ${columns} WHERE buy_id = ?`
        const result = await query(sql, [...values, id])
        return result
    }

    delete = async(id) => {
        const sql = `DELETE FROM ${this.table} WHERE buy_id = ?`
        const result = await query(sql, [id])
        const affectedRows = result ? result.affectedRows : 0
        return affectedRows
    }
}

module.exports = new BuyModel 