/// Problema
/// Desarrollar un sitio que muestre una lista de valores del 1 al 20 como hipervínculos. Cuando se presione alguno de dichos hipervínculos mostrar la tabla de multiplicar del valor seleccionado. Pasar como parámetro el valor del número seleccionadof



//! Solucion basada en  tecnica de  callbacks
// requrimiento de los modulos necesarios
const http = require('http');
const fs = require('fs');

// objeto literal mime
/* El código  define un OBJETO JavaScript llamado `mime` que contiene pares clave-valor donde
las claves son extensiones de archivo y los valores son los tipos MIME correspondientes para esas
extensiones de archivo. Este objeto se puede utilizar para determinar el tipo MIME de un archivo en
función de su extensión. */
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

/// http.createServer(function requestListene (requestListener, respuestaServidor) {...};

/// pedidoCliente (primer argumento de la funcion requestListene):Función que se ejecuta cada vez que el servidor recibe una solicitud. El objeto [IncomingMessage] se pasa como primer argumento en la [función requestListener]. El objeto IncomingMessage representa la solicitud al servidor con  todos sus Métodos y propiedades (url, headers, setTimeout() entre otros	 )

/// respuestaServidor (segundo argumento de la funcion requestListene):Función que se ejecuta cada vez que el servidor recibe una solicitud. El objeto [ServerResponse] se pasa como segundo argumento en la [función requestListener]. El objeto ServerResponse representa la respuest del servidor con  todos sus Métodos y propiedades  (end(), write(), writeHead(), statusCode	  entre otros	)
/* Este código está creando un servidor usando el módulo `http` de Node.js. El método `createServer`
toma una función de devolución de llamada como argumento, que se ejecuta cada vez que se realiza una
solicitud al servidor. La función de devolución de llamada toma dos argumentos: `pedidoCliente` (el
objeto de solicitud entrante) y `respuestaServidor` (el objeto de respuesta saliente). */
const servidor = http.createServer((pedidoCliente, respuestaServidor) => {
   url = new URL('http://localhost8888' + pedidoCliente.url);
   camino = 'public' + url.pathname;
   console.log("url === ", url);
   if (camino == 'public/') {
      camino = 'public/index.html';
   }
   enrutamiento(pedidoCliente, respuestaServidor);
   /// Solo con javaScript invocando la funcion antes de crearla (elevacion de funcion)
});

// // servidor.listen(8888);
// // console.log('Servidor web iniciado 8888');


// todo  Enrutamiento  a: public/listanumeros, public/index.html
// todo Manejar execiones  en  los  Enrutamientos
/**
 * La función "enrutamiento" enruta las solicitudes entrantes a diferentes funciones según la ruta
 * especificada.
 * @param pedidoCliente - Este parámetro representa la solicitud del cliente que se envía al servidor.
 * Contiene información como la URL solicitada, el método HTTP, los encabezados y cualquier dato que se
 * envíe junto con la solicitud.
 * @param respuestaServidor - El parámetro "respuestaServidor" es el objeto de respuesta que el
 * servidor devolverá al cliente. Contiene información como el código de estado, los encabezados y el
 * cuerpo de la respuesta.
 */
function enrutamiento(pedidoCliente, respuestaServidor) {
   console.log("camino===", camino);
   switch (camino) {
      case 'public/listanumeros': {
         listar(pedidoCliente, respuestaServidor);
         break;
      }

      case 'public/listadotabla': {
         listarTablaMultiplicar(pedidoCliente, respuestaServidor, url);
         break;
      }
      default: {

         contenido_index(pedidoCliente, respuestaServidor);
      }
   }
}
// todo Servir Contenido de pagina public/index.html
//todo Manejar execiones al servir Contenido de pagina public/index.html

/**
 * Esta función comprueba si existe un archivo, lee su contenido y envía una respuesta con el tipo y
 * contenido MIME del archivo o un mensaje de error si el archivo no existe o no se puede leer.
 * @param pedidoCliente - Este parámetro representa la solicitud realizada por el cliente al servidor.
 * Contiene información como la URL solicitada, encabezados y cualquier dato enviado en el cuerpo de la
 * solicitud.
 * @param respuestaServidor - `respuestaServidor` es el objeto de respuesta que el servidor devolverá
 * al cliente. Contiene métodos para establecer los encabezados de respuesta, escribir el cuerpo de la
 * respuesta y finalizar la respuesta.
 */
function contenido_index(pedidoCliente, respuestaServidor) {
   //? fs.stat( path [,options], callback(err, stats) )
   fs.stat(camino, (error) => {
      // console.log("error ===", error);
      // console.log("error ===", !error);
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

/**
 * La función genera una página web con enlaces a las tablas de multiplicar del 1 al 20.
 * @param pedidoCliente - Este parámetro no se usa en el fragmento de código proporcionado, pero es
 * probable que represente la solicitud realizada por el cliente al servidor.
 * @param respuestaServidor - El objeto de respuesta que se enviará de vuelta al cliente con la página
 * HTML que contiene enlaces a las tablas de multiplicar.
 */
function listar(pedidoCliente, respuestaServidor) {
   const info = '';
   respuestaServidor.writeHead(200, { 'Content-Type': 'text/html' });
   let pagina = '<!doctype html><br /><html><br /><head></head><br /><body>';
   console.log(pagina);
   for (let f = 1; f <= 20; f++) {
      // console.log("${f ==> }", f );
      pagina += `<a href="listadotabla?num=${f}">Tabla de multiplica del   ${f}</a><br><br />`;
   }
   pagina += '</body></html>';
   respuestaServidor.end(pagina);
}





function listarTablaMultiplicar(pedidoCliente, respuestaServidor) {
   url = new URL('http://localhost:8888' + pedidoCliente.url);
   respuestaServidor.writeHead(200, { 'Content-Type': 'text/html' });
   let pagina = '<!doctype html><html><head></head><body>';
   for (let f = 1; f <= 10; f++) {
      pagina += `${url.searchParams.get('num')} X ${f} es  ====> ${url.searchParams.get('num') * f}<br><br />`;
   }
   pagina += '</body></html>';
   respuestaServidor.end(pagina);
}



{



   //! Solucion vasada en  tecnica de  promesas

   // requrimiento de los modulos necesarios
   const http = require('http');
   const fs = require('fs/promises');

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
         case 'public/listanumeros': {
            listar(pedidoCliente, respuestaServidor);
            break;
         }

         case 'public/listadotabla': {
            listarTablaMultiplicar(pedidoCliente, respuestaServidor);
            break;
         }
         default: {

            contenido_index(pedidoCliente, respuestaServidor);

         }
      }
   }





   function contenido_index(pedidoCliente, respuestaServidor) {
      // // fs.stat(camino)
      // //    .then(([...]) => {
      // //       fs.readFile(camino)
      // //          .then(([...]) => {
      // //             ///..codigo
      // //          }).catch(() => {
      // //             /// ...codigo
      // //          });
      // //    }).catch(() => {
      // //       /// ...codigo
      // //    });


      fs.stat(camino)
         .then(() => {
            //? fs.readFile(path [, options], callback(err,data)) ==>  data contenido del archivo.
            fs.readFile(camino)
               .then((contenidoArchivo) => {
                  const vector = camino.split('.');
                  const extension = vector[vector.length - 1];
                  const mimearchivo = mime[extension];
                  respuestaServidor.writeHead(200, { 'Content-Type': mimearchivo });
                  respuestaServidor.write(contenidoArchivo);
                  console.log("contenidoArchivo.toString() ==>", contenidoArchivo.toString());
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



   function listar(pedidoCliente, respuestaServidor) {
      const info = '';
      respuestaServidor.writeHead(200, { 'Content-Type': 'text/html' });
      let pagina = '<!doctype html><br /><html><br /><head></head><br /><body>';
      for (let f = 1; f <= 20; f++) {
         // console.log("${f ==> }", f );
         pagina += `<a href="listadotabla?num=${f}">Tabla de multiplica del   ${f}</a><br><br />`;
      }
      pagina += '</body></html>';
      console.log(pagina);
      respuestaServidor.end(pagina);
   }



   function listarTablaMultiplicar(pedidoCliente, respuestaServidor) {
      url = new URL('http://localhost:8088' + pedidoCliente.url);
      respuestaServidor.writeHead(200, { 'Content-Type': 'text/html' });
      let pagina = '<!doctype html><html><head></head><body>';
      for (let f = 1; f <= 10; f++) {
         pagina += `${url.searchParams.get('num')} X ${f} es  ====> ${url.searchParams.get('num') * f}<br><br />`;
      }
      pagina += '</body></html>';
      respuestaServidor.end(pagina);
   }
}
