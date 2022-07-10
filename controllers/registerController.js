
//const model = require('../models/registerModel')
const db = require("./../database/database.js")

const Controller = {

    getAll: (req, res, next) => {
        var sql = "SELECT * FROM register ORDER BY date DESC"
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
        var sql = "SELECT * FROM register WHERE id = ?"
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
    post: (request, res, next) => {
       
        var data = {
            raquet: request.body.raquet,
            date: request.body.date,
            desc: request.body.desc,
            hours: request.body.hours,
            result: request.body.result,
            cost: request.body.cost,
        }
        var sql = 'INSERT INTO register ( raquet,date,desc,hours,result,cost) \
                   VALUES ( ? , ? , ? , ? , ? , ?) '
        var params = Object.values( data )
        db.run( sql , params, function (err, result) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
            res.json({
                "message": "success",
                "data": data,
                "id" : this.lastID
            })
        });
    },


    delete: (req, res, next) => {
        db.run(
            'DELETE FROM register WHERE id = ?',
            req.params.id,
            function (err, result) {
                if (err){
                    res.status(400).json({"error": res.message})
                    return;
                }
                res.json({"message":"deleted", changes: this.changes})
        });
    },  // fine delete

    update: (request, res, next) => {
        var data = {
            raquet: request.body.raquet,
            date: request.body.date,
            desc: request.body.desc,
            hours: request.body.hours,
            result: request.body.result,
            cost: request.body.cost,
        }
        var params = Object.values( data )

        db.run(
            `UPDATE register SET
               raquet = ?, 
               date = ?, 
               desc = ?,
               hours = ?,
               result = ?,
               cost = ?
            WHERE id = ?`,
            [ ...params , request.params.id ],
            function ( err ,  result) {
                if (err){
                    res.status(400).json({"error": res.message})
                    console.log( err )
                    return;
                }
                res.json({
                    message: "success",
                    data: data,
                    changes: this.changes
                })
        });
    },


} // fine classe con metodi

module.exports = Controller