
/// Creación de un archivo de texto.
/* Este código crea un nuevo archivo llamado "archivo1.txt" en el directorio actual y escribe dos
líneas de texto en él. La primera línea es "línea 1" y la segunda línea es "Línea 2". Si hay un
error durante el proceso de escritura, el error se registrará en la consola. Si el proceso de
escritura es exitoso, se registrará en la consola un mensaje que dice "El archivo fue creado". */
const fs = require('fs');
fs.writeFile('./archivo1.txt', 'línea 1\nLínea 2', error => {
    if (error)
        console.log(error);
    else
        console.log('El archivo fue creado');
});
console.log('última línea del programa');
