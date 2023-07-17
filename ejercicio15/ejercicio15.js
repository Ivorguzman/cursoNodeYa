//// Problema Desarrollar nuevamente el sitio web que sirve páginas estáticas.Resolver el formato de archivo que retorna el servidor utilizando elpaquete 'mime'.

{
  //! Solucion basada en  tecnica de  callbacks

  const http = require("http");
  const fs = require("fs");
  const mime = require("mime");

  /// http.createServer(function requestListene (requestListener, respuestaServidor) {...};

  /// pedidoCliente (primer argumento de la funcion requestListene):Función que se ejecuta cada vez que el servidor recibe una solicitud. El objeto [IncomingMessage] se pasa como primer argumento en la [función requestListener]. El objeto IncomingMessage representa la solicitud al servidor con  todos sus Métodos y propiedades (url, headers, setTimeout() entre otros	 )

  /// respuestaServidor (segundo argumento de la funcion requestListene):Función que se ejecuta cada vez que el servidor recibe una solicitud. El objeto [ServerResponse] se pasa como segundo argumento en la [función requestListener]. El objeto ServerResponse representa la respuest del servidor con  todos sus Métodos y propiedades  (end(), write(), writeHead(), statusCode	  entre otros	)
  /* Este código crea un servidor usando el módulo `http` de Node.js y maneja las solicitudes entrantes
usando una función de devolución de llamada que toma dos argumentos: `pedidoCliente` (el objeto de
solicitud entrante) y `respuestaServidor` (el objeto de respuesta del servidor). Luego usa el
paquete `mime` para determinar el formato de archivo del archivo solicitado y sirve el archivo al
cliente con el tipo de contenido apropiado. Si no se encuentra el archivo solicitado, devuelve un
error 404. */
  const servidor = http.createServer((pedidoCliente, respuestaServidor) => {
    const url = new URL("http://localhost:8888" + pedidoCliente.url);
    let camino = "static" + url.pathname;

    console.log("camino == 1>", camino);
    console.log("url == 1>", url);

    if (camino == "static/") {
      camino = "static/index.html";
    }

    console.log("camino == 2>", camino);

    /* Este bloque de código verifica si el archivo solicitado existe mediante el método `fs.stat()`.
      Si el archivo existe, lo lee usando el método `fs.readFile()` y establece el tipo de contenido
      apropiado usando el método `mime.getType()`. Si hay un error al leer el archivo, envía una
     respuesta de error 500. Si el archivo no existe, envía una respuesta de error 404. La respuesta
     se envía mediante el objeto `respuestaServidor`. */
    //? fs.stat( path [,options], callback(error, stats) )
    fs.stat(camino, (error, stats) => {
      if (!error) {
        //? fs.readFile(path [, options], callback(err,data)) ==>  data contenido del archivo.
        fs.readFile(camino, "Utf8", (error, contenidoArchivo) => {
          if (error) {
            console.log("error-switch:true ===", error);
            respuestaServidor.writeHead(500, { "Content-Type": "text/plain" });
            respuestaServidor.write("Error interno");
            respuestaServidor.end();
          } else {
            const tipo = mime.getType(camino);
            console.log("tipo ==> ", tipo);
            respuestaServidor.writeHead(200, { "Content-Type": tipo });
            respuestaServidor.write(contenidoArchivo);
            respuestaServidor.end();
          }
        });

        /* Este bloque de código se ejecuta cuando el archivo solicitado no existe. Establece el encabezado de
respuesta en 404 (No encontrado) y envía un mensaje HTML al cliente indicando que el recurso
solicitado no existe. El mensaje se envuelve en un documento HTML usando el método `write()` y luego
la respuesta finaliza usando el método `end()`. */
      } else {
        respuesta.writeHead(404, { "Content-Type": "text/html" });
        respuesta.write(
          "<!doctype html><html><head></head><body>Recurso inexistente</body></html>"
        );
        respuesta.end();
      }
    });
  });

  servidor.listen(8888);
  console.log("Servidor web iniciado 8888");
}

{
  //! Trabajondo con .then() .catch() y modulo mime

  const mime = require("mime");
  const fs = require("fs/promises");
  const http = require("http");

  /* Este código está creando un servidor usando el módulo `http` de Node.js y manejando las solicitudes
entrantes usando una función de devolución de llamada que toma dos argumentos: `pedidoCliente` (el
objeto de solicitud entrante) y `respuestaServidor` (el objeto de respuesta del servidor). */
  const servidor = http.createServer((pedidoCliente, respuestaServidor) => {
    /* Este código está creando un nuevo objeto de URL utilizando el constructor de URL y
     concatenándolo con la propiedad `pedidoCliente.url` para obtener la URL completa de la
     solicitud entrante. Luego, extrae la propiedad `pathname` del objeto URL y la concatena con la
     cadena 'static' para obtener la ruta al archivo solicitado en el servidor. */
    const url = new URL("http://localhost:7777" + pedidoCliente.url);
    let camino = "static" + url.pathname;

    console.log("camino == 1>", camino);
    console.log("url == 1>", url);

    /* Este bloque de código verifica si la ruta de la URL solicitada es igual a 'estática/'. Si es
     así, establece el valor de la variable `camino` en 'static/index.html'. Esto se hace para
     garantizar que si el usuario solicita el directorio raíz de los archivos estáticos, se le
     entregará el archivo index.html en lugar de un error. */
    if (camino == "static/") {
      camino = "static/index.html";
    }
    console.log("camino == 2>", camino);

    // console.log(camino);
    //? fs.stat( path [,options], callback(error, stats) )
    fs.stat(camino, () => {})
      .then(() => {
        fs.readFile(camino, () => {})
          .then((contenidoArchivo) => {
            const tipo = mime.getType(camino);
            console.log("tipo ==> ", tipo);
            respuestaServidor.writeHead(200, { "Content-Type": tipo });
            respuestaServidor.write(contenidoArchivo);
            respuestaServidor.end();
          })
          .catch((x) => {
            console.log("error(x)==>", x);
            respuestaServidor.writeHead(500, { "Content-Type": "text/plain" });
            respuestaServidor.write("Error interno");
            respuestaServidor.end();
          });
      })
      .catch(() => {
        console.log("error==>", error);
        respuestaServidor.writeHead(404, { "Content-Type": "text/html" });
        respuestaServidor.end(
          "<h1>Error 404: No existe el recurso solicitado</h1>"
        );
      });
  });

  servidor.listen(7777);
  console.log("Servidor web iniciado 7777");
}
