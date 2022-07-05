var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        db.run(`
        CREATE TABLE stringing(

            id integer not null primary key autoincrement,
            raquet integer not null,
            date datetime not null,
            strings varchar(100) not null,
            weight float not null,
            place varchar(100)

        )
        
            `,
        (err) => {
            if (err) {
                console.log( err )
            }else{
                // Table just created, creating some rows
            }
        }); 

        db.run(`
          CREATE TABLE register(

            id integer not null primary key autoincrement,
            raquet integer not null,
            date datetime not null,
            desc varchar(100) not null,
            hours float not null,
            result integer,
            cost float
        )
              `,
          (err) => {
              if (err) {
                  console.log( err )
              }else{
                  // Table just created, creating some rows

              }
          });  
        
        
    }

});


module.exports = db

