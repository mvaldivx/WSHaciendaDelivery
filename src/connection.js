var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mauvalsa",
    database: "haciendadeliveryapp"
  });
  
  con.connect(function(err) {
    if (err){ 
      console.log(err)
      throw err;
    }
    console.log("Connected!");
  });

module.exports = con;