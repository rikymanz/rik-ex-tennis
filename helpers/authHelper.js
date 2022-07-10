const db = require("./../database/database.js")

module.exports = {

    // middleware che intercetta le api e controlla il token messo come header.
    // il token deve essere l'ultimo creato per l'utente
    authenticateToken : (req, res, next) => {

        const token = req.headers['token']
        if (token == null) return res.sendStatus(401)
      
        var sql = "SELECT * FROM sessions WHERE key = ? "
        var params = [ token ]
        db.get(sql, params, (err, row) => {

            if (err) {
                return res.sendStatus(400).json({"error":err.message})
            }

            if ( !row ) {
                return res.sendStatus(403)
            }

            // il token esiste, bisogna cotrollare che sia l'ultimo
            const user = row.user_id

            var sql = "SELECT * FROM sessions WHERE user_id = ? ORDER BY id DESC"
            var params = [ user ]
            db.get(sql, params, ( err, row ) => {

                if (err) {
                    return res.sendStatus(400).json({"error":err.message})
                }
                // se il codice non è l'ultimo
                if ( row.key != token ) {
                    return res.sendStatus(403)
                }

                // se il token è scaduto. Passato un giorno dal login
                const dateToken = new Date(row.timestamp)
                const dateNow = new Date()
                // differenza in millisecondi
                let diff = dateNow - dateToken
                // differenza in ore
                diff = diff / 1000 / 3600
                // se si sono superate le 24 dall'ultimo login
                if( diff > 24 )
                    return res.sendStatus(403)
                
                next()
            });
                
        });
    }

}