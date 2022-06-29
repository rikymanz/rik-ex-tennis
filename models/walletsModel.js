const sql = require("../database/db.js");

const Model = {
  getAll : async() => {
    const connection = await sql.connect();
    var stringRequest = "SELECT * FROM wallets";
    var result = [{}];

    try {
      result = await connection.request().query(stringRequest);
    } catch (err) {
      console.error(err)
      connection.close();
      return false
    }

    return result.recordset.length > 0 ? result.recordset : null;
  },

  getById: async function(id) {
    const connection = await sql.connect();
    var stringRequest = `SELECT * FROM wallets WHERE wallet_id = ${id}`;
    var result = [{}];

    try {
      result = await connection.request()
        .query(stringRequest);
    } catch (err) {
      console.error(err)
      connection.close();
      return false
    }
    return result.recordset.length > 0 ? result.recordset : null;
  },

  post: async function( newWallet ) {
    const connection = await sql.connect();
    console.log('ok')
    var stringRequest = `insert into wallets( owner , coin , quantity , color ) values ( '${newWallet.owner}' , '${newWallet.coin}' , ${newWallet.quantity} , '${newWallet.color}' )`;
    try {
      await connection.request().query(stringRequest);
    } catch (err) {
      console.error(err)
      connection.close();
      return false
    }
    return true
  }, // fine post

  delete: async function(id) {
    const connection = await sql.connect();
    var stringRequest = `DELETE FROM wallets WHERE wallet_id = ${id}`;
    var result = [{}];

    try {
      result = await connection.request().query(stringRequest);
    } catch (err) {
      console.error(err)
      connection.close();
      return false
    }
    return true;
  },

  update: async function( wallet , wallet_id ) {
    const connection = await sql.connect();
    // per ongi attibuto non undeinfed da modificare
    for (const [key, value] of Object.entries(wallet)) {
      if( value != undefined ){
        try {
          let stringRequest = `UPDATE wallets SET ${key} = '${value}' WHERE wallet_id = ${wallet_id}`
          await connection.request().query(stringRequest);
        } catch (err) {
          console.error(err)
          connection.close();
          return false
        } // fine try - catch
      } // fine if
    } // fine for
    let stringRequest = `SELECT * FROM wallets WHERE wallet_id = ${wallet_id}`
    let res = await connection.request().query(stringRequest);

    if( res.recordset.length > 0 )
      return true
    else
      return false
  }, // fine post

}

  module.exports = Model;
