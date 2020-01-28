// dépendance api express
express = require('express');
bodyParser = require("body-parser");
path = require("path");
fs = require("fs");
mysql = require('mysql');
dir = __dirname + "/html";
multer = require("multer");
dat = [];
port = 88;



/*
MYSQL
 */
con = mysql.createConnection({
    host: "127.0.0.1",
    user: "darts",
    password: "aironezpizpi",
    database: "darts"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

/*
SERVEUR HTTP GESTION PAGES
 */
var server= express();
console.log("Server start on http://localhost:"+port);
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname,"html")));
server.use(express.static(path.join(__dirname,path.join("html","assets"))));
server.listen(port);


require('./index')(server,con,path,fs,dir);
require('./book')(server,con,path,fs,dir);
require('./api')(server,con,path,fs,dir);
require('./games')(server,con,path,fs,dir);
require('./game')(server,con,path,fs,dir);
require('./newgame')(server,con,path,fs,dir);
require('./profile')(server,con,path,fs,dir);
require('./signup')(server,con,path,fs,dir);
require('./submit')(server,con,path,fs,dir);


/*
            GPIO
 */