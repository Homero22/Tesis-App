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
        //calcular el offset
        const skip = (pagina - 1) * cantidad;
        const usuarios = await Usuario.findAll({
            offset: skip,
            limit: cantidad
        });
        return usuarios;
    } catch (error) {
        console.log(error);
    }
}

const createUser = async (usuario) => {
    try {
        const usuarioCreado = await Usuario.create(usuario);
        return usuarioCreado;
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
            str_usuario_telefono: telefono
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
            str_usuario_estado: estado
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
const buscarUsuario = async (texto) => {
    try {
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
            }
        });
        return usuarios;
    } catch (error) {
        console.log(error);
    }
}
const filtrarUsuarios = async (texto) => {
    try {
        //debo buscar o por nombre o por apellido o por cedula o por correo o por telefono o estado con  like
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
            }
        });

        return usuarios;
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