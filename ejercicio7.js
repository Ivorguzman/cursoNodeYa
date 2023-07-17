{
  /// Implementar un servidor web con Node.js que retorne HTML con un mensaje indicando que el sitio esta en desarrollo. No importa que archivo pidamos del servidor retornar siempre el mismo HTML.
  //requerimos el módulo 'http' y guardamos una referencia en la constante http:
  /* Esta línea de código importa el módulo integrado de Node.js `http`, que proporciona funcionalidad
   para crear servidores HTTP y realizar solicitudes HTTP. Está asignando el módulo importado a una
   variable constante llamada `http`. */
  const http = require("http");
  //createServer que tiene por objetivo crear un servidor que implementa el protocolo HTTP.
  /* Este código está creando un servidor utilizando el módulo `http` incorporado en Node.js. El método
`createServer` toma una función de devolución de llamada como argumento, que se ejecuta cada vez que
se realiza una solicitud al servidor. En este caso, la función de devolución de llamada toma dos
parámetros: `pedido` (petición) y `respuesta` (respuesta). */
  const servidor = http.createServer((pedido, respuesta) => {
    // asincrona
    respuesta.writeHead(200, { "Content-Type": "text/html" });
    respuesta.write(`<!doctype html><html><head></head>
<body><h1>Sitio en desarrollo Estudiando Node.js</h1></body></html>`);
    /* `respuesta.end();` es un método que le indica al servidor que todos los encabezados y el
       cuerpo de la respuesta han sido enviados, y que el servidor debe considerar este ciclo de
       solicitud/respuesta como completo. Es necesario llamar a este método para cerrar
       correctamente la respuesta y evitar posibles pérdidas de memoria. */
    respuesta.end();
  });
  // La función listen (escucha) que también es asíncrona se queda esperando a recibir peticiones.u
  /* `servidor.listen(8888);` está iniciando el servidor y haciendo que escuche las solicitudes
    entrantes en el puerto 8888. */
  servidor.listen(8888);
  console.log("Servidor web iniciado");
}
