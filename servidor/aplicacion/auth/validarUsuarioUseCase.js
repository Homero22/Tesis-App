import usuarioRepository from "../../repositories/usuarios/usuarioRepository.js";

const validarUsuarioDeXml = async (xmlDatosCas) => {
  try {
    //validar que el xml no este vacio
    if (!xmlDatosCas) {
      return { error: "El xml no puede estar vacio" };
    }

    //extraer datos del xml
    const datos = extraerDatosDelXml(xmlDatosCas);

    //validar que los datos no esten vacios
    if (!datos) {
      return { error: "Los datos no pueden estar vacios" };
    }

    //comprobar que el usuario exista en la base de datos con su cédula
    const usuario = await usuarioRepository.getUsuarioPorCedula(datos.cedula);
    console.log(usuario);

    if(usuario){
        return usuario;
    }else{
        return false;
    }

  } catch (error) {
    return error;
  }
};

//Funcion que extrae los datos del xml
const extraerDatosDelXml = (xmlDatosCas) => {
  try {
    //extraer los datos del xml
    const cedula = xmlDatosCas
      .split("<cas:cedula>")[1]
      .split("</cas:cedula>")[0];
    const nombres = xmlDatosCas
      .split("<cas:given_name>")[1]
      .split("</cas:given_name>")[0];
    const apellidos = xmlDatosCas
      .split("<cas:family_name>")[1]
      .split("</cas:family_name>")[0];
    const correo = xmlDatosCas.split("<cas:upn>")[1].split("</cas:upn>")[0];
    return {
      cedula,
      nombres,
      apellidos,
      correo,
    };
  } catch (error) {
    return error;
  }
};

export default {
  validarUsuarioDeXml,
};
