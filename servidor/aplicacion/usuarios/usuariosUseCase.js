//Casos de uso referente a un usuario
import usuarioRepository from "../../repositories/seguridad/usuarioRepository.js";
import { serviciosExternos } from "../../configuracion/variablesGlobales.js";
import { configVariables } from "../../configuracion/variablesGlobales.js";
import fetch from "node-fetch"; //para consumir una API
import https from "https";
import crypto from "crypto";
import {
  paginacion,
  obtenerDataQueryPaginacion,
  validarPaginacion,
} from "../utils/paginacion.utils.js";

// Configurar el agente HTTPS
const httpsAgentOptions = {
  secureOptions: crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION,
};

// Verificar si estamos en entorno de desarrollo
if (configVariables.env === "development") {
  httpsAgentOptions.rejectUnauthorized = false;
}

const httpsAgent = new https.Agent(httpsAgentOptions);

//Obtener datos de mi Cuenta de usuario

const obtenerDatosMiCuentaService = async (cedula) => {
  //comprobar que la cédula no este vacia
  if (!cedula) {
    return { error: "La cédula no puede estar vacia" };
  }
  //obtener los datos del usuario por cédula
  const datosUsuario = await usuarioRepository.getUsuarioPorCedula(cedula);

  if (datosUsuario) {
    return datosUsuario;
  }
  return false;
};

const obtenerUsuariosService = async (query) => {
  //validar la paginacion
  const validacion = validarPaginacion(query);
  if (validacion != true) {
    return validacion;
  }
  //obtener los datos de la query
  const { page, limit } = obtenerDataQueryPaginacion(query);

  //obtener todos los usuarios
  const usuarios = await usuarioRepository.obtenerUsuariosConPaginacion(
    page,
    limit
  );
  //obtener el total de registros de usuarios
  const totalUsuarios = await usuarioRepository.obtenerTotalUsuarios();

  if (usuarios.length > 0) {
    const metadata = paginacion(page, limit, totalUsuarios);
    return {
      status: true,
      message: "Usuarios encontrados",
      body: usuarios,
      metadata: {
        pagination: metadata,
      },
    };
  }
  return false;
};

const crearUsuarioService = async (cedula) => {
  let respuesta = {};
  //llamo a la funcion para obtener los datos de un servidor externo
  const datosUsuario = await obtenerDatosServidorExterno(cedula);

  if (datosUsuario == false) {
    return false;
  }
  if (datosUsuario.err) {
    respuesta = {
      error: datosUsuario.err,
    };
    return respuesta;
  }

  //creo el objeto usuario
  const usuario = {
    str_usuario_nombres: datosUsuario.listado[0].per_nombres,
    str_usuario_apellidos:
      datosUsuario.listado[0].per_primerApellido +
      " " +
      datosUsuario.listado[0].per_segundoApellido,
    str_usuario_email: datosUsuario.listado[0].per_email,
    str_usuario_cedula: cedula,
    str_usuario_telefono: datosUsuario.listado[0].per_telefonoCelular,
  };
  //compruebo si el usuario ya existe
  const usuarioExiste = await usuarioRepository.getUsuarioPorCedula(
    usuario.str_usuario_cedula
  );
  //compruebo que el correo no este registrado
  const correoExiste = await usuarioRepository.getUsuarioPorCorreo(
    usuario.str_usuario_email
  );
  if (correoExiste) {
    return 1;
  }


  if (usuarioExiste) {
    return 1;
  }
  const usuarioCreado = await usuarioRepository.createUser(usuario);
  return usuarioCreado;
};

//funcion para obtener los datos de un servidor externo
const obtenerDatosServidorExterno = async (cedula) => {
  try {
    const url = serviciosExternos.urlServicioCentralizado + cedula;
    const response = await fetch(url, { agent: httpsAgent });

    const data = await response.json();
    if (data.success == false) {
      return false;
    }
    return data;
  } catch (error) {
    const errorMessage = {
      err: error.message,
    };
    return errorMessage;
  }
};

const actualizarUsuarioService = async (id, telefono) => {
  //llamo a repositorio para actualizar el usuario dado el email y el id
  const usuarioActualizado = await usuarioRepository.actualizarTelefonoUsuario(
    id,
    telefono
  );
  if (usuarioActualizado) {
    return usuarioActualizado;
  }
  return false;
};
const obtenerUsuarioService = async (id) => {
  //llamo a repositorio para obtener el usuario dado el id
  const usuario = await usuarioRepository.obtenerUsuarioPorId(id);
  if (usuario) {
    return usuario;
  }
  return false;
};
const desactivarUsuarioService = async (id) => {
  //llamo a repositorio para obtener el usuario dado el id
  const usuario = await usuarioRepository.obtenerUsuarioPorId(id);
  //obtengo el estado del usuario
  let estado = usuario.str_usuario_estado;
  if (estado == "ACTIVO") {
    estado = "INACTIVO";
  } else {
    estado = "ACTIVO";
  }
  //llamo a repositorio para desactivar el usuario dado el id
  const usuarioDesactivado = await usuarioRepository.desactivarUsuario(
    id,
    estado
  );
  if (usuarioDesactivado) {
    return usuarioDesactivado;
  }
  return false;
};

export default {
  obtenerDatosMiCuentaService,
  obtenerUsuariosService,
  crearUsuarioService,
  actualizarUsuarioService,
  obtenerUsuarioService,
  desactivarUsuarioService,
};
