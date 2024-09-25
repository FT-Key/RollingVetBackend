// Middleware genérico para filtros dinámicos
const dynamicFilterMiddleware = (Model) => {
  return async (req, res, next) => {
    const queryFilters = req.query; // Obtener todos los query params
    const schemaFields = Object.keys(Model.schema.paths); // Obtener los campos del esquema del modelo

    const filters = {};

    // Solo agregar los filtros que existan en el esquema del modelo
    for (const key in queryFilters) {
      if (schemaFields.includes(key)) {
        filters[key] = queryFilters[key]; // Añadir el filtro válido
      }
    }

    req.filters = filters; // Añadir los filtros procesados a la solicitud
    next();
  };
};

export default dynamicFilterMiddleware;