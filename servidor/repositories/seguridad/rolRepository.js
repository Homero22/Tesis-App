import {Rol} from '../../models/esquemaSeguridad/rol.model.js';

const getAllRoles = async () => {
    try {
        const roles = await Rol.findAll({});
        return roles;
    } catch (error) {
        console.log(error);
    }
}

const createRol = async (rol) => {
    try {
        const rolCreado = await Rol.create(rol);
        return rolCreado;
    } catch (error) {
        console.log(error);
    }
}

const getRolPorId = async (id) => {
    try {
        const rol = await Rol.findOne({
            where: {
                int_rol_id: id
            },
            raw: true
        });
        return rol;
    } catch (error) {
        console.log(error);
    }
}

const actualizarRol = async (id, rol) => {
    try {
        const rolActualizado = await Rol.update({
            str_rol_nombre: rol.str_rol_nombre,
            str_rol_descripcion: rol.str_rol_descripcion,
        }, {
            where: {
                int_rol_id: id
            }
        });
        
        return rolActualizado;
       
    } catch (error) {
        console.log(error);
    }
}

const desactivarRol = async (id, estado) => {
    try {
        const rolActualizado = await Rol.update({
            int_rol_estado: estado
        }, {
            where: {
                int_rol_id: id
            }
        });
        
        return rolActualizado;
       
    } catch (error) {
        console.log(error);
    }
}

const getRolPorNombre = async (nombre) => {
    try {
        const rol = await Rol.findOne({
            where: {
                str_rol_nombre: nombre
            },
            raw: true
        });
        return rol;
    } catch (error) {
        console.log(error);
    }
}




export default {
    getAllRoles,
    createRol,
    getRolPorId,
    actualizarRol,
    desactivarRol,
    getRolPorNombre
}