const mysql = require("../database/db.js");

// constructor
const Model = {
    // estrazione di tutte le righe di register
    getAll : async () => {

        const strQuery = `SELECT * FROM register ORDER BY date ASC`
        const connection = await mysql.DATABASE.getConnection()

        try {
            res = await connection.execute( strQuery )
            connection.release()
            return res.length > 0 ? res[0] : []
        }
        catch (err) {
            console.error(err)
            connection.release();
            return false
        }

    }, // fine funzione get all


    getById : async ( id ) => {

        const strQuery = `SELECT * FROM register WHERE id = ${id}`
        const connection = await mysql.DATABASE.getConnection()

        try {
            res = await connection.execute( strQuery )
            connection.release()
            return res.length > 0 ? res[0] : null
        }
        catch (err) {
            console.error(err)
            connection.release();
            return false
        }
    },


    update : async ( data , id ) => {

        const strQuery = `UPDATE register SET ? WHERE id = ?`
        const connection = await mysql.DATABASE.getConnection();

        try {
            res = await connection.query( strQuery , [ data , id ]);
            connection.release();
        }
        catch (err) {
            console.error(err)
            connection.release();
            return false
        }

        console.log(res)

        return res[0].affectedRows > 0 ? res[0] : null;

    },

    // Aggiunta utente a tabella di smart working
   
    post : async ( data ) => {


        const strQuery = `INSERT INTO register SET ?`

        const connection = await mysql.DATABASE.getConnection();

        try {
            res = await connection.query( strQuery , data );
            connection.release();
        }
        catch (err) {
            console.error(err)
            connection.release();
            return false
        }

        return res.length > 0 ? res[0] : null;
    },


    // eliminazione utente
    delete : async ( id ) => {
        const strQuery = `DELETE FROM register WHERE id = ${id}`
        const connection = await mysql.DATABASE.getConnection();
        var res = [{}];
        try {
            res = await connection.execute( strQuery );
            connection.release();
        }
        catch (err) {
            console.error(err)
            connection.release();
            return false
        }
        
        return res[0].affectedRows > 0 ? res[0] : null;
    },

  };

  module.exports = Model;