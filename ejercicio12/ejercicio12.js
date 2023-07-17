
/// Problema

/// Implementar un formulario HTML que solicite ingresar el nombre de usuario y su clave.Cuando se presione el botón submit,  proceder a recuperar los datos del formulario y generaruna página HTML dinámica que muestre los dos valores ingresados por el usuario.


// {
//     //! Original de la guia com uso de callbacks
// 
//     const http = require('http');
//     const fs = require('fs');
//     const mime = {
//         'html': 'text/html',
//         'css': 'text/css',
//         'jpg': 'image/jpg',
//         'ico': 'image/x-icon',
//         'mp3': 'audio/mpeg3',
//         'mp4': 'video/mp4'
//     };
// 
//     var url;
//     var camino;
// 
//     const servidor = http.createServer((pedido, respuesta) => {
//         url = new URL('http://localhost:8888' + pedido.url);
//         camino = 'public' + url.pathname;
//         if (camino == 'public/') {
//             console.log("1_camino : ", (camino));
//             camino = 'public/index.html';
//         };
//         encaminar(pedido, respuesta, camino);
// 
// 
//     });
//     servidor.listen(8888);
// 
//     function encaminar(pedido, respuesta, camino) {
//         // console.log(url);
//         console.log("2_camino ==>", camino);
//         console.log("3_url.protocol ==>", url.protocol);
//         console.log("4_url.origin ==>", url.origin);
//         console.log("5_url.port: ==>", url.port);
//         console.log("6_camino ==>: ", camino);
// 
//         switch (camino) {
//             case 'public/recuperardatos': {
//                 recuperar(pedido, respuesta);
//                 break;
//             }
//             default: {
//                 fs.stat(camino, error => {
//                     if (!error) {
//                         console.log("error :", error);
//                         fs.readFile(camino, (error, contenido) => {
//                             if (error) {
//                                 respuesta.writeHead(500, { 'Content-Type': 'text/plain' });
//                                 respuesta.write('Error interno');
//                                 respuesta.end();
//                             } else {
//                                 const vec = camino.split('.');
//                                 const extension = vec[vec.length - 1];
//                                 const mimearchivo = mime[extension];
//                                 respuesta.writeHead(200, { 'Content-Type': mimearchivo });
//                                 respuesta.write(contenido);
//                                 respuesta.end();
//                             }
//                         });
//                     } else {
//                         console.log(error);
//                         respuesta.writeHead(404, { 'Content-Type': 'text/html' });
//                         respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');
//                         respuesta.end();
//                     }
//                 });
//             }
// 
//         }
//     }
//     function recuperar(pedido, respuesta) {
//         let info = '';
//         pedido.on('data', datosparciales => {
//             // // console.log("pedido :", pedido);
//             // // console.log("datosparciales :", pedido);
//             console.log("info += datosparciales :", info += datosparciales);
// 
//         });
//         pedido.on('end', () => {
//             const formulario = new URLSearchParams(info);
//             console.log(" formulario :", formulario);
// 
//             respuesta.writeHead(200, { 'Content-Type': 'text/html' });
//             const pagina =
//                 `<!doctype html><html><head></head><body>
//                     Nombre de usuario:${formulario.get('nombre')}<br>
//                     Clave:${formulario.get('clave')}<br>
//                     <a href="index.html">Retornar</a>
//                 </body></html>`;
//             respuesta.end(pagina);
//         });
//     }
//     console.log('Servidor web iniciado 8888');
// }
// 
// 
// 
// 
// 
// 
// 
// {
// 
//     //! Original de la guia com uso de promesas
// 
//     const http = require('http');
//     const fs = require('fs/promises');
//     const mime = {
//         'html': 'text/html',
//         'css': 'text/css',
//         'jpg': 'image/jpg',
//         'ico': 'image/x-icon',
//         'mp3': 'audio/mpeg3',
//         'mp4': 'video/mp4'
//     };
//     const servidor = http.createServer((pedido, respuesta) => {
//         const url = new URL('http://localhost:8888' + pedido.url);
//         let camino = 'public' + url.pathname;
//         if (camino == 'public/')
//             camino = 'public/index.html';
//         encaminar(pedido, respuesta, camino);
//     });
//     servidor.listen(8888);
//     function encaminar(pedido, respuesta, camino) {
//         console.log(camino);
//         switch (camino) {
//             case 'public/recuperardatos': {
//                 recuperar(pedido, respuesta);
//                 break;
//             }
//             default: {
//                 fs.stat(camino)
//                     .then(() => {
//                         fs.readFile(camino)
//                             .then(contenido => {
//                                 const vec = camino.split('.');
//                                 const extension = vec[vec.length - 1];
//                                 const mimearchivo = mime[extension];
//                                 respuesta.writeHead(200, { 'Content-Type': mimearchivo });
//                                 respuesta.write(contenido);
//                                 respuesta.end();
//                             })
//                             .catch(error => {
//                                 respuesta.writeHead(500, { 'Content-Type': 'text/plain' });
//                                 respuesta.write('Error interno');
//                                 respuesta.end();
//                             });
//                     })
//                     .catch(error => {
//                         respuesta.writeHead(404, { 'Content-Type': 'text/html' });
//                         respuesta.end('<h1>Error 404: No existe el recurso solicitado</h1>');
//                     });
//             }
//         }
//     }
//     function recuperar(pedido, respuesta) {
//         let info = '';
//         pedido.on('data', datosparciales => {
//             info += datosparciales;
//         });
//         pedido.('end', () => {
//             const formulario = new URLSearchParams(info);
//             console.log(formulario);
//             respuesta.writeHead(200, { 'Content-Type': 'text/html' });
//             const pagina =
//                 `<!doctype html><html><head></head><body>
//                     Nombre de usuario:${formulario.get('nombre')}<br>
//                     Clave:${formulario.get('clave')}<br>
//                     <a href="index.html">Retornar</a>
//                 </body></html>`;
//             respuesta.end(pagina);
//         });
//     }
//     console.log('Servidor web iniciado');
// 
// 
// }
// 
// 
// 
// 











// 
// 
// 
// {
//     //! Mi version un solo bloque com uso de callbacks
// 
//     const http = require('http');
//     const fs = require('fs');
// 
//     const mime = {
//         'html': 'text/html',
//         'css': 'text/css',
//         'jpg': 'image/jpg',
//         'ico': 'image/x-icon',
//         'mp3': 'audio/mpeg3',
//         'mp4': 'video/mp4'
//     };
// 
// 
// 
//     const servidor = http.createServer((pedido, respuesta) => {
//         let url = new URL('http://localhost:8888' + pedido.url);
//         let camino = 'public' + url.pathname;
//         /* console.log("0_url.pathname ==>: ", url.pathname); */
//         if (camino == 'public/') {
//             console.log("1_camino : ", (camino));
//             camino = 'public/index.html';
//         };
//         /* console.log("2_camino ==>", camino);
//         console.log("3_url.protocol ==>", url.protocol);
//         console.log("4_url.origin ==>", url.origin);
//         console.log("5_url.port: ==>", url.port);
//         console.log("6_camino ==>: ", camino); */
// 
//         switch (camino) {
//             case 'public/recuperardatos': {
//                 let info = '';
//                 pedido.on('data', datosparciales => {
//                     console.log("pedido :", pedido);
//                     // // console.log("datosparciales :", pedido);
//                     console.log("info += datosparciales :", info += datosparciales);
// 
//                 });
//                 pedido.on('end', () => {
//                     const formulario = new URLSearchParams(info);
//                     console.log(" formulario :", formulario);
// 
//                     respuesta.writeHead(200, { 'Content-Type': 'text/html' });
//                     const pagina =
//                     `<!doctype html><html><head></head><body>
//                         Nombre de usuario:${formulario.get('nombre')}<br>
//                         Clave:${formulario.get('clave')}<br>
//                         <a href="index.html">Retornar</a>
//                     </body></html>`;
//                     respuesta.end(pagina);
//                 });
//                 break;
//             }
//             default: {
//                 fs.stat(camino, (error) => {
//                     console.log("2_camino : ", (camino));
//                     console.log(url);
//                     if (!error) {
//                         console.log("error :", error);
//                         fs.readFile(camino, (error, contenido) => {
//                             if (error) {
//                                 respuesta.writeHead(500, { 'Content-Type': 'text/plain' });
//                                 respuesta.write('Error interno');
//                                 respuesta.end();
//                             } else {
//                                 const vec = camino.split('.');
//                                 const extension = vec[vec.length - 1];
//                                 const mimearchivo = mime[extension];
//                                 respuesta.writeHead(200, { 'Content-Type': mimearchivo });
//                                 respuesta.write(contenido);
//                                 respuesta.end();
//                             }
//                         });
//                     } else {
//                         console.log(error);
//                         respuesta.writeHead(404, { 'Content-Type': 'text/html' });
//                         respuesta.write('<!doctype html><html><head></head><body>Recurso no inexiste</body></html>');
//                         respuesta.end();
//                     }
//                 });
//                 break;
//             }
// 
//         }
// 
//     });
//     servidor.listen(8888);
//     console.log('Servidor web iniciado 8888');
// 
// 
// }
// 
// 




{
   //?  Mi version com uso de Promesas modularizado

   //todo  ----- Creacion del servidor ------
   const http = require('http');
   const fs = require('fs/promises');

   const mime = {
      'html': 'text/html',
      'css': 'text/css',
      'jpg': 'image/jpg',
      'ico': 'image/x-icon',
      'mp3': 'audio/mpeg3',
      'mp4': 'video/mp4'
   };
   var camino;
   var url;

/// http.createServer(function requestListene (requestListener, respuestaServidor) {...};

/// pedidoCliente (primer argumento de la funcion requestListene):Función que se ejecuta cada vez que el servidor recibe una solicitud. El objeto [IncomingMessage] se pasa como primer argumento en la [función requestListener]. El objeto IncomingMessage representa la solicitud al servidor con  todos sus Métodos y propiedades (url, headers, setTimeout() entre otros	 )

/// respuestaServidor (segundo argumento de la funcion requestListene):Función que se ejecuta cada vez que el servidor recibe una solicitud. El objeto [ServerResponse] se pasa como segundo argumento en la [función requestListener]. El objeto ServerResponse representa la respuest del servidor con  todos sus Métodos y propiedades  (end(), write(), writeHead(), statusCode	  entre otros	)
   const servidor = http.createServer((pedidoCliente, respuestaServidor) => {
      url = new URL('http://localhost:8888' + pedidoCliente.url);
      camino = 'public' + url.pathname;

      console.log(camino);
      if (camino == 'public/') {
         camino = 'public/index.html';
      }
      // console.log(camino);
      // console.log(pedidoCliente);
      enrutamiento(pedidoCliente, respuestaServidor);

   });
   servidor.listen(8888);
   console.log('Servidor web iniciado 8888');





   // todo  Enrutamiento <_ public/index.html _>  ó  <_ public/recuperardatos : retorna la página estática index.html como 
   // todo Manejar execiones  en  los  Enrutamientos
   function enrutamiento(pedidoCliente, respuestaServidor) {
      // console.log(resolve);
      console.log(camino);
      switch (camino) {
         case 'public/index.html': {
            contenido_index(pedidoCliente, respuestaServidor); /// Solo con javaScript invocando la funcion antes de crearla (elevacion de funcion)
            break;
         }
         case 'public/recuperardatos': {
            contenido_recuperardatos(pedidoCliente, respuestaServidor); /// Solo con javaScript invocando la funcion
            break;
         }
         default: {
            respuestaServidor.writeHead(404, { 'Content-Type': 'text/html' });
            respuestaServidor.end('<h1>Error 404:      | Ruta no encontrada |    </h1> <br /> <p><a href="index.html">Retornar a pagina principal</a></p>');
            break;
         }
      }
   };




   // todo Servir Contenido de pagina public/index.html
   // todo Manejar execiones al servir Contenido de pagina public/index.html
   function contenido_index(pedidoCliente, respuestaServidor) {
      fs.stat(camino)
         .then(() => {
            fs.readFile(camino)
               .then((contenidoArchivo) => {
                  console.log("contenidoArchivo ==> ", contenidoArchivo.toString());
                  const vector = camino.split('.');// creando vector
                  const extension = vector[vector.length - 1]; // extrallendo extencion
                  const mimearchivo = mime[extension]; // utilizando extención
                  respuestaServidor.writeHead(200, { 'Content-Type': mimearchivo });
                  respuestaServidor.write(contenidoArchivo);// 
                  respuestaServidor.end();
               });
         }).catch(error => {
            respuestaServidor.writeHead(404, { 'Content-Type': 'text/html' });
            respuestaServidor.end('<h1>Error 404: No existe el recurso solicitado</h1>');
         });
   }


   // todo modulo  Sirviendo Contenido de  public/recuperardatosn(creada dinamicamente)
   function contenido_recuperardatos(pedidoCliente, respuestaServidor) {
      let info = '';

      pedidoCliente.on('data', function (datosparciales) {
         info += datosparciales; //llegando los datos concatenando en variable  'info'.
         console.log("info : ", info);
         console.log("datosparciales : ", datosparciales);
         console.log("datosparciales.toString() : ", datosparciales.toString());
         // console.log(pedidoCliente);
      });


      pedidoCliente.on('end', function () {
         const formulario = new URLSearchParams(info); // contiene  datos del formulario
         // console.log(formulario);
         respuestaServidor.writeHead(200, { 'Content-Type': 'text/html' });
         const pagina = `<!doctype html>
            <html><head></head>
            <body>
               Nombre de usuario:${formulario.get('nombre')}<br>
               Clave:${formulario.get('clave')}<br>
               <a href="index.html">Retornar</a>
            </body>
            </html>`;
         respuestaServidor.end(pagina);
      });



   }








}

