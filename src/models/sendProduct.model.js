const query = require("../db/connect");
const pairSQL = require("../utils/pairSQL");

class SendProductModel {
  table = "send_product";

  find = async (params = {}) => {
    const keys = Object.keys(params);
    let sql = `SELECT * FROM ${this.table}`;
    if (keys.length == 0) return await query(sql);
    const { columns, values } = pairSQL(params);
    sql += ` WHERE ${columns}`;
    return await query(sql, [...values]);
  };

  findOne = async (params) => {
    const { columns, values } = pairSQL(params);
    const sql = `SELECT * FROM ${this.table} WHERE ${columns}`;
    const result = await query(sql, [...values]);
    return result[0];
  };

  create = async ({ send_product_id, driver_id, buy_id }) => {
    const sql = `INSERT INTO ${this.table} (send_product_id,driver_id, buy_id, send_date) VALUES (?,?,?)`;
    const result = await query(sql, [driver_id, buy_id, Date.now()]);
    const affectedRows = result ? result.affectedRows : 0;
    return affectedRows;
  };

  update = async (params, id) => {
    const { columns, values } = pairSQL(params);
    const sql = `UPDATE ${this.table} SET ${columns} WHERE send_id= ?`;
    const result = await query(sql, [...values, id]);
    return result;
  };

  delete = async (id) => {
    const sql = `DELETE FROM ${this.table} WHERE send_id= ?`;
    const result = await query(sql, [id]);
    const affectedRows = result ? result.affectedRows : 0;
    return affectedRows;
  };
}

module.exports = new SendProductModel();
