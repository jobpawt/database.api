const query = require("../db/connect");
const pairSQL = require("../utils/pairSQL");

class SendBookModel {
  table = "send_book";

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

  create = async ({ send_book_id, driver_id, pre_id }) => {
    const sql = `INSERT INTO ${this.table} (send_book_id, driver_id, pre_id, send_date) VALUES (?,?,?)`;
    const result = await query(sql, [
      send_book_id,
      driver_id,
      pre_id,
      Date.now(),
    ]);
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

module.exports = new SendBookModel();
