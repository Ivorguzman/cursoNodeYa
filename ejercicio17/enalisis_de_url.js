
//!Q Ejemplo de la constitucion de una url

// node program to demonstrate the
// url.pathname API as Setter

//importing the module 'url'
const http = require("url");

// creating and initializing myURL
// const myURL = new URL("https://example.com:80/a/foo#ram");
// const myURL = new URL("https://example.com:80/a/foo#ram");
const myURL = new URL(
  "https://www.freecodecamp.org/espanol/learn/?messages=success%5B0%5D%3Dflash.signin-success"
);
// const myURL = new URL("https://ivor:123@localhost:3000/wamp64/www/practicas_php_pildoras/50__Consultas_preparadas__Insertar_registros_en_MySql/50__Consultas_preparadasInsertar_seleccionar_opcion.php?campo_usuario=ivor&campo_clave=234#hola");
// Display the href
// // Display the href
// value of myURL before change
console.log("myURL ==> ", myURL);
console.log("Before Change");
console.log(myURL.href);

// assigning pathname portion
// using pathname API
console.log();
myURL.pathname = "/abcdef";
console.log("myURL :", myURL);

// Display href
// value of myURL after change
console.log("After Change");
console.log(myURL.href);

 