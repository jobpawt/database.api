const query = require('../db/connect')
const pairSQL = require('../utils/pairSQL')
const CreateID = require('../utils/CreateID')
class PreProductModel{
    table = 'pre_products'

    find = async(params = {}) => {
        const keys = Object.keys(params) 
        let sql = `
        SELECT pre_products.pre_id,
                pre_products.sid,
                pre_products.name,
                pre_products.description,
                pre_products.url,
                pre_products.status,
                pre_products.price,
                pre_products.start,
                pre_products.end,
                stock.remain as stock,
                shops.name as shop_name,
                shops.status as shop_status
                FROM ${this.table}
                INNER JOIN stock
                ON pre_products.stock_id = stock.stock_id
                INNER JOIN shops
                ON pre_products.sid = shops.sid 
                `
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

    create = async({pre_id, sid, name, description, url, price, stock, start, end}) => {
        //insert stock data
        const stock_id = await CreateID.hash(null);
        await query('INSERT INTO stock (stock_id, remain) VALUES (?,?)', [stock_id, stock]);

        //create pre product
        const sql = `INSERT INTO ${this.table} (pre_id, sid, name, description, url, price, stock_id, start, end) VALUES (?,?,?,?,?,?,?,?,?)`
        const result = await query(sql, [pre_id, sid, name, description, url, price, stock_id, start, end])
        const affectedRows = result ? result.affectedRows : 0
        return affectedRows
    }

    update = async(params, id) => {
        /*
        const {columns, values} = pairSQL(params)
        const sql = `UPDATE ${this.table} SET ${columns} WHERE pre_id = ?`
        */
        const stockSQL = `SELECT stock_id FROM ${this.table} WHERE pre_id = '${id}'`
        var stock_id = await query(stockSQL);

        //update stock witch stock_id 
        const remainSQL = `UPDATE stock SET remain = ${params['stock']} WHERE stock_id = '${stock_id[0]['stock_id']}'`;
        await query(remainSQL);

        //edit sql
        const sql = `
            UPDATE ${this.table} SET
                name = '${params['name']}',
                description = '${params['description']}',
                url = '${params['url']}',
                price = '${params['price']}',
                start = '${params['start']}',
                end = '${params['end']}',
                status = '${params['status']}'
                WHERE pre_id = '${id}'
            `;
        const result = await query(sql)
        return result
    }

    delete = async(id) => {
        const sql = `DELETE FROM ${this.table} WHERE pre_id = ?`
        const result = await query(sql, [id])
        const affectedRows = result ? result.affectedRows : 0
        return affectedRows
    }
}

module.exports = new PreProductModel 
