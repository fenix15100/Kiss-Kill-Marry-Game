const fs= require('fs');
const path = require('path');
const electron=require('electron');
const {dialog} = require('electron').remote;
const sqlite3 = require('sqlite3').verbose();
let db=null;
let fichero=null;


require("./node_modules/jquery/jquery.js");


$("#upload").click(function (e) {
    e.preventDefault();
   fichero=dialog.showOpenDialog(electron.remote.getCurrentWindow());

});

$("form").submit(function (e) {


    $("p").empty();
    e.preventDefault();
    fs.readFile(fichero.toString(), function read(err, data) {
        if (err) {
            throw err;
        }
        saveEntity(data,$("#NombrePersonaje").val());
    });


    $(".container-fluid").append('<p class="text-muted"> Imagen guardada en la base de datos</p>');


});

function saveEntity(data,name){
    $("#NombrePersonaje").val("");
    data=Buffer.from(data).toString('base64');
    db = new sqlite3.Database('bd.sqlite');

    db.serialize(function() {
        let stmt = db.prepare("INSERT INTO Entity VALUES (?,?)");

        stmt.run(name,data);
        stmt.finalize();


    });
    db.close();





}





