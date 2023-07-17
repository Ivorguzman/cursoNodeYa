
{

    //! Lectura de un archivo de texto.
/* Este código lee el contenido de un archivo llamado "archivo1.txt" utilizando el módulo integrado de
Node.js "fs". El método "readFile" se llama en el objeto "fs", que toma dos argumentos: la ruta al
archivo que se va a leer y una función de devolución de llamada que se ejecutará una vez que se haya
leído el archivo. */

    const fs = require('fs');
    fs.readFile('./archivo1.txt', (error, datos) => {
        if (error)
            console.log(error);
        else {
            console.log(datos + " Funcion anonima"); /// contenido del buffer
            console.log(datos.toString() + " Funcion anonima"); /// mostrar el contenido del Buffer en formato texto llamamos al método toString().
        }
    });
    console.log('última línea del programa función anonima:');

}




{
    //!Otra forma de definir la función que se dispara luego de leer o escribir un archivo.

    /// Modificamos el archivo eliminando la función anónima e implementando una función con un nombre explícito:
    
    
/**
 * La función lee el contenido de un archivo y lo registra en la consola.
 * @param error - El parámetro de error se usa para capturar cualquier error que pueda ocurrir mientras
 * se lee el archivo. Si se produce un error, contendrá información sobre el error. Si no se produce
 * ningún error, será nulo o indefinido.
 * @param datos - datos es un parámetro que representa los datos leídos del archivo especificado en el
 * método fs.readFile(). Se pasa como argumento a la función leer().
 */
    function leer(error, datos) {
        if (error)
        console.log(error);
        else {
            console.log(datos  + " Funcion explicita"); /// contenido del buffer
            console.log(datos.toString() + " Funcion explicita"); /// mostrar el contenido del Buffer en formato texto llamamos al método toString().
        }
    }
    
        const fs = require('fs');
        fs.readFile('./archivo1.txt', leer);
        console.log('última línea del programa función con un nombre explícito: ');

}



{
    //!No es obligatorio que la implementación de la función esté definida antes de llamar a readFile, podría estar implementada al final: <<<<< (PRACTICA DESACONSELJADA) >>>>>

    /// Modificamos el archivo eliminando la función anónima e implementando una función con un nombre explícito:

    const fs = require('fs');
    fs.readFile('./archivo1.txt', leer);
    console.log('última línea del programa función con un nombre explícito: ');


    function leer(error, datos) {
        if (error)
            console.log(error);
        else {
            console.log(datos  + " Funcion explicita"); /// contenido del buffer
            console.log(datos.toString() + " Funcion explicita"); /// mostrar el contenido del Buffer en formato texto llamamos al método toString().
        }
    }

}


