
const { makeRandomString , dateNowISO } = require('./../helpers/generalHelper')

const db = require("./../database/database.js")
const crypto = require("crypto")

const Controller = {

    getAll: (req, res, next) => {
        var sql = "SELECT * FROM dude"
        var params = []
        db.all( sql , params , (err, rows) => {
            if (err) {
              res.status(400).json({"error":err.message});
              return;
            }
            res.json({
                rows
            })
        });
    },

    getOne: (req, res, next) => {
        var sql = "SELECT * FROM dude WHERE id = ?"
        var params = [req.params.id]
        db.get(sql, params, (err, row) => {
            if (err) {
              res.status(400).json({"error":err.message});
              return;
            }
            res.json({
                row
            })
        });
    },


    login:  (request, res, next) => {
        // Create a reguster row
        const data = {
            username: request.body.username,
            password: crypto.createHash('sha256').update(request.body.password).digest('hex'),
        }

        var sql = 'SELECT * FROM dude WHERE username = ? AND password = ?'
        var params = Object.values( data )

        db.get( sql , params, function (err, row) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
            // se l'utente non esiste
            if( !row ){
                res.json({ result:0 , error:"L'utente non esiste"}) 
                return
            } 

            // se invece l'utente esiste - CREAZIONE DELLA SESSIONE
            const user = row.id 
            
            
            const data = {
                user_id: user,
                key: makeRandomString(16),
                timestamp: dateNowISO(),
            }

            var sql = 'INSERT INTO sessions ( user_id , key , timestamp ) \
                    VALUES ( ? , ? , ? ) '

            var params = Object.values( data )
            db.run( sql , params, function (err, result) {
                if (err){
                    res.status(400).json({"error": err.message})
                    return;
                }
                res.json({
                    "result": 1,
                    "token": data.key
                })
            });

        });

    }, // fine moetodo post


} // fine classe con metodi

module.exports = Controller