//Casos de uso referente a un usuario
import usuarioRepository from "../../repositories/seguridad/usuarioRepository.js";
import { serviciosExternos } from "../../configuracion/variablesGlobales.js";
import { configVariables } from "../../configuracion/variablesGlobales.js";
import usuarioRolRepository from "../../repositories/seguridad/usuarioRolRepository.js";
import {sequelize} from "../../database/postgres.js";
import permisosService from "../../aplicacion/seguridad/permisosUseCase.js";
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

  httpsAgentOptions.rejectUnauthorized = false;


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
  }else{
    return {
      status: false,
      message: "No se encontraron usuarios",
      body: [],
    }
  }  
};

const crearUsuarioService = async (cedula,telefono,idRol) => {
  let respuesta = {};
  //llamo a la funcion para obtener los datos de un servidor externo
  const datosUsuario = await obtenerDatosServidorExterno(cedula);

  if (datosUsuario == false) {
    return {
      status: false,
      message:
        "No se pudo crear el usuario, verifique que la cédula sea correcta",
      body: [],
    };
  }
  if (datosUsuario.err) {
    return {
      status: false,
      message: datosUsuario.err,
      body: [],
    }
  }


  //compruebo si el usuario ya existe
  const usuarioExiste = await usuarioRepository.getUsuarioPorCedula(
    datosUsuario.str_usuario_cedula
  );

  //compruebo que el correo no este registrado
  const correoExiste = await usuarioRepository.getUsuarioPorCorreo(
    datosUsuario.str_usuario_email
  );
  if (correoExiste) {
    return {
      status: false,
      message: "El usuario ya existe",
      body: [],
    };
  }
  if (usuarioExiste) {
    return {
      status: false,
      message: "El usuario ya existe",
      body: [],
    };
  }

  datosUsuario.str_usuario_telefono = telefono;

  //en una transaccion con sequelize se crea el usuario y el usuarioRol para que si falla una no se cree la otra
  //llamo a la funcion para crear el usuario
  const t = await sequelize.transaction();

  const idUsuario = await usuarioRepository.createUser(datosUsuario, t);
  if (!idUsuario) {
    await t.rollback();
  }
  //creo el usuarioRol
  const usuarioRol = await usuarioRolRepository.createUsuarioRolT(
    idRol,
    idUsuario,
    t
  );

  if (!usuarioRol) {
    await t.rollback();
  }
  await t.commit();

  //luego del commit para que se cree el usuario y el usuarioRol, debo crear los permisos
    //una vez que obtengo el in_usuario_rol_id de UsuarioRol, debo obtener todos los int_menu_id de Permisos para completar los permisos.
  //llamo al permisosService enviandole el int_usuario_rol_id creado
 
  const permisosActualizados = await permisosService.crearPermisosPorIdUsuarioRolService(
    usuarioRol
  );

  if (!permisosActualizados) {
    await t.rollback();
  }



  return {
    status: true,
    message: "Usuario creado correctamente",
    body: datosUsuario,
  };
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
    const usuario ={
      str_usuario_nombres: data.listado[0].per_nombres,
      str_usuario_apellidos:
        data.listado[0].per_primerApellido +
        " " +
        data.listado[0].per_segundoApellido,
      str_usuario_email: data.listado[0].per_email,
      str_usuario_cedula: cedula,
      str_usuario_telefono: data.listado[0].per_telefonoCelular,
    }
    
    return usuario;
  } catch (error) {
    console.log(error);
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
const buscarUsuarioService = async (texto,page) => {
  //convierto page en numero
  page = parseInt(page);
  //llamo a repositorio para buscar el usuario dado el texto
  const {usuarios, totalUsuarios} = await usuarioRepository.buscarUsuario(texto,page);
  if (usuarios.length > 0) {
    const metadata = paginacion(page, 10, totalUsuarios);
   return {
      status: true,
      message: "Usuarios encontrados",
      body: usuarios,
      metadata: {
        pagination:metadata
      }
   }
  }else{
    return {
      status: false,
      message: "No se encontraron usuarios",
      body: [],
      metadata: {
        pagination:{
          previousPage: 0,
          currentPage: 1,
          nextPage: null,
          total: usuarios.length,
          limit: usuarios.length,
        }
      },
    }
  }

}

const buscarUsuariosRegistradosService = async (texto) => {
  //llamo a repositorio para buscar el usuario dado el texto
  const usuarios = await usuarioRepository.buscarUsuariosRegistrados(texto);
  if (usuarios.length > 0) {
    return {
      status: true,
      message: "Usuarios encontrados",
      body: usuarios,
    }
  }else{
    return {
      status: false,
      message: "No se encontraron usuarios",
      body: [],
    }
  }

}

const filtrarUsuariosService = async (texto,page) => {
  //convierto page en numero
  page = parseInt(page);
  //llamo a repositorio para buscar el usuario dado el texto
  const {usuarios,totalUsuarios} = await usuarioRepository.filtrarUsuarios(texto,page);
  if (usuarios.length > 0) {
    const metadata = paginacion(page, 10, totalUsuarios);
    return {
      status: true,
      message: "Usuarios encontrados",
      body: usuarios,
      metadata: {
        pagination:metadata
      }
    }
  }else{
    return {
      status: false,
      message: "No se encontraron usuarios",
      body: [],
      metadata: {
        pagination:{
          previousPage: 0,
          currentPage: 1,
          nextPage: null,
          total: usuarios.length,
          limit: usuarios.length,
        }
      },
    }
  }
}
const obtenerUsuariosCentralizadaService = async (cedula) => {

  //llamo a obtenerDatosServidorExterno
  const datosUsuario = await obtenerDatosServidorExterno(cedula);
  if(datosUsuario == false){
    return {
      status: false,
      message: "No se encontró el usuario",
      body: [],
    }
  }
  return  {
    status: true,
    message: "Usuario encontrado",
    body: {
      nombres: datosUsuario.str_usuario_nombres,
      apellidos: datosUsuario.str_usuario_apellidos,
      correo: datosUsuario.str_usuario_email,
      telefono: datosUsuario.str_usuario_telefono,
    }
  }

}

export const obtenerAdministradorService = async () => {
  //llamo a repositorio para obtener el usuario dado el id
  const usuarios = await usuarioRepository.obtenerAdministrador();
  if (usuarios) {
    return usuarios;
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
  buscarUsuarioService,
  filtrarUsuariosService,
  obtenerUsuariosCentralizadaService,
  buscarUsuariosRegistradosService
};
