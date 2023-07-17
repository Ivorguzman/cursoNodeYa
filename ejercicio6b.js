const fs = require('fs/promises');

/* Este código usa el módulo `fs` en Node.js para leer el contenido de un archivo llamado
`archivo1_b.txt`. Utiliza el método `readFile` que devuelve una promesa que se resuelve con el
contenido del archivo como un búfer. Luego, el código usa el método `then` para registrar el búfer
en la consola y también convertirlo en una cadena usando el método `toString` y registrarlo en la
consola. Si hay un error al leer el archivo, el método `catch` registrará el error en la consola. */
fs.readFile('./archivo1_b.txt')
    .then(datos => {
        console.log(datos);/// Datos en formato del buffers
        console.log(datos.toString());/// Datas tranformados a string
    }).catch((error) => {
        console.log(error);
    });