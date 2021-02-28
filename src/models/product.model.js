const query = require('../db/connect')
const pairSQL = require('../utils/pairSQL')
const CreateID = require('../utils/CreateID')

class ProductModel {
    table = 'products'

    find = async (params = {}) => {
        const keys = Object.keys(params)
        let sql = `
        SELECT products.pid, 
                products.sid, 
                products.name, 
                products.description, 
                products.url, 
                products.status, 
                products.price, 
                products.type_id, 
                stock.remain as stock ,
                shops.name as shop_name,
                shops.status as shop_status,
                product_type.name as type_name
                FROM ${this.table} 
                INNER JOIN stock
                ON products.stock_id = stock.stock_id
                INNER JOIN shops
                ON products.sid = shops.sid
                INNER JOIN product_type
                ON products.type_id = product_type.type_id
                `

        if (keys.length == 0)
            return await query(sql)
        const { columns, values } = pairSQL(params)
        sql += ` WHERE ${columns}`
        return await query(sql, [...values])
    }

    findOne = async (params) => {
        const { columns, values } = pairSQL(params)
        const sql = `SELECT * FROM ${this.table} WHERE ${columns}`
        const result = await query(sql, [...values])
        return result[0]
    }

    create = async ({ pid, sid, name, description, url, price, stock, type_id }) => {
        //insert stock data
        const stock_id = await CreateID.hash(null);
        await query('INSERT INTO stock (stock_id, remain) VALUES (?,?)', [stock_id, stock]);

        //create products
        const sql = `INSERT INTO ${this.table} (pid, sid, type_id, name, description, url, price, stock_id, status) VALUES (?,?,?,?,?,?,?,?,?)`
        const result = await query(sql, [pid, sid, type_id, name, description, url, price, stock_id, "active"])
        const affectedRows = result ? result.affectedRows : 0
        return affectedRows
    }

    update = async (params, id) => {
        //search stock_id
        const stockSQL = `SELECT stock_id FROM ${this.table} WHERE pid = '${id}'`;

        var stock_id = await query (stockSQL);

        //update stock witch stock_id
        const remainSQL = `UPDATE stock SET remain = ${params['stock']} WHERE stock_id = '${stock_id[0]['stock_id']}'`;
        await query(remainSQL);

        //update products data
        delete params['stock'];
        /*const { columns, values } = pairSQL(params)
        const sql = `UPDATE ${this.table} SET ${columns} WHERE pid = ?`
        */
        
        //edit sql
        const sql = `
            UPDATE ${this.table} SET 
                type_id = ${params['type_id']}, 
                name = '${params['name']}',
                description = '${params['description']}',
                url = '${params['url']}',
                price = ${params['price']},
                status = '${params['status']}'
                WHERE pid = '${params['pid']}'
                `;
        const result = await query(sql)
        return result
    }

    delete = async (params) => {
        const { columns, values } = pairSQL(params)
        const sql = `UPDATE ${this.table} SET status='DELETED' WHERE ${columns}`
        const result = await query(sql, [values])
        const affectedRows = result ? result.affectedRows : 0
        return affectedRows
    }
}

module.exports = new ProductModel