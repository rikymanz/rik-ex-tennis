// COPIARE registerController, adattare a  stringing
const db = require("./../database/database.js")

const Controller = {

    getAll: (req, res, next) => {
        var sql = "SELECT * FROM stringing ORDER BY date DESC"
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
        var sql = "SELECT * FROM stringing WHERE id = ?"
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

    post:  (request, res, next) => {
        // Create a reguster row
        const data = {
            raquet: request.body.raquet,
            date: request.body.date,
            strings: request.body.strings,
            weight: request.body.weight,
            place: request.body.place,
            
        }

        var sql = 'INSERT INTO stringing ( raquet,date,strings,weight,place ) \
                   VALUES ( ? , ? , ? , ? , ? ) '
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

    }, // fine moetodo post

    delete: (req, res, next) => {
        db.run(
            'DELETE FROM stringing WHERE id = ?',
            req.params.id,
            function (err, result) {
                if (err){
                    res.status(400).json({"error": res.message})
                    return;
                }
                res.json({"message":"deleted", changes: this.changes})
        });
    },  // fine delete

    update: async( request , res, next ) => {

        const data = {
            raquet: request.body.raquet,
            date: request.body.date,
            strings: request.body.strings,
            weight: request.body.weight,
            place: request.body.place, 
        }

        var params = Object.values( data )

        db.run(
            `UPDATE stringing SET
               raquet = ?, 
               date = ?, 
               strings = ?,
               weight = ?,
               place = ?
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
    },  // fine update

} // fine classe con metodi

module.exports = Controller