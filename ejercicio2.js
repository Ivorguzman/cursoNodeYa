/// 2 - Módulos en Node.js

// Módulo de un único archivo Vamos a crear un programa muy sencillo que nos permita sumar, restar y dividir números y mostrarlos por la consola.Lasfuncionalidades las dispondremos en un módulo de archivo y veremos como la consumimos en nuestro programa principal


const operaciones_basicas = require('./modulo_matematicas.js');
const valor_pi = require('./modulo_matematicas');

console.log(operaciones_basicas);
console.log(valor_pi);


console.log(`La suma de  2 + 2 es : ${operaciones_basicas.func_sumar(2, 2)}`);
console.log(`La resta de 4-1 es : ${operaciones_basicas.func_restar(4, 1)}`);
console.log(`La multiplicación  de 4 X 3 es : ${operaciones_basicas.func_multiplicar(4, 3)}`);
console.log(`La division de  6 / 3 es: ${operaciones_basicas.func_dividir(6, 3)}`);
console.log(`El valor de PI es: ${valor_pi.cont_PI}`);
console.log(`La division de  5 / 0 es: ${operaciones_basicas.func_dividir(5, 0)}`);
console.log(`La  funcion mostrarErrorDivisiones(): ${operaciones_basicas.mostrarErrorDivision()}`);