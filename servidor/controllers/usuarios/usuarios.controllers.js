import jwt from "jsonwebtoken";
import { jwtVariables } from "../../configuracion/variablesGlobales.js";
import UsuariosService from "../../aplicacion/usuarios/usuariosUseCase.js";
import { TIME } from "sequelize";

const obtenerDatosMiCuenta = async (req, res) => {
  try {
    const { token } = req.cookies;
    const dataCookie = jwt.verify(token, jwtVariables.jwtSecret);

    const datosMiCuenta = await UsuariosService.obtenerDatosMiCuentaService(
      dataCookie.str_usuario_cedula
    );
    res.json({
      status: "success",
      message: "Datos de mi cuenta",
      body: datosMiCuenta,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error en el servidor" + error,
      body: [],
    });
  }
};

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await UsuariosService.obtenerUsuariosService();
    if (!usuarios) {
      return res.json({
        status: false,
        message: "No se encontraron usuarios",
        body: [],
      });
    }
    res.json({
      status: true,
      message: "Usuarios",
      body: usuarios,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error en el servidor" + error,
      body: [],
    });
  }
};

const crearUsuario = async (req, res) => {
  try {
    const { cedula } = req.body;

    const usuarioCreado = await UsuariosService.crearUsuarioService(cedula);

    if (usuarioCreado == false) {
      return res.json({
        status: false,
        message:
          "No se pudo crear el usuario, verifique que la cédula sea correcta",
        body: [],
      });
    }
    if (usuarioCreado == 1) {
      return res.json({
        status: false,
        message: "El usuario ya existe",
        body: [],
      });
    }
    res.json({
      status: true,
      message: "Usuario creado correctamente",
      body: usuarioCreado,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error en el servidor" + error,
      body: [],
    });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    //se puede actualizar solo el telefono
    const { telefono } = req.body;
    const { id } = req.params;



    const usuarioActualizado = await UsuariosService.actualizarUsuarioService(
      id,
      telefono
    );
    if (usuarioActualizado == false) {
      return res.json({
        status: false,
        message: "No se pudo actualizar el usuario",
        body: [],
      });
    }
    res.json({
      status: true,
      message: "Usuario actualizado correctamente",
      body: usuarioActualizado,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error en el servidor" + error,
      body: [],
    });
  }
};
const obtenerUsuario = async (req, res) => {
  try{

    const { id } = req.params;
    const usuario = await UsuariosService.obtenerUsuarioService(id);
    if (!usuario) {
      return res.json({
        status: false,
        message: "No se encontró el usuario",
        body: [],
      });
    }
    res.json({
      status: true,
      message: "Usuario",
      body: usuario,
    });
  }catch(error){
    res.status(500).json({
      status: false,
      message: "Error en el servidor" + error,
      body: [],
    });
  }
}

const desactivarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioDesactivado = await UsuariosService.desactivarUsuarioService(
      id
    );
    if (usuarioDesactivado == false) {
      return res.json({
        status: false,
        message: "No se pudo desactivar el usuario",
        body: [],
      });
    }
    res.json({
      status: true,
      message: "Usuario desactivado correctamente",
      body: usuarioDesactivado,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error en el servidor" + error,
      body: [],
    });
  }
}

export default {
  obtenerDatosMiCuenta,
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  obtenerUsuario,
  desactivarUsuario

};
