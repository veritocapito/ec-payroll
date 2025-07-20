// Por ahora, el servicio devolverá una promesa que se resuelve con un array vacío.
// Más adelante, esto se conectará a una base de datos real.
export const getCompanies = () => {
  return new Promise((resolve) => {
    // Simulamos que no hay datos al inicio
    resolve([]);
  });
};