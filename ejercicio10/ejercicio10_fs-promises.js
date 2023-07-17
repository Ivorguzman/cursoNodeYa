/// Problema  empleando el módulo 'fs/promises'
/// Confeccionaremos un sitio que contenga una serie de archivos html, css, jpg, mp3, mp4 e ico.Crearemos un directorio llamado ejercicio10 y dentro de este otro directorio interno llamado static donde dispondremos todos losarchivos html, css, jpg, mp3, mp4 e ico.En el directorio ejercicio10 tipearemos nuestra aplicacion Node.js que tiene por objetivo servir las páginas HTML y otros recursos quepidan los navegadores web;

/// Una promesa pendiente puede cumplirse con un valor o rechazarse con un motivo (error)


{
   /// Solucion 1  del ejercicio
   //! Trabajondo solo con los argumentos del .then() .catch()


   const fs = require('fs/promises');
   const http = require('http');

   const mime = {
      'html': 'text/html',
      'css': 'text/css',
      'jpg': 'image/jpg',
      'ico': 'image/x-icon',
      'mp3': 'audio/mpeg3',
      'mp4': 'video/mp4'
   };

   /// http.createServer(function requestListene (requestListener, respuestaServidor) {...};

   /// pedidoCliente (primer argumento de la funcion requestListene):Función que se ejecuta cada vez que el servidor recibe una solicitud. El objeto [IncomingMessage] se pasa como primer argumento en la [función requestListener]. El objeto IncomingMessage representa la solicitud al servidor con  todos sus Métodos y propiedades (url, headers, setTimeout() entre otros	 )

   /// respuestaServidor (segundo argumento de la funcion requestListene):Función que se ejecuta cada vez que el servidor recibe una solicitud. El objeto [ServerResponse] se pasa como segundo argumento en la [función requestListener]. El objeto ServerResponse representa la respuest del servidor con  todos sus Métodos y propiedades  (end(), write(), writeHead(), statusCode	  entre otros	)
/* Este código está creando un servidor Node.js que sirve archivos HTML, CSS, JPG, MP3, MP4 e ICO
ubicados en un directorio llamado "estático". Utiliza el módulo http para crear el servidor y el
módulo fs/promises para leer y servir los archivos. El código escucha en el puerto 8888 y responde a
las solicitudes entrantes comprobando si existe el archivo solicitado, leyendo su contenido y
enviándolo al cliente con el tipo MIME apropiado. Si el archivo no existe, envía una respuesta de
error 404. */
   const servidor = http.createServer((pedido, respuesta) => {
      const url = new URL('http://localhost:8888' + pedido.url);
      let camino = 'static' + url.pathname;

      if (camino == 'static/') {
         camino = 'static/index.html';
      }
      fs.stat(camino)
         .then(() => {
            /* Este código lee el contenido de un archivo ubicado en la ruta especificada por la
            variable `camino` usando el método `fs.readFile()`. Una vez que se lee el contenido del
            archivo, extrae la extensión del archivo de la variable `camino`, busca el tipo MIME
            correspondiente en el objeto `mime` y establece el encabezado `Content-Type` de la
            respuesta a ese MIME tipo. Finalmente, escribe el contenido del archivo en la respuesta
            y finaliza la respuesta. */
            fs.readFile(camino)
               .then(contenido => {
                  const vector = camino.split('.');
                  const extension = vector[vector.length - 1];
                  const mimearchivo = mime[extension];/// anotación de corchete en el objeto mime{......}
                  respuesta.writeHead(200, { 'Content-Type': mimearchivo });
                  respuesta.write(contenido);
                  respuesta.end();
               })
               .catch(error => {
                  respuesta.writeHead(500, { 'Content-Type': 'text/plain' });
                  respuesta.write('Error interno');
                  respuesta.end();
               });
         })
         .catch(error => {
            respuesta.writeHead(404, { 'Content-Type': 'text/html' });
            respuesta.end('<h1>Error 404: No existe el recurso solicitado</h1>');
         });
   });
   servidor.listen(8888);
   console.log('Servidor web iniciado 8888');
}





/* 


{
    /// Solucion 2  del ejercicio
    //! Trabajondo solo con los argumentos del .then(A,B) 

    const fs = require('fs/promises');
    const http = require('http');

    const mime = {
        'html': 'text/html',
        'css': 'text/css',
        'jpg': 'image/jpg',
        'ico': 'image/x-icon',
        'mp3': 'audio/mpeg3',
        'mp4': 'video/mp4'
    };

    const servidor = http.createServer((pedido, respuesta) => {
        const url = new URL('http://localhost:8888' + pedido.url);
        let camino = 'static' + url.pathname;

        console.log(url);
        console.log("pedido.url = ", pedido.url);
        console.log("camino : " + camino);
        console.log("***********************");
        console.log("***********************");
        console.log("***********************");
        if (camino == 'static/') {
            camino = 'static/index.html';
            console.log("camino generado en el if() : " + camino);
        }
        fs.stat(camino).then(
            () => { //? primer parameto de [.then() promesa cumplida con exito]
                fs.readFile(camino)
                    .then(
                        contenido => { //? primer parameto de [.then() promesa cumplida con exito]
                            /// console.log(contenido)
                            const vector = camino.split('.');
                            console.log("vector[]=  :" + camino.split('.'));
                            const extension = vector[vector.length - 1];
                            console.log("extension :" + extension);
                            const mimearchivo = mime[extension];
                            console.log("mimearchivo {}= :" + mimearchivo);
                            respuesta.writeHead(200, { 'Content-Type': mimearchivo });
                            respuesta.write(contenido);
                            // console.log(respuesta.write(contenido));
                            respuesta.end();
                        },
                        (error => {
                            respuesta.writeHead(500, { 'Content-Type': 'text/plain' });
                            respuesta.write('Error interno');
                            respuesta.end();
                        })
                    );
            },
            (error => {
                respuesta.writeHead(404, { 'Content-Type': 'text/html' });
                respuesta.end('<h1>Error 404: No existe el recurso solicitado</h1>');
            })
        );






    }).listen(8888);
    console.log('Servidor web iniciado : 8888');
}


 */




/* 

{
    /// Solucion 3  del ejercicio
    //! Trabajondo solo con los argumentos del  .then(A,null) .then(null,B) 

    const fs = require('fs/promises');
    const http = require('http');

    const mime = {
        'html': 'text/html',
        'css': 'text/css',
        'jpg': 'image/jpg',
        'ico': 'image/x-icon',
        'mp3': 'audio/mpeg3',
        'mp4': 'video/mp4'
    };

    const servidor = http.createServer((pedido, respuesta) => {
        const url = new URL('http://localhost:8888' + pedido.url);
        let camino = 'static' + url.pathname;
        console.log(url);
        console.log("pedido.url = ", pedido.url);
        console.log(camino);
        console.log("***********************");
        console.log("***********************");
        console.log("***********************");
        if (camino == 'static/') {
            camino = 'static/index.html';
            console.log(camino);
        }
        fs.stat(camino)
            .then(
                () => { //? primer parameto de [.then() promesa cumplida con exito]
                    fs.readFile(camino)
                        .then(
                            contenido => { //? primer parameto de [.then() promesa cumplida con exito]
                                /// console.log(contenido)
                                const vector = camino.split('.');
                                console.log("vector :" + vector);
                                const extension = vector[vector.length - 1];
                                console.log("extension :" + extension);
                                const mimearchivo = mime[extension];
                                console.log("mimearchivo :" + mimearchivo);
                                respuesta.writeHead(200, { 'Content-Type': mimearchivo });
                                respuesta.write(contenido);
                                console.log(respuesta.write(contenido));
                                respuesta.end();
                            }, null)

                        .then(
                            null,
                            (error => {
                                respuesta.writeHead(500, { 'Content-Type': 'text/plain' });
                                respuesta.write('Error interno');
                                respuesta.end();
                            })
                        );
                }, null)
            .then(
                null,
                (error => {
                    respuesta.writeHead(404, { 'Content-Type': 'text/html' });
                    respuesta.end('<h1>Error 404: No existe el recurso solicitado</h1>');
                })
            );


    }).listen(8888);
    console.log('Servidor web iniciado 8888');
}

 */




