/// Problema
/// Confeccionaremos un sitio que contenga una serie de archivos html, css, jpg, mp3, mp4 e ico.Crearemos un directorio llamado ejercicio10 y dentro de este otro directorio interno llamado static donde dispondremos todos losarchivos html, css, jpg, mp3, mp4 e ico.En el directorio ejercicio10 tipearemos nuestra aplicacion Node.js que tiene por objetivo servir las páginas HTML y otros recursos quepidan los navegadores web;

const http = require('http');
const fs = require('fs');

const mime = {
    "html": "text/thml",
    "css": "text/css",
    "jpg": "image/jpg",
    "ico": "image/x-ico",
    "mp3": "audio/mpeg3",
    "mp4": "video/mp4"
};

const servidor = http.createServer((pedido, respuesta) => {
    const url = new URL('http://localhost:7777' + pedido.url);
    let camino = 'static' + url.pathname;
    if (camino == 'static/') {
        camino = 'static/index.html';
    }
    // console.log(url);
    // console.log("camino :" + camino);
    // console.log("url.pathname :" + url.pathname);
    fs.stat(camino, (error, stats) => {
        console.log("Valor del objeto stats :" + JSON.stringify(stats));
        // console.log("Ruta del archivo :" + stats.isFile());
        // console.log("Ruta del directorio :" + stats.isDirectory());
        if (error) {
            respuesta.writeHead(500, { 'Content-Type': 'Text/plain' });
            respuesta.write('Error interno');
            respuesta.end;
        } else {
            const vector = camino.split('.');
            console.table(vector);


        }

        if (error) {
            respuesta.writeHead(404, { 'Content-Type': 'text/<html>' });
            respuesta.write(('<!doctype html><html><head></head><body>Recurso inexistente</body></html>'));
        }
        else {
            fs.readFile(camino, (error, contenido) => {

            });

        }
    });
});
servidor.listen(7777);
console.warn("Servidor web iniciado");