export const paginacion = (page, limit, totalRegistros) => {
  let next_page = null;
  if (page * limit < totalRegistros) {
    next_page = page + 1;
  }
  return {
    previousPage: page - 1,
    currentPage: page,
    nextPage: next_page,
    total: totalRegistros,
    limit: limit,
  };
};

export const validarPaginacion = (query) => {
  if (isNaN(query.page) || query.page % 1 != 0) {
    return {
      error: "El número de página debe ser entero",
    };
  }
  if (isNaN(query.limit) || query.limit % 1 != 0) {
    return {
      error: "El límite de registros debe ser  entero",
    };
  }
  //valido que el limite sea mayor a 0 y que la pagina sea mayor a 0
  if (query.limit <= 0 || query.page <= 0) {
    return {
      error: "El límite y la página deben ser mayores a 0",
    };
  }
  return true;
};

export const obtenerDataQueryPaginacion = (query) => {
  const page = parseInt(query.page);
  const limit = parseInt(query.limit);
  return {
    page,
    limit,
  };
};
