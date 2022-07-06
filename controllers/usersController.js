
const db = require("./../database/database.js")

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
} // fine classe con metodi

module.exports = Controller