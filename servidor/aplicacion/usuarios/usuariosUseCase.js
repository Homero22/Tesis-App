//Casos de uso referente a un usuario
import usuarioRepository from "../../repositories/usuarios/usuarioRepository.js";
import { serviciosExternos } from "../../configuracion/variablesGlobales.js";
import fetch from "node-fetch"; //para consumir una API
import https from "https";
const agent = new https.Agent({ rejectUnauthorized: false }); //Validar credenciales

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
const obtenerUsuariosService = async () => {
  //obtener todos los usuarios
  const usuarios = await usuarioRepository.getAllUsers();
  if (usuarios.length > 0) {
    return usuarios;
  }
  return false;
};
const crearUsuarioService = async (cedula) => {
  //llamo a la funcion para obtener los datos de un servidor externo
  const datosUsuario = await obtenerDatosServidorExterno(cedula);
  if (datosUsuario == false) {
    return false;
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

  if (usuarioExiste) {
    return 1;
  }
  const usuarioCreado = await usuarioRepository.createUser(usuario);
  return usuarioCreado;
};

//funcion para obtener los datos de un servidor externo
const obtenerDatosServidorExterno = async (cedula) => {
  const url = serviciosExternos.urlServicioCentralizado + cedula;
  const response = await fetch(url, { agent });
  const data = await response.json();
  if (data.success == false) {
    return false;
  }
  return data;
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
  const usuarioDesactivado = await usuarioRepository.desactivarUsuario(id, estado);
  if (usuarioDesactivado) {
    return usuarioDesactivado;
  }
  return false;
}

export default {
  obtenerDatosMiCuentaService,
  obtenerUsuariosService,
  crearUsuarioService,
  actualizarUsuarioService,
  obtenerUsuarioService,
  desactivarUsuarioService,
};
