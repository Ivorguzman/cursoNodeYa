/// Problema
/// Confeccionaremos un sitio que contenga una serie de archivos html, css, jpg, mp3, mp4 e ico.Crearemos un directorio llamado ejercicio10 y dentro de este otro directorio interno llamado static donde dispondremos todos losarchivos html, css, jpg, mp3, mp4 e ico.En el directorio ejercicio10 tipearemos nuestra aplicacion Node.js que tiene por objetivo servir las páginas HTML y otros recursos quepidan los navegadores web;

const http = require('http');
const fs = require('fs');
const { isUtf8 } = require('buffer');
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
const servidor = http.createServer((pedido, respuesta) => {
    const url = new URL('http://localhost:8888' + pedido.url);
    let camino = 'static' + url.pathname;
    if (camino == 'static/') {
        camino = 'static/index.html';
      
    }
    console.log(url);
    // console.log("new URL('http://localhost:8888' + pedido.url = " + pedido.url);
    // console.log("url.pathname = " + url.pathname);
    console.log("**************************************");
    console.log("camino = " + camino);
    console.log("**************************************");
    console.log(" ");
    fs.stat(camino, (error, stats) => {
        /// El método fs.stat() se usa para devolver información sobre el archivo o directorio dado. Devuelve un objeto fs.Stat que tiene varias propiedades y métodos para obtener detalles sobre el archivo o directorio.
        // console.log("Valor del objeto stats :" + JSON.stringify(stats));
        if (!error) {
            console.log(error);
            /// Lee de forma asincrónica todo el contenido de un archivo; fs.readFile()almacena en búfer todo el archivo
            fs.readFile(camino,(error, contenido) => {
            // fs.readFile(camino,'utf-8' ,(error, contenido) => {
                if (error) {
                    console.log(error);
                    respuesta.writeHead(500, { 'Content-type': 'text/plain' });
                    respuesta.write('error interno');
                    respuesta.end();
                } else {
                    console.log(error);
                    const vector = camino.split('.');
                    console.table(vector);
                    console.log(vector.length - 1);
                    const extencion = vector[vector.length - 1];
                    console.log(extencion);
                    const mimeArchivo = mime[extencion];
                    console.log(contenido);
                    // console.log(contenido.toString());
                    // console.log(contenido);
                    respuesta.writeHead(200, { 'Content-Type': mimeArchivo });
                    respuesta.write(contenido);
                    respuesta.end();
                }
            });
        } else {
            console.log(error);
            respuesta.writeHead(404, { 'Content-Type': 'Text/html' });
            respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');
            respuesta.end();
        }
    });
});
servidor.listen(8888);
console.warn("Servidor web iniciado 8888 ");