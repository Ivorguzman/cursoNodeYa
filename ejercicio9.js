const http = require('http');
const fs = require('fs');
/* Este código está creando un servidor usando el módulo `http` de Node.js. El método `createServer`
toma una función de devolución de llamada como argumento, que se ejecuta cada vez que se realiza una
solicitud al servidor. La función de devolución de llamada toma dos parámetros: `pedido` (solicitud)
y `respuesta` (respuesta). */
const servidor = http.createServer((pedido, respuesta) => {
    /* `const newUrl = new URL('http://localhost:8888' + pedido.url);` está creando un nuevo objeto URL
    usando el constructor `URL`. Toma la propiedad `pedido.url`, que contiene la URL de la solicitud
    realizada al servidor, y la concatena con la URL base `http://localhost:8888`. Esto crea un
    nuevo objeto de URL que representa la URL completa de la solicitud. La variable `newUrl` se usa
    luego para extraer el nombre de la ruta del recurso solicitado y servir el archivo apropiado
    desde el directorio `static`. */
    const newUrl = new URL('http://localhost:8888' + pedido.url);
    // const url = new URL('http://localhost:8888');
 
    /// let camino = 'static' + url.pathname;
/* Este código está creando una ruta de archivo para servir un archivo estático basado en la URL
solicitada por el cliente. Concatena la cadena 'static' con el nombre de ruta de la URL solicitada y
luego verifica si la ruta resultante es igual a '/static'. Si es así, establece la ruta a
'static/index.html'. Esto se hace para servir el archivo index.html cuando el cliente solicita la
URL raíz del servidor. La ruta del archivo resultante se usa para leer el archivo y enviarlo al
cliente en la respuesta. */
    let camino = 'static' + newUrl.pathname;
    if (camino === '/static') {
        camino = 'static/index.html';
    }
    // ? let camino = url.pathname;
    //? camino = 'static/index.html';
    /// camino = "." + url.pathname;
 
/* Este bloque de código verifica si el archivo solicitado existe en el servidor utilizando el método
`fs.stat` para obtener información sobre el archivo. Si el archivo existe, lee el contenido del
archivo utilizando el método `fs.readFile` y lo envía de vuelta al cliente en la respuesta con un
código de estado de 200. Si el archivo no existe, envía un mensaje de error 404 al cliente con un
código de estado de 404. */
    fs.stat(camino, (error, stats) => {
        if (!error) {
            fs.readFile(camino, (error, contenido) => {
                if (error) {
                    respuesta.writeHead(500, { 'Content-Type': 'text/plain' });
                    respuesta.write('Error interno');
                    respuesta.end();
                } else {
                    respuesta.writeHead(200, { 'Content-Type': 'text/html' });
                    respuesta.write(contenido);
                    respuesta.end();
                }
            });
        } else {
            respuesta.writeHead(404, { 'Content-Type': 'text/html' });
            respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');
            respuesta.end();
        }
    });
    console.warn(newUrl);
});
servidor.listen(8888);
console.warn("Servidor inicido puerto 8888");
 