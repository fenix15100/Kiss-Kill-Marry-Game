const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('bd.sqlite');
let array=[];

function Entidad(name,image){
    this.name=name;
    this.image=image;
}


db.serialize(function() {

    db.each("SELECT name,image FROM Entity", function (err, row) {
        e = new Entidad(row.name, row.image());
        array.push(e);
    });
});

db.close();

console.log(array);