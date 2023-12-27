import { Usuario } from "../../models/esquemaSeguridad/usuario.model.js";
import { Op } from "sequelize";


const getAllUsers = async () => {
    try {
        const usuarios = await Usuario.findAll({});
        return usuarios;
    } catch (error) {
        console.log(error);
    }
}

const obtenerUsuariosConPaginacion = async (pagina, cantidad) => {
    try {

        const skip = (pagina - 1) * cantidad;
        //devolver los usuarios con dt_fecha_actualizacion mas reciente
        const usuarios = await Usuario.findAll({
            offset: skip,
            limit: cantidad,
            order: [
                ['dt_fecha_actualizacion', 'DESC']
            ]
        });
        return usuarios;
    } catch (error) {
        console.log(error);
    }
}

// const createUser = async (usuario,t) => {
//     try {
//         //creo el usuario y retorno el int_usuario_id
//         const usuarioCreado = await Usuario.create(usuario);
//         return usuarioCreado.int_usuario_id;
//     } catch (error) {
//         console.log(error);
//     }
// }

//crear un usuario con transaccion
const createUser = async (usuario, t) => {
    try {
        //creo el usuario y retorno el int_usuario_id
        const usuarioCreado = await Usuario.create(usuario, { transaction: t });
        return usuarioCreado.int_usuario_id;
    } catch (error) {
        console.log(error);
    }
}

const getUsuarioPorCedula = async (cedula) => {
    try {
        const usuario = await Usuario.findOne({
            where: {
                str_usuario_cedula: cedula
            },
            raw: true
        });
        return usuario;
    } catch (error) {
        console.log(error);
    }
}
const getUsuarioPorCorreo = async (correo) => {
    try {
        const usuario = await Usuario.findOne({
            where: {
                str_usuario_email: correo
            },
            raw: true
        });
        return usuario;
    } catch (error) {
        console.log(error);
    }
}

const actualizarTelefonoUsuario = async (id, telefono) => {
    try {
        const usuarioActualizado = await Usuario.update({
            str_usuario_telefono: telefono,
            dt_fecha_actualizacion: new Date()
        }, {
            where: {
                int_usuario_id: id
            }
        });
        
        return usuarioActualizado;
       
    } catch (error) {
        console.log(error);
    }
}
const obtenerUsuarioPorId = async (id) => {
    try {
        const usuario = await Usuario.findOne({
            where: {
                int_usuario_id: id
            },
            raw: true
        });
        return usuario;
    } catch (error) {
        console.log(error);
    }

}
const desactivarUsuario = async (id,estado) => {
    try {
        const usuarioDesactivado = await Usuario.update({
            str_usuario_estado: estado,
            dt_fecha_actualizacion: new Date()
        }, {
            where: {
                int_usuario_id: id
            }
        });
        return usuarioDesactivado;
    } catch (error) {
        console.log(error);
    }
}
const obtenerTotalUsuarios = async () => {
    try {
        const totalUsuarios = await Usuario.count();
        return totalUsuarios;
    } catch (error) {
        console.log(error);
    }
}
const buscarUsuario = async (texto, page) => {
    try {
        const skip = (page - 1) * 10;
        //debo buscar o por nombre o por apellido o por cedula o por correo o por telefono o estado con ilike
        const usuarios = await Usuario.findAll({
            where: {
                [Op.or]: [
                    {
                        str_usuario_nombres: {
                            [Op.iLike]: `%${texto}%`
                        }
                    },
                    {
                        str_usuario_apellidos: {
                            [Op.iLike]: `%${texto}%`
                        }
                    },
                    {
                        str_usuario_cedula: {
                            [Op.iLike]: `%${texto}%`
                        }
                    },
                    {
                        str_usuario_email: {
                            [Op.iLike]: `%${texto}%`
                        }
                    },
                    {
                        str_usuario_telefono: {
                            [Op.iLike]: `%${texto}%`
                        }
                    },
                    {
                        str_usuario_estado: {
                            [Op.iLike]: `%${texto}%`
                        }
                    }
                ]
            },
            order:[
                ['dt_fecha_actualizacion','DESC']
            ],
            offset: skip,
            limit: 10
        });
        //obtener la cantidad de registros con el texto
        const totalUsuarios = await Usuario.count({
            where: {
                [Op.or]: [
                    {
                        str_usuario_nombres: {
                            [Op.iLike]: `%${texto}%`
                        }
                    },
                    {
                        str_usuario_apellidos: {
                            [Op.iLike]: `%${texto}%`
                        }
                    },
                    {
                        str_usuario_cedula: {
                            [Op.iLike]: `%${texto}%`
                        }
                    },
                    {
                        str_usuario_email: {
                            [Op.iLike]: `%${texto}%`
                        }
                    },
                    {
                        str_usuario_telefono: {
                            [Op.iLike]: `%${texto}%`
                        }
                    },
                    {
                        str_usuario_estado: {
                            [Op.iLike]: `%${texto}%`
                        }
                    }
                ]
            }
        });
        const data = {
            usuarios,
            totalUsuarios
        }
        return data;
    } catch (error) {
        console.log(error);
    }
}
const filtrarUsuarios = async (texto,page) => {
    try {
        //debo buscar o por nombre o por apellido o por cedula o por correo o por telefono o estado con  like
         const skip = (page - 1) * 10;   
        const usuarios = await Usuario.findAll({
            where: {
                [Op.or]: [
                    {
                        str_usuario_nombres: {
                            [Op.like]: `%${texto}%`
                        }
                    },
                    {
                        str_usuario_apellidos: {
                            [Op.like]: `%${texto}%`
                        }
                    },
                    {
                        str_usuario_cedula: {
                            [Op.like]: `%${texto}%`
                        }
                    },
                    {
                        str_usuario_email: {
                            [Op.like]: `%${texto}%`
                        }
                    },
                    {
                        str_usuario_telefono: {
                            [Op.like]: `%${texto}%`
                        }
                    },
                    {
                        str_usuario_estado: {
                            [Op.like]: `${texto}`
                        }
                    }
                ]
            },
            order:[
                ['dt_fecha_actualizacion','DESC']
            ],
            offset: skip,
            limit: 10 
        });

        //contar cuantos registros existen con ese filtro
        const totalUsuarios = await Usuario.count({
            where: {
                [Op.or]: [
                    {
                        str_usuario_nombres: {
                            [Op.like]: `%${texto}%`
                        }
                    },
                    {
                        str_usuario_apellidos: {
                            [Op.like]: `%${texto}%`
                        }
                    },
                    {
                        str_usuario_cedula: {
                            [Op.like]: `%${texto}%`
                        }
                    },
                    {
                        str_usuario_email: {
                            [Op.like]: `%${texto}%`
                        }
                    },
                    {
                        str_usuario_telefono: {
                            [Op.like]: `%${texto}%`
                        }
                    },
                    {
                        str_usuario_estado: {
                            [Op.like]: `${texto}`
                        }
                    }
                ]
            }
        });
        const data = {
            usuarios,
            totalUsuarios
        }

        return data;
    } catch (error) {
        console.log(error);
    }
}
export default {
    getAllUsers,
    createUser,
    getUsuarioPorCedula,
    obtenerUsuariosConPaginacion,
    actualizarTelefonoUsuario,
    obtenerUsuarioPorId,
    desactivarUsuario,
    getUsuarioPorCorreo,
    obtenerTotalUsuarios,
    buscarUsuario,
    filtrarUsuarios
}