///Problema propuesto 1.

/// Confeccionar un programa que requiera el módulo 'os' para recuperar el espacio libre de memoria.Mostrar inicialmente el epacio libre mediante el método freemem() Luego crear un vector y mediante el método push almacenar 1000000 de enteros.Mostrar luego de la creación y carga del vector la cantidad de espacio libre.


const os = require("os");

console.log(`Espacio libre en memoria antes de crear el vector ${os.freemem} bites`);
const vector = [];
for (let f = 0; f < 10000000; f++){
    vector.push(f)
}
console.log(`Espacio libre en memoria despues de crearr el vector ${os.freemem} bites`);
