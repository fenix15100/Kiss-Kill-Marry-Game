//GLOBALS
//Importo el modulo sqlite3
let sqlite3 = require('sqlite3').verbose();
let db=null;

//Importo modulo fs y path (Modulo que permite gestionar el sistema de ficheros del sistema)
let fs= require('fs');
let path = require('path');

//Si existe la base de datos la vinculo a la variable db global
//Si no existe la creo (el mismo metodo que vincularla) y creo el schema de la BD
if(fs.existsSync(path.basename('bd.sqlite'))){

    let db = new sqlite3.Database('bd.sqlite');
}else{

    let db = new sqlite3.Database('bd.sqlite');
    db.serialize(function() {
        db.run("CREATE TABLE Entity (name TEXT,image TEXT)");


    });
    db.close();
}


