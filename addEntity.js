
//Importo los modulos necesarios
const fs= require('fs');
const path = require('path');
const electron=require('electron');
const {dialog} = require('electron').remote;
const sqlite3 = require('sqlite3').verbose();
let db=null;
let fichero=null;
let $=require('jquery');


//Al presionar el boton #upload creo un filechoser para que elijan una imagen
$("#upload").click(function (e) {
    e.preventDefault();
   fichero=dialog.showOpenDialog(electron.remote.getCurrentWindow());

});

//Al enviar el formulario vuelco la imagen en un buffer y la paso junto a el nombre del input hacia el modulo de
//presitencia
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

//Recibe la imagen y el nombre, serializa la imagen a Base64 e introduce los datos en la base de datos sqlite
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





