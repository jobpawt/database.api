const query = require('../db/connect')
const pairSQL = require('../utils/pairSQL')

class BookModel{

    table = 'book'

    find = async(params = {}) => {
        const keys = Object.keys(params) 
        /*
        let sql = `SELECT * FROM ${this.table}`
        */
        
        let sql = `
            SELECT book.book_id,
                    book.uid,
                    book.pre_id,
                    book.send_type_id,
                    book.amount,
                    book.sum,
                    book.date,
                    book.payment_id,
                    book.status,
                    send_type.type as send_type,
                    send_type.recive_date,
                    send_type.position,
                    send_type.address,
                    send_type.phone,
                    pre_products.name as preOrder_name,
                    pre_products.status as preOrder_status,
                    pre_products.sid,
                    payment.type as payment_type,
                    payment.url as payment_url,
                    payment.status as payment_status
                    FROM book 
                    INNER JOIN send_type
                    ON book.send_type_id = send_type.send_type_id
                    INNER JOIN  pre_products
                    ON book.pre_id = pre_products.pre_id
                    INNER JOIN payment
                    ON book.payment_id = payment.payment_id
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

    create = async({book_id,uid, pre_id, send_type_id, payment_id, amount, sum}) => {
        const sql = `INSERT INTO ${this.table} (book_id,uid, pre_id, send_type_id, payment_id, amount, sum, date) VALUES (?,?,?,?,?,?,?,?)`
        const result = await query(sql, [book_id, uid, pre_id, send_type_id, payment_id, amount, sum, new Date().toISOString().slice(0, 19).replace('T', ' ')])
        const affectedRows = result ? result.affectedRows : 0
        return affectedRows
    }

    update = async(params, id) => {
        const {columns, values} = pairSQL(params)
        const sql = `UPDATE ${this.table} SET ${columns} WHERE book_id = ?`
        const result = await query(sql, [...values, id])
        return result
    }

    delete = async(id) => {
        const sql = `DELETE FROM ${this.table} WHERE book_id = ?`
        const result = await query(sql, [id])
        const affectedRows = result ? result.affectedRows : 0
        return affectedRows
    }
}

module.exports = new BookModel 
