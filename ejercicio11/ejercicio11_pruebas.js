/// Problema
/// Desarrollar un sitio en Node.js que permita servir archivos estáticos y haga más eficiente su trabajo implementando un sistema de cache de los archivos del servidor.





/*
 1 requerir modulas.
 2 crear servidor.
 3 crear objeto URL.
 4.generar la ruta url (camino)

*/



{
	//! VERSION if (!error) {.....}  
	const http = require('http');
	const fs = require('fs');
	const url = require('url');


	const mime = {
		'html': 'text/html',
		'css': 'text/css',
		'jpg': 'image/jpg',
		'ico': 'image/x-icon',
		'mp3': 'audio/mpeg3',
		'mp4': 'video/mp4'
	};
	const cache = {}; ///  almacenaremos los nombres de los recursos y los contenidos.



   

   /// http.createServer(function requestListene (requestListener, respuestaServidor) {...};

   /// pedido (primer argumento de la funcion requestListene):Función que se ejecuta cada vez que el servidor recibe una solicitud. El objeto [IncomingMessage] se pasa como primer argumento en la [función requestListener]. El objeto IncomingMessage representa la solicitud al servidor con  todos sus Métodos y propiedades (url, headers, setTimeout() entre otros	 )

   /// respuesta (segundo argumento de la funcion requestListene):Función que se ejecuta cada vez que el servidor recibe una solicitud. El objeto [ServerResponse] se pasa como segundo argumento en la [función requestListener]. El objeto ServerResponse representa la respuest del servidor con  todos sus Métodos y propiedades  (end(), write(), writeHead(), statusCode	  entre otros	)
	const servidor = http.createServer((pedido, respuesta) => {
		const url = new URL('http://localhost:7777' + pedido.url);
		let camino = 'static' + url.pathname;
		// // console.log("camino : " + camino);

		if (camino == 'static/') {
			camino = 'static/index.html';
		}

		// // console.log(url);
		// // console.log("camino : " + camino);
		// // console.log("Valor de OBJ camino : ", JSON.stringify(camino));

		if (cache[camino]) {
			const vector = camino.split('.');
			const extencion = vector[vector.length - 1];
			const mime_extencion = mime[extencion];

			respuesta.writeHead(200, { 'Content-Type': 'mime_extencion' });
			respuesta.write(cache[camino]);
			respuesta.end();
			console.log('Recurso recuperado del cache:' + camino);
		} else {
			fs.stat(camino, (error, stats) => {
				// // console.log("stats.isDirectory() : " + stats.isDirectory());
				// // console.log("Valor de OBJ stats : ", JSON.stringify(stats));
				// console.log(error);
				// console.log(!error);
				if (!error) {
					fs.readFile(camino, (error, contenido) => {
						if (error) {
							respuesta.writeHead(500, { 'Content-Type': 'text/plain' });
							respuesta.write('Error interno');
							respuesta.end();
						} else {
							// // console.log(contenido);
							cache[camino] = contenido; // historial de navegacion
							const vector = camino.split(".");
							const extencion = vector[vector.length - 1];
							const mime_rchivo = mime[extencion];

							respuesta.writeHead(200, { 'Content-Type': mime_rchivo });
							respuesta.write(contenido);
							respuesta.end();

							console.log('Recurso leido del disco:' + camino);
						}

					});
				} else {
					
					respuesta.writeHead(404, { 'Content-Type': 'text/html' });
					respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');
					respuesta.end();
				}
			});
		}
	});
	servidor.listen(7777);
	console.warn('Servidor iniciado el el puerto 7777');


}

//************************************************************** */
//************************************************************** */
//************************************************************** */
//************************************************************** */
//************************************************************** */
//************************************************************** */

// // 
// // 
// // {
// // 	//! VERSION if (error) {.....} No funciona BIEN
// // 
// // 	const http = require('http');
// // 	const fs = require('fs');
// // 	const url = require('url');
// // 
// // 
// // 	const mime = {
// // 		'html': 'text/html',
// // 		'css': 'text/css',
// // 		'jpg': 'image/jpg',
// // 		'ico': 'image/x-icon',
// // 		'mp3': 'audio/mpeg3',
// // 		'mp4': 'video/mp4'
// // 	};
// // 	const cache = {}; ///  almacenaremos los nombres de los recursos y los contenidos.
// // 
// // 	const servidor = http.createServer((pedido, respuesta) => {
// // 		const url = new URL('http://localhost:8888' + pedido.url);
// // 		let camino = 'static' + url.pathname;
// // 		// // console.log("camino : " + camino);
// // 
// // 		if (camino == 'static/') {
// // 			camino = 'static/index.html';
// // 		}
// // 
// // 		// // console.log(url);
// // 		// // console.log("camino : " + camino);
// // 		// // console.log("Valor de OBJ camino : ", JSON.stringify(camino));
// // 
// // 		if (cache[camino]) {
// // 			const vector = camino.split('.');
// // 			const extencion = vector[vector.length - 1];
// // 			const mime_extencion = mime[extencion];
// // 
// // 			respuesta.writeHead(200, { 'Content-Type': 'mime_extencion' });
// // 			respuesta.write(cache[camino]);
// // 			respuesta.end();
// // 			console.log('Recurso recuperado del cache:' + camino);
// // 		} else {
// // 			fs.stat(camino, (error, stats) => {
// // 				// // console.log("stats.isDirectory() : " + stats.isDirectory());
// // 				// // console.log("Valor de OBJ stats : ", JSON.stringify(stats));
// // 				console.log(error);
// // 				console.log(!error);
// // 				if (error) {
// // 					fs.readFile(camino, (error, contenido) => {
// // 						if (error) {
// // 							respuesta.writeHead(500, { 'Content-Type': 'text/plain' });
// // 							respuesta.write('Error interno');
// // 							respuesta.end();
// // 						} else {
// // 							// // console.log(contenido);
// // 							cache[camino] = contenido; // historial de navegacion
// // 							const vector = camino.split(".");
// // 							const extencion = vector[vector.length - 1];
// // 							const mime_rchivo = mime[extencion];
// // 
// // 							respuesta.writeHead(200, { 'Content-Type': mime_rchivo });
// // 							respuesta.write(contenido);
// // 							respuesta.end();
// // 
// // 							console.log('Recurso leido del disco:' + camino);
// // 						}
// // 					});
// // 					
// // 				} else {
// // 					respuesta.writeHead(404, { 'Content-Type': 'text/html' });
// // 					respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');
// // 					respuesta.end();
// // 				}
// // 			});
// // 		}
// // 	});
// // 	servidor.listen(8888);
// // 	console.warn('Servidor iniciado el el puerto 8888');
// // 
// // 
// // 
// // 
// // }
