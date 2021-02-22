const query = require("../db/connect");
const pairSQL = require("../utils/pairSQL");

class PaymentModel {
  table = "payment";

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

  create = async ({ payment_id, type, picture_url }) => {
    const sql = `INSERT INTO ${this.table} (payment_id, type, picture_url) VALUES (?,?,?)`;
    const result = await query(sql, [payment_id, type, picture_url]);
    const affectedRows = result ? result.affectedRows : 0;
    return affectedRows;
  };

  update = async (params, id) => {
    const { columns, values } = pairSQL(params);
    const sql = `UPDATE ${this.table} SET ${columns} WHERE payment_id = ?`;
    const result = await query(sql, [...values, id]);
    return result;
  };

  delete = async (id) => {
    const sql = `DELETE FROM ${this.table} WHERE payment_id = ?`;
    const result = await query(sql, [id]);
    const affectedRows = result ? result.affectedRows : 0;
    return affectedRows;
  };
}

module.exports = new PaymentModel();
