var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "1.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err 
    }else{
        console.log( 'SQLite connected' )
    }

});


module.exports = db

