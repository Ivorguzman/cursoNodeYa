/* 
Problema
Confeccionar una aplicación que permita subir fotos al servidor. Debe implementar un formulario para la selección de la foto. Listartodos los archivos subidos al servidor.
Crearemos un directorio llamado ejercicio16. Dentro de este crear el archivo 'ejercicio16.js' que contendrá nuestro programa Node.js.Dentro de la carpeta ejercicio16 crear una subcarpeta llamada 'public'.En la carpeta public crear dos archivos html: index.html y formulario.html.
Crear dentro de la carpeta public una subcarpeta llamada upload donde almacenaremos los archivos que suben los usuarios.
 */

const http = require('http');
const fs = require('fs');
const formidable = require('formidable');
const mime = {
   'html': 'text/html',
   'css': 'text/css',
   'jpg': 'image/jpg',
   'ico': 'image/x-icon',
   'mp3': 'audio/mpeg3',
   'mp4': 'video/mp4',
   'mp3': 'audio/mp3'

};

/* `let url` y `let camino` declaran dos variables que se usarán para almacenar la URL y la ruta de la
solicitud del cliente entrante. Se inicializan como indefinidos y se les asignarán valores más
adelante en el código. */
let url;
let camino;

/* Crea un servidor usando el módulo `http` de Node.js y configura una función de devolución de llamada para manejar las solicitudes entrantes. La función callback toma dos parámetros: `pedidoCliente`(petición del cliente) y `respuestaServidor` (respuesta del servidor). */
/* `url = new URL('http://localhost:8888' + pedidoCliente.url);` está creando un nuevo objeto URL
concatenando la URL base "http://localhost:8888" con la ruta de la solicitud entrante `
pedidoCliente.url`. Esto permite que el servidor analice y manipule los componentes de la URL por separado, como el nombre de ruta, los parámetros de consulta y el hash. */
// Establecer el servidor y carga la respuesta
const servidor = http.createServer((pedidoCliente, respuestaServidor) => {
   // url = new URL('http://localhost:8888' + pedidoCliente.url);

  /* `url = new URL('http://localhost:8888' + pedidoCliente.url);` está creando un nuevo objeto URL
  concatenando la URL base "http://localhost:8888" con la ruta de la solicitud entrante `
  pedidoCliente.url`. Esto permite que el servidor analice y manipule los componentes de la URL por
  separado, como el nombre de la ruta, los parámetros de consulta y el hash. */
   url = new URL('http://localhost:8888' + pedidoCliente.url);
   
   
   console.log("pedidoCliente", pedidoCliente);
   console.log(" ");
   console.log(" ");
   console.log("pedidoCliente.url ==>", pedidoCliente.url);
   console.log("url.pathname ==>", url.pathname);
   console.log("==> http://localhost:8888" + pedidoCliente.url);
   console.log(" ");
   console.log(" ");
   console.log("url ==> ", url);

   //? camino = 'public' + url.pathname;
  /* `camino = 'public' + pedidoCliente.url;` está concatenando la cadena 'public' con la ruta URL de
  la solicitud del cliente entrante, y asignando la cadena resultante a la variable `camino`. Esto
  se usa más adelante en el código para determinar qué acción tomar en función de la ruta de URL
  solicitada. */
   camino = 'public' + pedidoCliente.url;
   // console.log("camino  ==>", camino);

   if (camino == 'public/') {
      camino = 'public/index.html';
   }
   console.log("camino  ==>", camino);
   encaminar(pedidoCliente, respuestaServidor);
});

servidor.listen(8888);
console.log('Servidor web iniciad puerto:8888');


function encaminar(pedidoCliente, respuestaServidor) {
   switch (camino) {
      case 'public/subir': {
         subir(pedidoCliente, respuestaServidor);
         break;
      }
      case 'public/listadofotos': {
         listar(respuestaServidor);
         break;
      }
      default: {
         fs.stat(camino, error => {
            console.log("error fs.stat ==>", error);
            console.log("!error fs.stat ==>", !error);
            if (!error) {
               fs.readFile(camino, (error, contenido) => {
                  console.log("error fs.readFile ==>", error);
                  if (error) {
                     respuestaServidor.writeHead(500, { 'Content-Type': 'text/plain' });
                     respuestaServidor.write('Error interno');
                     respuestaServidor.end();
                  } else {
                     const vec = camino.split('.');
                     const extension = vec[vec.length - 1];
                     const mimearchivo = mime[extension];
                     respuestaServidor.writeHead(200, { 'Content-Type': mimearchivo });
                     respuestaServidor.write(contenido);
                     respuestaServidor.end();
                  }
               });
            } else {
               respuestaServidor.writeHead(404, { 'Content-Type': 'text/html' });
               respuestaServidor.end('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');
               // respuestaServidor.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');
               // respuestaServidor.end();
            }
         });
      }
   }
}


/// formidable.IncomingForm() Crea un nuevo formulario entrante.

/// form.parse(solicitud, callback (err, fields, files)==>{....}) Analiza una solicitud entrante de Node.js que contiene datos de formulario. Si se proporciona devolución de llamada, todos los campos y los archivos se recopilan y pasan a la devolución de llamada.

/// rename('oldFile.txt', 'newFile.txt', (err) => {...} Renombrar asíncronamente el archivo en oldPath al nombre de ruta proporcionado como nuevaRuta

/**
 * La función maneja las cargas de archivos desde un cliente y guarda el archivo en un directorio
 * específico en el servidor.
 * @param pedidoCliente - Este parámetro representa la solicitud realizada por el cliente al servidor.
 * @param respuestaServidor - El parámetro "respuestaServidor" es el objeto de respuesta que el
 * servidor devolverá al cliente. Se utiliza para devolver datos al cliente, como HTML, JSON u otros
 * tipos de datos.
 */
function subir(pedidoCliente, respuestaServidor) {
   var form = new formidable.IncomingForm();
   form.parse(pedidoCliente, (err, fields, files) => {
      // console.log("pedidoCliente ==>", pedidoCliente);
      console.log("fields ==>", fields);
      console.log("err ==>", err);
      console.log("files ==>", files);
      console.log(" files.foto1 ==>", files.foto1);
      console.log(" files.foto1.filepath ==>", files.foto1.filepath);
      console.log(" files.foto1.originalFilename ==>", files.foto1.originalFilename);

      let path = files.foto1.filepath;
      let nuevoPath = './public/upload/' + files.foto1.originalFilename;
      fs.rename(path, nuevoPath, function (error) {
         respuestaServidor.writeHead(200, { 'Content-Type': 'text/html' });
         // respuestaServidor.write('<!doctype html><html><head></head><body>' +
         //    'Archivo subido<br><a href="index.html">Retornar</a></body></html>');
         respuestaServidor.end('<!doctype html><html><head></head><body>' +
            'Archivo subido<br><a href="index.html">Retornar</a></body></html>');
      });
   });
}
/**
 * La función enumera todos los archivos en el directorio "public/upload" y los muestra como imágenes
 * en una página HTML.
 * @param respuestaServidor - Es un parámetro que representa el objeto de respuesta que el servidor
 * devolverá al cliente.
 */
function listar(respuestaServidor) {
   fs.readdir('./public/upload/', (error, archivos) => {
      let fotos = '';

      console.log("error =>", error);
      console.log("archivos =>", archivos);

      for (let x = 0; x < archivos.length; x++) {
         fotos += `<img src="upload/${archivos[x]}"><br>`;

         console.log("archivos[x] =>", archivos[x]);
         console.log("fotos =>", fotos);

      }
      respuestaServidor.writeHead(200, { 'Content-Type': 'text/html' });
      respuestaServidor.write(`<!doctype html><html><head></head>
<body>${fotos}<a href="index.html">
Retornar</a></body></html>`);
      respuestaServidor.end();
   });
}
