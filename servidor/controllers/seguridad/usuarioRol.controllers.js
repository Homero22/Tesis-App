import usuarioRol from "../../aplicacion/usuarios/usuarioRolUseCase.js";
import { jwtVariables } from "../../configuracion/variablesGlobales.js";
import jwt from "jsonwebtoken";
const obtenerRolesPorUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const roles = await usuarioRol.obtenerRolesPorUsuarioService(id);
        res.json(roles);
    } catch (error) {
        console.log(error);
        res.status(500).json({
        status: false,
        message: "Error en el servidor" + error,
        body: [],
        });
    }
};

const obtenerRolesUsuarioLogueado = async (req, res) => {
    try{
        const {token} = req.cookies;
        const dataCookie = jwt.verify(token, jwtVariables.jwtSecret);

        const roles = await usuarioRol.obtenerRolesPorUsuarioService(dataCookie.int_usuario_id);
        
        res.json(roles);

    }catch(error){
        console.log(error);
        res.status(500).json({
        status: false,
        message: "Error en el servidor" + error,
        body: [],
        });
    }

}

const crearUsuarioRol = async (req, res) => {
    try {
        const { idRol, idUsuario } = req.body;
        console.log("crear perfil ",idRol, idUsuario);
        const usuarioRolCreado = await usuarioRol.crearUsuarioRolService(
        idRol,
        idUsuario
        );
        res.json(usuarioRolCreado);
    } catch (error) {
        res.status(500).json({
        status: false,
        message: "Error en el servidor" + error,
        body: [],
        });
    }
};

const cambiarEstadoUsuarioRol = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioRolDesactivado = await usuarioRol.cambiarEstadoUsuarioRolService(id);
        res.json(usuarioRolDesactivado);
    } catch (error) {
        res.status(500).json({
        status: false,
        message: "Error en el servidor" + error,
        body: [],
        });
    }
};


export default {
    obtenerRolesPorUsuario,
    crearUsuarioRol,
    cambiarEstadoUsuarioRol,
    obtenerRolesUsuarioLogueado,
}