import {Rol} from '../../models/seguridad/rol.model.js';
import { Op } from "sequelize";

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
            dt_fecha_actualizacion: new Date()
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
            str_rol_estado: estado,
            dt_fecha_actualizacion: new Date()
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
const obtenerRolesConPaginacion = async (pagina, cantidad) => {
    try {
        const skip = (pagina - 1) * cantidad;
        const roles = await Rol.findAll({
            offset: skip,
            limit: cantidad,
            order: [
                ['dt_fecha_actualizacion', 'DESC']
            ]
        });
        return roles;
    } catch (error) {
        console.log(error);
    }

}
const obtenerTotalRoles = async () => {
    try {
        const totalRoles = await Rol.count();
        return totalRoles;
    } catch (error) {
        console.log(error);
    }
}
const buscarRol = async (texto,page) => {
    try {
        const skip = (page - 1) * 10;
        //buscar o por todos los campos con iLike
        const roles = await Rol.findAll({
            where: {
                [Op.or]: [
                {
                    str_rol_nombre: {
                        [Op.iLike]: `%${texto}%`
                    }
                }, {
                    str_rol_descripcion: {
                        [Op.iLike]: `%${texto}%`
                    }
                },
                {
                    str_rol_estado: {
                        [Op.iLike]: `%${texto}%`
                    }
                },
            ]
            },
            order:[
                ['dt_fecha_actualizacion','DESC']
            ],
            offset: skip,
            limit: 10
        });
        //obtener la cantidad de registros con el texto
        const totalRoles = await Rol.count({
            where: {
                [Op.or]: [
                {
                    str_rol_nombre: {
                        [Op.iLike]: `%${texto}%`
                    }
                }, {
                    str_rol_descripcion: {
                        [Op.iLike]: `%${texto}%`
                    }
                },
                {
                    str_rol_estado: {
                        [Op.iLike]: `%${texto}%`
                    }
                },
            ],
            },
        });

        const data = {
            roles,
            totalRoles
        }
        
        return data;
    } catch (error) {
        console.log(error);
    }
}
const filtrarRoles = async (texto,page) => {
    try {
        const skip = (page - 1) * 10;
        const roles = await Rol.findAll({
            where: {
                [Op.or]: [
                {
                    str_rol_nombre: {
                        [Op.like]: `${texto}`
                    }
                }, 
                {
                    str_rol_descripcion: {
                        [Op.like]: `${texto}`
                    }
                },
                {
                    str_rol_estado: {
                        [Op.like]: `${texto}`
                    }
                },
            ],
            },
            order:[
                ['dt_fecha_actualizacion','DESC']
            ],
            offset: skip,
            limit: 10
        });

        //contar cuantos registros existen con ese filtro
        const totalRoles = await Rol.count({
            where: {
                [Op.or]: [
                {
                    str_rol_nombre: {
                        [Op.like]: `${texto}`
                    }
                }, 
                {
                    str_rol_descripcion: {
                        [Op.like]: `${texto}`
                    }
                },
                {
                    str_rol_estado: {
                        [Op.like]: `${texto}`
                    }
                },
            ],
            },
        });
        const data = {
            roles,
            totalRoles
        }   
        return data
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
    getRolPorNombre,
    obtenerRolesConPaginacion,
    obtenerTotalRoles,
    buscarRol,
    filtrarRoles
}