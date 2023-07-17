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

let url;
let camino;

const servidor = http.createServer((pedidoCliente, respuestaServidor) => {
   // url = new URL('http://localhost:8888' + pedidoCliente.url);
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
   camino = 'public' + pedidoCliente.url;
   // console.log("camino  ==>", camino);

   if (camino == 'public/') {
      camino = 'public/index.html';
   }
   console.log("camino  ==>", camino);
   encaminar(pedidoCliente, respuestaServidor);
});

servidor.listen(8888);


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
console.log('Servidor web iniciado');