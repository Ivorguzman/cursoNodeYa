/* This is a JavaScript code that demonstrates how to access files using the Promise class instead of
callbacks. It uses the `fs` module to write a file named `archivo1_b.txt` with some content using
the `writeFile` method. The `then` method is used to handle the successful completion of the
operation and log a message to the console. The `catch` method is used to handle any errors that may
occur during the operation. Finally, a message is logged to the console indicating that the last
line of the program has been executed. */
{
    //! acceso a archivos mediante la clase Promise en lugar de los callbacks (funciones de retorno)
/* Este código JavaScript usa el módulo `fs` para escribir un archivo llamado `archivo1_b.txt` con algo
de contenido usando el método `writeFile`. Está utilizando la clase Promise en lugar de devoluciones
de llamada para manejar la finalización exitosa de la operación y cualquier error que pueda ocurrir
durante la operación. El método `then` se usa para manejar la finalización exitosa de la operación y
registrar un mensaje en la consola, mientras que el método `catch` se usa para manejar cualquier
error que pueda ocurrir durante la operación. Finalmente, se registra un mensaje en la consola que
indica que se ha ejecutado la última línea del programa. */

    const fs = require('fs/promises');

    fs.writeFile('./archivo1_b.txt', 'línea 1\nLínea 2\n creado con promesas.')
        .then(() => {
            console.log('El archivo de texto fue creado empleando promesas')
        })
        .catch(error => {
            console.log(error)
        });
    console.log('Ultima linea del programa');
}






