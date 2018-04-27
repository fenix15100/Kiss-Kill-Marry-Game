const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('bd.sqlite');
let $=require('jquery');
let array=[];

function Entidad(name,image){
    this.name=name;
    this.image=image;
}


db.serialize(function() {

    db.each("SELECT name,image FROM Entity", function (err,row) {
        e = new Entidad(row.name, row.image);
        array.push(e);
    });
});

db.close();


$("#jugada").click(function (e) {
    e.preventDefault();
    getEntity();

});

function getEntity() {
    $("#gallery").empty();
    $(".container-fluid ul").empty();

    array=shuffle(array);
    let jugada=array.slice(0,3);

    console.log(jugada);

    jugada.forEach(function (value) {

        $('<img src="data:image/jpeg;base64,'+value.image+'"</img>').appendTo("#gallery");
        $('<li id="nombre" class="text-muted">'+value.name+'</li></s><br>').appendTo(".container-fluid ul");



    });

}






//Tipycall random int
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Funcion de un pavo porque la mierda de JS no tiene un puto shuffle
function shuffle(arra1) {
    let ctr = arra1.length, temp, index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}