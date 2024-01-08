var mysql = require('mysql');

const credentials = {
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "nodejs"
};

var db = mysql.createConnection(credentials);

db.connect(function(err) {
  if (err) throw err;
  console.log("¡Conectado a la base de datos!");
});

module.exports = db;