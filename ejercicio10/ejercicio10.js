/// Problema
/// Confeccionaremos un sitio que contenga una serie de archivos html, css, jpg, mp3, mp4 e ico.Crearemos un directorio llamado ejercicio10 y dentro de este otro directorio interno llamado static donde dispondremos todos losarchivos html, css, jpg, mp3, mp4 e ico.En el directorio ejercicio10 tipearemos nuestra aplicacion Node.js que tiene por objetivo servir las páginas HTML y otros recursos quepidan los navegadores web;

const http = require('http');
const fs = require('fs');
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
/* El código está creando un servidor Node.js que sirve archivos HTML, CSS, JPG, MP3, MP4 e ICO desde
un directorio llamado "estático". Utiliza el módulo http para crear el servidor y escucha en el
puerto 8888. Cuando se realiza una solicitud, comprueba si el archivo solicitado existe en el
directorio "estático" utilizando el método stat del módulo fs. Si el archivo existe, lo lee usando
el método readFile del módulo fs y lo envía de vuelta al cliente con el tipo MIME apropiado. Si el
archivo no existe, envía un mensaje de error "Recurso no encontrado" al cliente. */
const servidor = http.createServer((pedido, respuesta) => {
   /* Este código está creando un nuevo objeto de URL utilizando el constructor de URL y concatenándolo
   con la URL solicitada por el cliente. Luego establece la variable "camino" en la ruta del objeto
   URL, que es la ruta del recurso solicitado. Si la ruta es igual a "static/", establece la ruta en
   "static/index.html". Esto se hace para garantizar que si el cliente solicita el directorio raíz,
   servirá el archivo index.html ubicado en el directorio "estático". */
    const url = new URL('http://localhost:8888' + pedido.url);
    let camino = 'static'  + url.pathname;
    if (camino == 'static/') {
        camino = 'static/index.html';
    }
 
/* El código verifica si el archivo solicitado existe en el directorio "estático" usando el método
`fs.stat()`. Si el archivo existe, lo lee de forma asincrónica mediante el método `fs.readFile()` y
lo envía de vuelta al cliente con el tipo MIME adecuado. Si el archivo no existe, envía un mensaje
de error "Recurso inexistente" (Recurso no encontrado) al cliente. */
    fs.stat(camino, (error, stats) => {
        /// El método fs.stat() se usa para devolver información sobre el archivo o directorio dado. Devuelve un objeto fs.Stat que tiene varias propiedades y métodos para obtener detalles sobre el archivo o directorio.
 
        if (!error) {

            /// Lee de forma asincrónica todo el contenido de un archivo; fs.readFile()almacena en búfer todo el archivo
            fs.readFile(camino, (error, contenido) => {
                if (error) {
                    respuesta.writeHead(500, { 'Content-type': 'text/plain' });
                    respuesta.write('error interno');
                    respuesta.end();
                } else {
                    const vector = camino.split('.');
                    console.table(vector);
                    const extencion = vector[vector.length - 1];
                    const mimeArchivo = mime[extencion];
                    respuesta.writeHead(200, { 'Content-Type': mimeArchivo });
                    respuesta.write(contenido);
                    respuesta.end();
                }
            });
        } else {
            respuesta.writeHead(500, { 'Content-Type': 'Text/html' });
            respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');
            respuesta.end();
        }
    });
});
servidor.listen(8888);
console.warn("Servidor iniciado");
 