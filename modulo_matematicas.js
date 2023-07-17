
//! creando el objeto  [modulo_matematicas = {}] ==>  Otar forma de exportar ( Exportando un objeto )
const modulo_matematicas = {};


const PI = 3.14;

function sumar(x1, x2) {
    return x1 + x2;
}

function restar(x1, x2) {
    return x1 - x2;
}

function multiplicar(x1, x2) {
    return x1 * x2;
}

function dividir(x1, x2) {
    if (x2 == 0) {
        mostrarErrorDivision();
    } else {
        return x1 / x2;
    }
}

function mostrarErrorDivision() {
    console.log("No se Puede dividir entre cero(0)");
    return;
}




//!  Exportando las propiedades de un objeto no al objeto en si

// exports.func_sumar = sumar;
// exports.func_restar = restar;
// exports.func_dividir = dividir;
// exports.func_multiplicar = multiplicar;
// exports.cont_PI = PI;



//! Agregando propiedades al objeto para exportar dicho objeto
modulo_matematicas.func_sumar = sumar;
modulo_matematicas.func_restar = restar;
modulo_matematicas.func_dividir = dividir;
modulo_matematicas.func_multiplicar = multiplicar;
modulo_matematicas.cont_PI = PI;



//! Eexportando el objeto modulo_matematicas
module.exports = modulo_matematicas;