
function calcularIMC(cantidad, precio) {
    if (!Number.isFinite(cantidad) || !Number.isFinite(precio) ||
        cantidad <= 0 || precio <= 0) {
        throw new Error("Cantidad y precio deben ser positivos.");
    }

    const total = Math.round(cantidad * precio * 100) / 100;
    const subtotal = Math.round(total / 1.18 * 100) / 100;
    const igv = Math.round((total - subtotal) * 100) / 100;

    return { subtotal, igv, total };
}

module.exports = { calcularIMC };
