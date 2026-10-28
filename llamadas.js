
const readline = require("readline");
const { calcularIMC } = require("./calcular");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function preguntar(texto) {
    return new Promise(resolve => rl.question(texto, resolve));
}

async function emitir() {
    try {
        const producto = (await preguntar("Producto: ")).trim();
        const cantidad = Number(await preguntar("Cantidad: "));
        const precio = Number(await preguntar("Precio con IGV (S/): "));

        if (!producto) throw new Error("Ingrese el producto.");

        const { subtotal, igv, total } = calcularIMC(cantidad, precio);

        const opcion = (await preguntar("1. Boleta  2. Factura: ")).trim();
        if (!["1", "2"].includes(opcion)) {
            throw new Error("Seleccione 1 o 2.");
        }

        let cliente = "Consumidor final";
        let documento = "No registrado";

        if (opcion === "2") {
            cliente = (await preguntar("Razon social: ")).trim();
            documento = (await preguntar("RUC del cliente: ")).trim();

            if (!cliente || !/^\d{11}$/.test(documento)) {
                throw new Error("Razon social o RUC incorrecto.");
            }
        }

        console.log("\n===== " + (opcion === "1" ? "BOLETA DE VENTA" : "FACTURA") + " =====");
        console.log("Tienda: MI TIENDA");
        console.log("RUC vendedor: 20123456789");
        console.log("Fecha: " + new Date().toLocaleDateString("es-PE"));
        console.log("Cliente: " + cliente);
        console.log("Documento: " + documento);
        console.log("Producto: " + producto);
        console.log("Cantidad: " + cantidad);
        console.log("Subtotal: S/ " + subtotal.toFixed(2));
        console.log("IGV incluido: S/ " + igv.toFixed(2));
        console.log("TOTAL: S/ " + total.toFixed(2));
        console.log("================================");
        console.log("Comprobante de practica; no valido ante SUNAT.");

    } catch (error) {
        console.log("Error: " + error.message);
    } finally {
        rl.close();
    }
}

emitir();
