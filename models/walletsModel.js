const sql = require("../database/db.js");

// constructor
const Model = {
    // estrazione di tutte le righe di register
    getAll : result => {
        // query da eseguire
        const strQuery = "SELECT * FROM register"
        sql.query( strQuery , (err, res) => {
            if (err) {
                console.log("error: ", err)
                result(null, err)
                return
            }
            result(null, res)
        })
    }, // fine funzione get all

    getById : ( id, result ) => {
        const strQuery = `SELECT * FROM register WHERE id = ${id}`
        sql.query( strQuery , (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if ( res.length ) {
                result(null, res[0])
                return
            }

            // not found
            result({ kind: "not_found" }, null);
        })
    },


    update : (id, data, result) => {
        const strQuery = `UPDATE users SET ? WHERE id = ?`
        sql.query(strQuery, [data, id] , (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated customer: ", { id: id, ...data });
            result(null, { id: id, ...data });
          }
        )
    },

    // Aggiunta utente a tabella di smart working
   
    post : ( data , result ) => {
        const strQuery = `
            INSERT INTO register(raquet,date,desc,hours,result,cost) VALUES
            ( ${data.raquet} , ${data.date} , ${data.desc} , ${data.hours} , ${data.result} , ${data.cost} ),
            `

        sql.query( strQuery , (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
                
        });
    },


        // eliminazione utente
      delete : ( data , result ) => {
        const strQuery = `DELETE FROM register WHERE id = ${data.id}`
        sql.query( strQuery , (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
            result(null, res);
        });
      },

  };

  module.exports = Model;