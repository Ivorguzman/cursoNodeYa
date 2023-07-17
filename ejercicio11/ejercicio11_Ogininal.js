/// Problema
/// Desarrollar un sitio en Node.js que permita servir archivos estáticos y haga más eficiente su trabajo implementando un sistema de cache de los archivos del servidor.

/*
 1 requerir modulas.
 2 crear servidor.
 3 crear objeto URL.
 4.generar la ruta url (camino)

*/

{
  const http = require("http");
  const fs = require("fs");
  // const url = require('url');

  const mime = {
    html: "text/html",
    css: "text/css",
    jpg: "image/jpg",
    ico: "image/x-icon",
    mp3: "audio/mpeg3",
    mp4: "video/mp4",
  };
  const cache = {}; ///  almacenaremos los nombres de los recursos y los contenidos.

  /// http.createServer(function requestListene (requestListener, respuestaServidor) {...};

  /// pedido (primer argumento de la funcion requestListene):Función que se ejecuta cada vez que el servidor recibe una solicitud. El objeto [IncomingMessage] se pasa como primer argumento en la [función requestListener]. El objeto IncomingMessage representa la solicitud al servidor con  todos sus Métodos y propiedades (url, headers, setTimeout() entre otros	 )

  /// respuesta (segundo argumento de la funcion requestListene):Función que se ejecuta cada vez que el servidor recibe una solicitud. El objeto [ServerResponse] se pasa como segundo argumento en la [función requestListener]. El objeto ServerResponse representa la respuest del servidor con  todos sus Métodos y propiedades  (end(), write(), writeHead(), statusCode	  entre otros	)
  const servidor = http.createServer((pedido, respuesta) => {
    const url = new URL("http://localhost:7777" + pedido.url);
    let camino = "static" + url.pathname;
    // // console.log("camino : " + camino);

    if (camino == "static/") {
      camino = "static/index.html";
    }

    // // console.log(url);
    // // console.log("camino : " + camino);
    // // console.log("Valor de OBJ cache : ", JSON.stringify(cache));
    console.log("Valor de OBJ cache : ", cache);
    if (cache[camino]) {
      /* Este código divide la variable `camino` (que representa la ruta del archivo solicitado) en una
			matriz de cadenas usando el carácter `.` como separador. Luego toma el último elemento de esa
			matriz (que representa la extensión del archivo) y lo usa para buscar el tipo MIME
			correspondiente en el objeto `mime`. El tipo MIME resultante se almacena en la variable
			`mime_extencion`. */
      const vector = camino.split(".");
      const extencion = vector[vector.length - 1];
      const mime_extencion = mime[extencion];

      respuesta.writeHead(200, { "Content-Type": mime_extencion });
      respuesta.write(cache[camino]);
      respuesta.end();

      console.log("Recurso recuperado del cache S7777:" + camino);
    } else {
      fs.stat(camino, (error, stats) => {
        // console.log("stats.isDirectory() : " + stats.isDirectory());
        // console.log("Valor de OBJ stats : ", JSON.stringify(stats));
        if (!error) {
          fs.readFile(camino, (error, contenido) => {
            if (error) {
              respuesta.writeHead(500, { "Content-Type": "text/plain" });
              respuesta.write("Error interno");
              respuesta.end();
            } else {
              // console.log(contenido);
              /* Este código almacena en caché el contenido de un archivo (representado por la variable
							`contenido`) en un objeto llamado `cache`, utilizando la ruta del archivo (representada por
							la variable `camino`) como clave. Luego recupera la extensión del archivo de la ruta y la usa
							para buscar el tipo MIME correspondiente en un objeto llamado `mime`. Este tipo MIME se
							almacena en una variable llamada `mime_extencion`. */
              cache[camino] = contenido; // historial de navegacion
              vector = camino.split(".");
              extencion = vector[vector.length - 1];
              mime_extencion = mime[extencion];

              /* Este código envía una respuesta al cliente con un código de estado de 200 (que significa "OK")
						y un tipo de contenido basado en la extensión de archivo del recurso solicitado. Luego escribe
						el contenido del archivo en la respuesta y finaliza la respuesta. Esto envía efectivamente el
						archivo solicitado al cliente. */
              respuesta.writeHead(200, { "Content-Type": mime_extencion });
              respuesta.write(contenido);
              respuesta.end();
              console.log("Recurso leido del disco S7777:" + camino);
            }
          });
        } else {
          /* Este bloque de código maneja el caso en el que el recurso solicitado no se encuentra en el
				servidor. Establece el código de estado de la respuesta en 404 (No encontrado) usando
				`respuesta.writeHead(404, { Content-Type: text/html&})`, luego escribe un
				mensaje HTML simple en el cuerpo de la respuesta usando `respuesta. escribir(&#39;<!doctype
				html><html><head></head><body> Recurso inexistente</body></html>)`, y finalmente finaliza
				la respuesta usando `respuesta.end()`. Esto enviará el mensaje HTML al cliente indicando que no
				se encontró el recurso solicitado. */
          respuesta.writeHead(404, { "Content-Type": "text/html" });
          respuesta.write(
            "<!doctype html><html><head></head><body>Recurso inexistente</body></html>"
          );
          respuesta.end();
        }
      });
    }
  });
  servidor.listen(7777);
  console.warn("Servidor iniciado el el puerto 7777");
}

{
  //! PRACTICA DE LA GUIA
  const http = require("http");
  const fs = require("fs");
  const mime = {
    html: "text/html",
    css: "text/css",
    jpg: "image/jpg",
    ico: "image/x-icon",
    mp3: "audio/mpeg3",
    mp4: "video/mp4",
  };
  const cache = {};
  /* Esta línea de código está creando un servidor utilizando el módulo `http` incorporado de Node.js. El
método `createServer` toma una función de devolución de llamada como argumento, que se ejecuta cada
vez que se realiza una solicitud al servidor. El parámetro `pedido` representa el objeto de
solicitud entrante, y el parámetro `respuesta` representa el objeto de respuesta saliente. */
  const servidor = http.createServer((pedido, respuesta) => {
    const url = new URL("http://localhost:8888" + pedido.url);
    let camino = "static" + url.pathname;
    if (camino == "static/") camino = "static/index.html";
    if (cache[camino]) {
      const vec = camino.split(".");
      const extension = vec[vec.length - 1];
      const mimearchivo = mime[extension];
      respuesta.writeHead(200, { "Content-Type": mimearchivo });
      respuesta.write(cache[camino]);
      respuesta.end();
      console.log("Recurso recuperado del cache S8888:" + camino);
    } else {
      /* `fs.stat(camino, error => {...})` verifica si el archivo o directorio especificado por la ruta
		`camino` existe y obtiene sus metadatos (como el tamaño, el tiempo de modificación, etc.). Si hay
		un error (por ejemplo, el archivo o directorio no existe), el parámetro `error` será verdadero y
		el código dentro de la función de devolución de llamada manejará el error. Si no hay ningún error,
		el código dentro de la función de devolución de llamada continuará ejecutándose y leyendo el
		contenido del archivo usando `fs.readFile()`. */
      fs.stat(camino, (error) => {
        if (!error) {
          /* `fs.readFile(camino, (error, contenido)` lee el contenido del archivo especificado por la ruta
					`camino` y pasa el contenido a la función de devolución de llamada como el parámetro
					`contenido`. Si hay un error al leer el archivo , se pasará como el parámetro `error`. */
          fs.readFile(camino, (error, contenido) => {
            if (error) {
              respuesta.writeHead(500, { "Content-Type": "text/plain" });
              respuesta.write("Error interno");
              respuesta.end();
            } else {
              cache[camino] = contenido;
              vec = camino.split(".");
              extension = vec[vec.length - 1];
              mimearchivo = mime[extension];
              respuesta.writeHead(200, { "Content-Type": mimearchivo });
              respuesta.write(contenido);
              respuesta.end();
              console.log("Recurso leido del disco S8888:" + camino);
            }
          });
        } else {
          respuesta.writeHead(404, { "Content-Type": "text/html" });
          respuesta.write(
            "<!doctype html><html><head></head><body>Recurso inexistente</body></html>"
          );
          respuesta.end();
        }
      });
    }
  });
  servidor.listen(8888);
  console.log("Servidor web iniciado 8888");
}
