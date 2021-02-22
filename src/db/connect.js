const dotenv = require('dotenv')
const mysql = require('mysql')
dotenv.config()

class Connection {

    constructor() {
        this.db = mysql.createConnection({
            hots: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_DATABASE
        })
    }

    check = () => {
        this.db.connect((err) => {
            if(err) {
                switch(err) {
                    case 'PROTOCOL_CONNECTION_LOST':
                        console.error('Database connection was closed')
                        break
                    case 'ER_CON_COUNT_ERROR':
                        console.error('Database has to many connection')
                        break
                    case 'ECONNREFUSED':
                        console.error('Database connection was refused')
                        break
                }
            }
        })
    }

    query = async (sql, values) => {
        return new Promise((resolve, reject) => {
            this.db.query(sql, values, (error, result) => {
                if(error) reject(error)
                resolve(result)
            })
        }).catch(error => {
            throw error
        })
    }
}

module.exports = new Connection().query