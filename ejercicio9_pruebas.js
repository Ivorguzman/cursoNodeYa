const http = require('http');
const fs = require('fs');
const servidor = http.createServer((pedido, respuesta) => {
    const url = new URL('http://localhost:7777' + pedido.url);

    console.log("**** Inicio de pedido ****");
    console.log(pedido);
    console.log("**** Fin de pedido ****");

    console.log("<>Iicio de respuesta><>");
    console.log(respuesta);
    console.log("<>Fin de respuesta><>");

    console.log("-");
    console.log("-");
    console.log("---------------------------------------");
    console.log("-");
    console.log("-");
    console.log(url);
    console.log("-");
    console.log("-");
    console.log("Valor de url : " + url);
    console.log("Valor de pedido.url : " + pedido.url);
    console.log("Valor de url.pathname : " + url.pathname);
    console.log("---------------------------------------");
    console.log("-");
    console.log("-");

    /// let camino = 'static' + url.pathname;
    let camino = 'static' + url.pathname;
    if (camino === '/static') {
        camino= 'static/index.html'
    }
    console.log("Valor de camino_2 : " + camino);
    fs.stat(camino, (error, stats) => {
        /// console.log("Valor de OBJ stats : ", JSON.stringify(stats));
        
        console.log("Valor de camino  : " + camino);
        console.log("Valor de error : " + error);
        console.log("Valor de !error : " + !error);
        if (!error) {
            console.log("Valor de error_1 : " + error);
            fs.readFile(camino, (error, contenido) => {

                console.log("---------------------------------------");
                console.log("camino: " + camino);
                // console.log("Valor de contenido : " + contenido);
                console.log("---------------------------------------");
                if (error) {
                    console.log("error_2 : " + error);
                    respuesta.writeHead(500, { 'Content-Type': 'text/plain' });
                    respuesta.write('Error interno');
                    respuesta.end();
                } else {
                    respuesta.writeHead(200, { 'Content-Type': 'text/html' });
                    /// console.log(" respuesta.writeHead  ==> : " + respuesta.writeHead);
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

});
servidor.listen(7777);
console.log('Servidor web iniciado puerto: 7777');