/// 3 - Consumir módulo del núcleo de Node.js


// Problema: Emplear el módulo "os" que provee información básica del sistema donde se ejecuta la plataforma del Node.js.

/* El código importa el módulo "os" del núcleo de Node.js y lo usa para recuperar información sobre el
sistema donde se ejecuta la plataforma Node.js. Imprime la plataforma, la versión de lanzamiento, la
memoria total y libre, la arquitectura de la CPU y la cantidad de procesadores lógicos. También
itera a través de la lista de CPU e imprime su modelo y número de núcleos. */
const os = require('os');
console.log('Sistema operativo:' + os.platform());
console.log('Versión del sistema operativo:' + os.release());
console.log('Memoria total:' + os.totalmem() + ' bytes');
console.log('Memoria libre:' + os.freemem() + ' bytes');
console.log('Arquitectura CPU:' + os.arch);
console.log('Número de procesadores lógicos:' + os.cpus().length);
os.cpus().forEach(cpu => {
    console.log('Nombre: ' + cpu.model);
    console.log('Núcleos: ' + cpu.cores);
});
