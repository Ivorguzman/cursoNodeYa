

/// Problema


/// Implementar un sitio web que permita mediante un formulario HTML ingresar el nombre y comentarios del visitante del sitio. Por otro lado imprimir todos los comentarios que dejanlos visitantes del sitio. Almacenar los comentarios de los visitantes en un archivo de exto.Crear una carpeta llamada ejercicio13 y en su interior crearemos el archivo ejercicio13.js(con el programa en Node.js propiamente dicho) y una carpeta llamada public. En la carpetapublic crear dos archivos html con un menú y un formulario


//! Solucion basada en  tecnica de  callbacks
{
   // requrimiento de los modulos necesarios
   const http = require('http');
   const fs = require('fs');

   // objeto literal mime
   const mime = { // objeto literal mime
      'html': 'text/html',
      'css': 'text/css',
      'jpg': 'image/jpg',
      'ico': 'image/x-icon',
      'mp3': 'audio/mpeg3',
      'mp4': 'video/mp4'
   };

   let camino;
   let url;

   /// http.createServer(function requestListene (requestListener, respuestaServidor) {...};

   /// pedidoCliente (primer argumento de la funcion requestListene):Función que se ejecuta cada vez que el servidor recibe una solicitud. El objeto [IncomingMessage] se pasa como primer argumento en la [función requestListener]. El objeto IncomingMessage representa la solicitud al servidor con  todos sus Métodos y propiedades (url, headers, setTimeout() entre otros	 )

   /// respuestaServidor (segundo argumento de la funcion requestListene):Función que se ejecuta cada vez que el servidor recibe una solicitud. El objeto [ServerResponse] se pasa como segundo argumento en la [función requestListener]. El objeto ServerResponse representa la respuest del servidor con  todos sus Métodos y propiedades  (end(), write(), writeHead(), statusCode	  entre otros	)
   const servidor = http.createServer((pedidoCliente, respuestaServidor) => {
      url = new URL('http://localhost:7777' + pedidoCliente.url);
      camino = 'public' + url.pathname;
      console.log("url === ", url);
      if (camino == 'public/') {
         camino = 'public/index.html';
      }
      enrutamiento(pedidoCliente, respuestaServidor); /// Solo con javaScript invocando la funcion antes de crearla (elevacion de funcion)
   });
   servidor.listen(7777);
   console.log('Servidor web iniciado 7777');


   // todo  Enrutamiento  a:  public/index.html, public/recuperardatos,public/cargar, public/leercomentarios.
   // todo Manejar execiones  en  los  Enrutamientos
   function enrutamiento(pedidoCliente, respuestaServidor) {
      console.log("camino===", camino);
      switch (camino) {
         case 'public/cargar': {

            grabarComentarios(pedidoCliente, respuestaServidor);
            break;
         }

         case 'public/leercomentarios': {
            leerComentarios(pedidoCliente, respuestaServidor);
            break;
         }
         default: {

            contenido_index(pedidoCliente, respuestaServidor);
         }
      }
   }

   // todo Servir Contenido de pagina public/index.html
   //todo Manejar execiones al servir Contenido de pagina public/index.html
   function contenido_index(pedidoCliente, respuestaServidor) {
      //? fs.stat( path [,options], callback(err, stats) )
      fs.stat(camino, (error) => {
         console.log("error ===", error);
         console.log("error ===", !error);
         if (!error) {
            //? fs.readFile(path [, options], callback(err,data)) ==>  data contenido del archivo.
            console.log("error-switch:false ===", error);
            console.log("error-switch:false ===", !error);

            fs.readFile(camino, "Utf8", (error, contenidoArchivo) => {

               switch (error, contenidoArchivo) {
                  case error: {
                     console.log("error-switch:true ===", error);
                     respuestaServidor.writeHead(500, { 'Content-Type': 'text/plain' });
                     respuestaServidor.write('Error interno');
                     respuestaServidor.end();
                     break;
                  }
                  case contenidoArchivo: {
                     const vector = camino.split('.');
                     const extension = vector[vector.length - 1];
                     const mimearchivo = mime[extension];
                     respuestaServidor.writeHead(200, { 'Content-Type': mimearchivo });
                     respuestaServidor.write(contenidoArchivo);
                     respuestaServidor.end();
                  }
               }
            });
         } else {
            respuestaServidor.writeHead(404, { 'Content-Type': 'text/html' });
            respuestaServidor.write('<h1>Error 404: Uf. !Tenemos un problema Alex. </h1>');
            respuestaServidor.end();

         }
      });
   };



   function grabarComentarios(pedidoCliente, respuestaServidor) {
      respuestaServidor.write('<h1>grabarComentarios</h1>');
      let info = '';
      pedidoCliente.on('data', datosparciales => {
         info += datosparciales;
      });
      pedidoCliente.on('end', function () {
         const formulario = new URLSearchParams(info);
         console.log(".on_formulario=== ", formulario);
         respuestaServidor.writeHead(200, { 'Content-Type': 'text/html' });
         respuestaServidor.end();
         grabarEnArchivo(formulario);
      });
   }

   function grabarEnArchivo(formulario) {
      console.log(" datos-formulario=== ", formulario);
      const datos =
         `<!doctype html>
         <html>
         <head><meta charset="UTF-8"></head>
         <body>
            Nombre:${formulario.get('nombre')}<br>
            Comentarios:${formulario.get('comentarios')}<br> <hr>
         </body>
         </html>`;
      console.log(" datos-", formulario);
      fs.appendFile('public/visitas.txt', datos, (error) => {
         if (error)
            console.log(error);
      });

   }
   function leerComentarios(pedidoCliente, respuestaServidor) {
      fs.readFile('public/visitas.txt', (error, datos) => {
         if (error) {
            console.log(error);
            respuestaServidor.writeHead(500, { 'Content-Type': 'text/plain' });
            respuestaServidor.end('Error interno');
         } else if (datos) {
            respuestaServidor.writeHead(200, { 'Content-Type': 'text/html' });
            let comentario = respuestaServidor.write(datos);
            respuestaServidor.end(`<!doctype html><html><head><meta charset="UTF-8"></head><body>
               ${comentario} <a href="index.html">Retornar</a></body></html>`);
         }
      });
   }
}


{
   //! Solucion vasada en  tecnica de  promesas

   // requrimiento de los modulos necesarios
   const http = require('http');
   const fs = require('fs');

   // objeto literal mime
   const mime = {
      'html': 'text/html',
      'css': 'text/css',
      'jpg': 'image/jpg',
      'ico': 'image/x-icon',
      'mp3': 'audio/mpeg3',
      'mp4': 'video/mp4'
   };

   let camino;
   let url;
   let datos;

   const servidor = http.createServer((pedidoCliente, respuestaServidor) => {
      url = new URL('http://localhost:8888' + pedidoCliente.url);
      camino = 'public' + url.pathname;
      console.log("url === ", url);

      if (camino == 'public/') {
         camino = 'public/index.html';
      }

      enrutamiento(pedidoCliente, respuestaServidor); /// Solo con javaScript invocando la funcion antes de crearla (elevacion de funcion)
   });

   servidor.listen(8888);
   console.log('Servidor web iniciado 8888');


   // todo  Enrutamiento  a:  public/index.html, public/recuperardatos,public/cargar, public/leercomentarios.
   // todo Manejar execiones  en  los  Enrutamientos
   function enrutamiento(pedidoCliente, respuestaServidor) {
      console.log("camino===", camino);
      switch (camino) {
         case 'public/cargar': {

            grabarComentarios(pedidoCliente, respuestaServidor);
            break;
         }

         case 'public/leercomentarios': {
            leerComentarios(pedidoCliente, respuestaServidor);
            break;
         }
         default: {

            contenido_index(pedidoCliente, respuestaServidor);
         }
      }
   }





   function contenido_index(pedidoCliente, respuestaServidor) {
        //? fs.stat(path[,options], callback(err,stats))
      /* El código  es una función de JavaScript que lee un archivo de una ruta determinada y
      envía su contenido como respuesta a una solicitud HTTP. Primero verifica si el archivo existe
      usando el método `fs.stat()`, y si existe, lee el archivo usando el método `fs.readFile()`.
      Luego extrae la extensión del archivo de la ruta, determina el tipo MIME del archivo usando un
      objeto `mime` predefinido, establece el encabezado del tipo de contenido apropiado en la
      respuesta HTTP, escribe el contenido del archivo en la respuesta y finaliza la respuesta. Si
      el archivo no existe o hay un error al leer */
      fs.stat(camino)
         .then(() => {
            //? fs.readFile(path [, options], callback(err,data)) ==>  data contenido del archivo.
            /* El código  lee un archivo de la ruta especificada y envía su contenido como
            respuesta a una solicitud HTTP. Primero lee el archivo usando el método `fs.readFile()`,
            luego determina la extensión del archivo y el tipo MIME correspondiente usando un objeto
            llamado `mime`. Luego establece los encabezados de respuesta con el tipo MIME apropiado
            y escribe el contenido del archivo en el cuerpo de la respuesta usando
            `respuestaServidor.write()`. Finalmente, finaliza la respuesta usando
            `respuestaServidor.end()`. Si hay un error al leer el archivo, envía una respuesta de
            error 500. */
            fs.readFile(camino)
               .then((contenidoArchivo) => {
                  const vector = camino.split('.');
                  const extension = vector[vector.length - 1];
                  const mimearchivo = mime[extension];
                  respuestaServidor.writeHead(200, { 'Content-Type': mimearchivo });
                  respuestaServidor.write(contenidoArchivo);
                  respuestaServidor.end();
               }).catch((error) => {
                  console.log("error==> ", error);
                  respuestaServidor.writeHead(500, { 'Content-Type': 'text/plain' });
                  respuestaServidor.write('Error interno');
                  respuestaServidor.end();
               });
         }).catch((error) => {
            console.log("error==> ", error);
            respuestaServidor.writeHead(404, { 'Content-Type': 'text/html' });
            respuestaServidor.write('<h1>Error 404: Uf. !Tenemos un problema Alex. </h1>');
            respuestaServidor.end();
         });
   }



/**
 * La función "grabarComentarios" recibe datos de la solicitud de un cliente, los procesa y los escribe
 * en un archivo.
 * @param pedidoCliente - Este parámetro representa el objeto de solicitud del cliente, que contiene
 * información sobre la solicitud HTTP entrante realizada por el cliente.
 * @param respuestaServidor - El parámetro "respuestaServidor" es un objeto de respuesta que se utiliza
 * para enviar una respuesta al cliente que realizó la solicitud. Se utiliza para establecer los
 * encabezados y el cuerpo de la respuesta, y para finalizar la respuesta.
 */
   function grabarComentarios(pedidoCliente, respuestaServidor) {
      respuestaServidor.write('<h1>grabarComentarios</h1>');
      let info = '';
      pedidoCliente.on('data', datosparciales => {
         info += datosparciales;
      });
      pedidoCliente.on('end', function () {
         const formulario = new URLSearchParams(info);
         console.log(".on_formulario=== ", formulario);
         respuestaServidor.writeHead(200, { 'Content-Type': 'text/html' });
         respuestaServidor.end();
         grabarEnArchivo(pedidoCliente, respuestaServidor, formulario);
      });
   }

/**
 * Esta función agrega datos de un formulario a un archivo y registra los datos en la consola.
 * @param pedidoCliente - No se especifica qué representa el parámetro pedidoCliente en esta función.
 * @param respuestaServidor - Es un parámetro que representa el objeto de respuesta del servidor, que
 * se utiliza para enviar la respuesta al cliente.
 * @param formulario - Es un parámetro que representa los datos del formulario enviados por el cliente
 * en una solicitud HTTP. Se utiliza para extraer los valores de campos de formulario como 'nombre' y
 * 'comentarios' en la función.
 */
   function grabarEnArchivo(pedidoCliente, respuestaServidor, formulario) {
      console.log(" datos-formulario=== ", formulario);
      datos =
         `<!doctype html>
         <html>
         <head><meta charset="UTF-8"></head>
         <body>
            Nombre:${formulario.get('nombre')}<br>
            Comentarios:${formulario.get('comentarios')}<br> <hr>
         </body>
         </html>`;
      console.log(" datos-", formulario);
      fs.appendFile('public/visitas.txt', datos).then(() => {
         console.log("Se copiaron los siguientes datos ==", datos);
      }).catch((error) => {
         console.log(error);
         respuestaServidor.writeHead(404, { 'Content-Type': 'text/html' });
         respuestaServidor.end('<h1>Error 404: No existe el recurso solicitado</h1>');
      });
   }


/**
 * La función lee los comentarios de un archivo y los envía como respuesta a una solicitud del
 * servidor.
 * @param pedidoCliente - La solicitud realizada por el cliente al servidor, que incluye información
 * como la URL, los encabezados y cualquier dato enviado en el cuerpo de la solicitud.
 * @param respuestaServidor - El parámetro "respuestaServidor" es el objeto de respuesta que el
 * servidor devolverá al cliente. Contiene información como el código de estado, los encabezados y el
 * cuerpo de la respuesta.
 */
   function leerComentarios(pedidoCliente, respuestaServidor) {
      fs.readFile("public/visitas.txt").then((datos) => {
         respuestaServidor.writeHead(200, { 'Content-Type': 'text/html' });
         let comentario = respuestaServidor.write(datos);
         respuestaServidor.write(`<!doctype html><html><head><meta charset="UTF-8"></head><body>
         ${comentario} <a href="index.html">Retornar</a></body></html>`);
         respuestaServidor.end();
      }).catch((error) => {
         console.log(error);
         respuestaServidor.writeHead(500, { 'Content-Type': 'text/plain' });
         respuestaServidor.write('Error interno');
         respuestaServidor.end();
      });
   }
}


























