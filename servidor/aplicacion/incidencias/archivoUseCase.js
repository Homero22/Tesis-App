import archivoRepository from "../../repositories/incidencias/archivoRepository.js";

const crearArchivoUseCase = async (name) => {
  let datos = {
    str_archivo_nombre: name,
  };

  //compruebo si existe el archivo
  const data = await archivoRepository.obtenerArchivoByNameRepository(name);
  if (data) {
    return {
      status: false,
      message: "El archivo ya existe, ya se han importado los datos",
      body: [],
    };
  }

  const dataCreate = await archivoRepository.crearArchivoRepository(datos);

  return {
    status: true,
    message: "Archivo creado correctamente",
    body: dataCreate,
  };
};

export default {
  crearArchivoUseCase,
};
