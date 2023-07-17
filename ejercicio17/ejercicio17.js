/*

 * ***********************************************************************************************
 * !  EXPLICACIÓN DE CODIGO DEL EJERCICIO EN FORMA GENERAL:
 * ***********************************************************************************************
 *
 * El código crea un servidor usando Node.js y maneja las solicitudes enrutándolas a diferentes
 * funciones o sirviendo archivos estáticos según la ruta solicitada. También establece una conexión a
 * una base de datos MySQL e incluye funciones para crear una tabla e insertar datos.
 * @param pedidoCliente - Este parámetro representa la solicitud realizada por el cliente al servidor,
 * incluida información como la URL, los encabezados y cualquier dato enviado en el cuerpo de la
 * solicitud.
 * @param respuestaServidor - `respuestaServidor` es el objeto de respuesta que se utilizará para
 * devolver la respuesta al cliente. Se pasa como parámetro a la función `encaminar` y varias otras
 * funciones en el código. Tiene métodos como `writeHead`, `write` y `end`.



 * ***********************************************************************************************
 * !  EXPLICACIÓNES DE CODIGO DEL EJERCICIO EN FORMA DETALLADA:
 * ***********************************************************************************************
 */

/* Estas líneas de código importan los módulos necesarios para que el script funcione: `http` para crear un servidor, `fs` para leer y escribir archivos y `mysql` para conectarse a una base de datos MySQL. También declara dos variables `camino` y `url` y las inicializa en cadenas vacías. */
const http = require("http");
const fs = require("fs");
const mysql = require("mysql");

let camino = "";
let url = "";

/* Crear una conexión a una base de datos MySQL con el host por medio del modulo mysql de node con los siguientes datos: el usuario, la contraseña y el nombre de la base de datos especificados y se almacena en la variable conexion. */
const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "base1",
});
//console.log("39_conexion:", conexion);

/* `conexion.connect((error) => {...})` está estableciendo una conexión a una base de datos MySQL usando el módulo `mysql` en Node.js. El método `connect()` toma como parámetro una función de devolución de llamada, que se ejecuta cuando se establece la conexión o si hay un error. En este caso, la función de devolución de llamada registra un mensaje de error en la consola si hay un problema al conectarse a la base de datos. */
conexion.connect((error) => {
  if (error) console.log("Problemas de conexion con mysql error:", error);
});

/* `const mime` es un objeto que asigna extensiones de archivo a sus tipos MIME correspondientes. Esto se usa más adelante en el código para establecer el encabezado `Content-Type` apropiado cuando se entregan archivos al cliente. Por ejemplo, si el archivo solicitado tiene una extensión `.html`, el encabezado `Content-Type` se establecerá en `text/html`. */
const mime = {
  html: "text/html",
  css: "text/css",
  jpg: "image/jpg",
  ico: "image/x-icon",
  mp3: "audio/mpeg3",
  mp4: "video/mp4",
};

/* Este código crea un servidor utilizando el módulo `http` y configura una función de devolución de llamada para manejar las solicitudes entrantes. La función toma dos parámetros: `pedidoCliente` (petición del cliente) y `respuestaServidor` (respuesta del servidor). */
const servidor = http.createServer((pedidoCliente, respuestaServidor) => {
  /* Estas líneas de código crean un nuevo objeto URL concatenando la URL base "http://localhost:8088" con la ruta de la solicitud del cliente `pedidoCliente.url`. El objeto URL resultante se usa para  extraer el nombre de la ruta y almacenarlo en la propiedad `url.pathname`. Luego, la variable  `camino` se establece en la cadena "public" concatenada con el nombre de la ruta extraída, que representa la ruta al recurso solicitado en el servidor. */
  url = new URL("http://localhost:8888" + pedidoCliente.url); //? protocolo(http)|://|Hostname(localhost)|:|puerto(8088)|recurso solicitado(pedidoCliente.url)
  //! camino = "public" + url.pathname;
  camino = "public" + pedidoCliente.url;
  console.log("62_ mysql ==> ", mysql);
  console.log("63_ url ==> ", url);
  console.log("64_ pedidoCliente.url ==> ", pedidoCliente.url);
  console.log("65_ url.pathname ==> ", url.pathname);
  console.log("66__ camino ==> ", camino);
  ("<br />");

  /* Este bloque de código está comprobando si la variable `camino` es igual a "public/". Si es así, establece la variable `camino` en "public/index.html". Después llama a la función `encaminar` con las variables `pedidoCliente`, `respuestaServidor` y actualizada `camino` como parámetros. Básicamente, esto está redirigiendo al usuario al archivo index.html si está accediendo al directorio raíz del servidor. */
  if (camino == "public/") {
    camino = "public/index.html";
  }
  encaminar(pedidoCliente, respuestaServidor, camino);
  console.log("66_camino ==> ", camino);
});

servidor.listen(8888);
console.log("70__ ==> servidor ejecutandose en puerto 8888");

/**
 * La función "encaminar" utiliza una declaración de cambio para enrutar las solicitudes entrantes a * diferentes funciones o servir archivos estáticos en función de la ruta solicitada. * @param pedidoCliente - Este parámetro representa la solicitud realizada por el cliente al servidor, * incluida información como la URL, los encabezados y cualquier dato enviado en el cuerpo de la * solicitud.
 * @param respuestaServidor - El objeto de respuesta del servidor que se usará para enviar la respuesta * al cliente.
 */
function encaminar(pedidoCliente, respuestaServidor) {
  switch (camino) {
    case "public/creartabla": {
      crear(respuestaServidor);
      break;
    }
    case "public/alta": {
      alta(pedidoCliente, respuestaServidor, camino);
      break;
    }
    case "public/consultaporcodigo": {
      consulta(pedidoCliente, respuestaServidor, camino);
      break;
    }
    default: {
      /* `fs.stat(camino, (error) =>` está comprobando si el archivo o directorio especificado por la variable `camino` existe o no. Si existe, ejecutará la función de devolución de llamada sin error. Si no existe existe, ejecutará la función de devolución de llamada con un objeto de error. */
      fs.stat(camino, (error) => {
        if (!error) {
          /* `fs.readFile(camino, (error, contenido) =>` está leyendo el contenido del archivo  especificado por la variable `camino`. Toma una función de devolución de llamada con dosparámetros: `error` y `contenido`. Si hay un error al leer el archivo, el parámetro `error`contendrá un objeto con información sobre el error. Si el archivo se lee con éxito, el
         parámetro `contenido` contendrá el contenido del archivo como un búfer. El contenido del  archivo es luego se utiliza para construir la respuesta que se enviará de vuelta al    cliente. */
          fs.readFile(camino, (error, contenido) => {
            if (error) {
              respuestaServidor.writeHead(500, {
                "Content-Type": "text/plain",
              });
              respuestaServidor.write("Error interno");
              respuestaServidor.end();
            } else {
              const vector = camino.split(".");
              const extension = vector[vector.length - 1];
              const mimearchivo = mime[extension];
              respuestaServidor.writeHead(200, { "Content-Type": mimearchivo });
              respuestaServidor.write(contenido);
              respuestaServidor.end();
            }
          });
        } else {
          respuestaServidor.writeHead(404, { "Content-Type": "text/html" });
          respuestaServidor.write(
            "<!doctype html><html><head></head><body>Recurso inexistente</body></html>"
          );
          respuestaServidor.end();
        }
      });
    }
  }
}

/* La línea `console.log("134_ conexion.query ==> ", conexion.query);` registra el valor de la propiedad `conexion.query` en la consola. Sirve para comprobar el valor de la propiedad `conexion.query` y ver qué contiene. */
console.log("133_ conexion.query ==> ", conexion.query);

/* La función `crear` está eliminando una tabla existente llamada `articulos` si existe y luego creando una nueva tabla llamada `articulos` con tres columnas: `codigo` (entero, clave principal, incremento automático), `descripcion` (varchar (50)), y `precio` (flotante). También envía una respuesta al cliente indicando que la tabla se creó con éxito. */
function crear(respuestaServidor) {
  /* Esta línea de código está ejecutando una consulta SQL para eliminar la tabla denominada "articulos" si existe en la base de datos MySQL conectada. La cláusula `si existe` asegura que la consulta no arroje un error si la tabla no existe. El resultado de la consulta se pasa a una función de devolución de llamada que registra cualquier error o el resultado en la consola.
   */
  conexion.query("drop table if exists articulos", (error, resultado) => {
    if (error) {
      console.log("141_error conexion.query:", error);
    } else {
      console.log("143_ resultado conexion.query :", resultado);
    }
  });

  /* Este código está creando una nueva tabla llamada "articulos" en una base de datos MySQL. La tabla tiene tres columnas: "codigo" (entero, clave principal, incremento automático), "descripcion" (varchar(50)) y "precio" (flotante). El método `conexion.query()` se utiliza para ejecutar la consulta SQL para crear la tabla. Si hay un error, se registrará en la consola.
  
  `conexion.query` es un método que se utiliza para ejecutar consultas SQL en una base de datos MySQL. Toma una consulta SQL como parámetro y la ejecuta en la base de datos conectada. El código dado se usa para crear y colocar una tablas en la base de datos MySQL base1. */
  conexion.query(
    `create table articulos 
      (
        codigo int primary key auto_increment,
        descripcion varchar(50),
        precio float
      )`,

    (error) => {
      if (error) {
        console.log(error);
        return;
      }
    }
  );
  /* Respuesta colocada en la cabezera El código establece el encabezado de respuesta de un servidor para indicar que el tipo de  contenido de la respuesta será HTML. El código de estado 200 indica una respuesta exitosa. */
  respuestaServidor.writeHead(200, { "Content-Type": "text/html" });

  //

  /* Respuesta está generando  en el cuerpo. Un HTML para enviarlo al cliente, creando una página HTML simple con un mensaje "Se creo la tabla" (Tabla creada) y un enlace a "index.html" para volver a la página anterior. */
  respuestaServidor.write(`<!doctype html><html><head></head><body>
   Se creo la tabla<br><a href="index.html">Retornar</a></body></html>`);
  
 /* El código está finalizando la respuesta del servidor. */
  respuestaServidor.end();
}


/* La función `alta` está manejando una solicitud POST realizada por el cliente. Toma tres parámetros: `pedidoCliente` (solicitud del cliente), `respuestaServidor` (respuesta del servidor) y `camino` (ruta). Escucha los datos enviados por el cliente mediante el método `pedidoCliente.on("data", ...)` y los concatena a la variable `info`. El propósito de esta función es recibir datos del cliente y
procesarlos para insertar un nuevo registro en la base de datos MySQL. Sin embargo, la implementación de esta funcionalidad no se proporciona en el código dado. */
function alta(pedidoCliente, respuestaServidor, camino) {
  console.log("182_camino ==> ", camino);
  console.log("183_url ==>  ", url);
  let info = "";

  /* `pedidoCliente.on("data", ...)` está escuchando los datos enviados por el cliente en una solicitud POST. Los datos se reciben en fragmentos y cada fragmento se concatena a la variable `info`. Este código forma parte de la función `alta`, que se encarga de procesar los datos recibidos del cliente e insertar un nuevo registro en una base de datos MySQL.*/
  pedidoCliente.on("data", (datosParciales) => {
    console.log("188_info ==> ", info);
    console.log("189_datos Parciales en crudo(Buffers) ==> ", datosParciales);
    console.log(
      "191_datos Parciales  convertidos con toString() ==> ",
      datosParciales.toString()
    );
    console.log("94_data ==> ", pedidoCliente.on);
    info += datosParciales;
    console.log("196_info ==> ", info);
  });
}
