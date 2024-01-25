import usuarioRepository from "../../repositories/seguridad/usuarioRepository.js";
import usuarioRolRepository from "../../repositories/seguridad/usuarioRolRepository.js";
import { jwtVariables } from "../../configuracion/variablesGlobales.js";
import jwt from "jsonwebtoken";

const validarUsuarioDeXml = async (xmlDatosCas) => {
  try {
    //validar que el xml no este vacio
    if (!xmlDatosCas) {
      return { error: "El xml no puede estar vacio" };
    }

    //extraer datos del xml
    const datos = extraerDatosDelXml(xmlDatosCas);


    if(!datos){
      return false;
    }

    //comprobar que el usuario exista en la base de datos con su cédula
    const usuario = await usuarioRepository.getUsuarioPorCedula(datos.cedula);


    //si el usuario existe retornar el usuario con un token 
    if(usuario){
        //crear el token
        const token = jwt.sign(usuario,jwtVariables.jwtSecret,{
          expiresIn: 60 * 60 * 24 * 30,
        })
        const usuarioConToken = {
          usuario,
          token
        }
        return  usuarioConToken;
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

    const esInvalidTicket = xmlDatosCas.includes("INVALID_TICKET");

    if (esInvalidTicket) {
      return false;
    }
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
    return false
  }
};

export default {
  validarUsuarioDeXml,
};
