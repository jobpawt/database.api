const query = require('../db/connect')
const pairSQL = require('../utils/pairSQL')

class BuyModel{
    table = 'buy'

    find = async(params = {}) => {
        const keys = Object.keys(params) 
        /*let sql = `SELECT * FROM ${this.table}`*/

        let sql = `
            SELECT buy.buy_id,
                    buy.uid,
                    buy.pid,
                    buy.pro_id,
                    buy.amount,
                    buy.sum,
                    buy.send_type_id,
                    buy.payment_id,
                    buy.date,
                    buy.status,
                    send_type.type as send_type,
                    send_type.recive_date,
                    send_type.position,
                    send_type.address,
                    send_type.phone,
                    products.name as product_name,
                    products.sid,
                    payment.type as payment_type,
                    payment.url as payment_url,
                    payment.status as payment_status,
                    promotions.name as promotion_name
                    FROM buy
                    INNER JOIN send_type
                    ON buy.send_type_id = send_type.send_type_id
                    INNER JOIN products
                    ON buy.pid = products.pid
                    INNER JOIN payment
                    ON buy.payment_id = payment.payment_id
                    LEFT JOIN promotions
                    ON buy.pro_id = promotions.pro_id
        `;
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

    create = async({buy_id, uid, pid, pro_id, amount, sum, send_type_id, payment_id}) => {
        const sql = `INSERT INTO ${this.table} (buy_id, uid, pid, pro_id, amount, sum, send_type_id, payment_id, date) VALUES (?,?,?,?,?,?,?,?,?)`
        const result = await query(sql, [buy_id, uid, pid, pro_id, amount, sum, send_type_id, payment_id, new Date().toISOString().slice(0, 19).replace('T', ' ')])
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
