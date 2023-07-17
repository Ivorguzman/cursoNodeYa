

/// 6 - Modulo http:datos que envía el navegador.


const http = require('http');


/* Este código está creando un servidor usando el módulo `http` de Node.js y definiendo una función de
devolución de llamada para manejar las solicitudes entrantes. La línea `const url = new
URL('http://localhost:8888' + pedido.url)` está creando un nuevo objeto URL basado en la URL de la
solicitud entrante (`pedido.url`) y la dirección del servidor ( `http://localhost:8888`). Este
objeto de URL luego se usa para extraer información sobre la solicitud, como el protocolo, el nombre
de host, el puerto, la ruta y los parámetros de búsqueda. */
const servidor = http.createServer((pedido, respuesta) => {
    const url = new URL('http://localhost:8888' + pedido.url);
    console.log('href: ' + url.href);
    console.log('origin: ' + url.origin);
    console.log('protocol: ' + url.protocol);
    console.log('host: ' + url.host);
    console.log('hostname: ' + url.hostname);
    console.log('port: ' + url.port);
    console.log('pathname: ' + url.pathname);
    console.log('search: ' + url.search);

    
    console.log('url.searchParams FUERA del  forEach : ' + url.searchParams);
  /* `url.searchParams.forEach((valor, parametro) => {...}` es un método que itera sobre todos los
  parámetros de consulta en la URL y ejecuta la función provista para cada parámetro. En este caso,
  la función registra el nombre y valor de cada parámetro a la consola. */
    url.searchParams.forEach((valor, parametro) => {
        console.log('url.searchParams DENTRO del  forEach : ' + url.searchParams);
        console.log('valor : ' + valor);
        console.log('parametro :' + parametro);
        console.log('Nombre del parámetro: ' + parametro + '- Valor del parámetro:' + valor);
    });
    
   /* `respuesta.writeHead(200, { 'Content-Type': 'text/html' });` está configurando el encabezado de
   respuesta con un código de estado de 200 (que significa "OK") y un tipo de contenido de
   "text/html ". Esto le dice al navegador que la respuesta que se envía es un documento HTML. */
    respuesta.writeHead(200, { 'Content-Type': 'text/html' });
    respuesta.write('<!doctype html><html><head></head><body>Hola mundo en la carpeta1</body></html>');
    respuesta.end();
});


/* `serevidor.listen(8888)` está iniciando el servidor y diciéndole que escuche en el puerto 8888 las
solicitudes entrantes. `console.log('Servidor web iniciado')` simplemente registra un mensaje en la
consola que indica que se ha iniciado el servidor web. */
servidor.listen(8888);
console.log('Servidor web iniciado');









