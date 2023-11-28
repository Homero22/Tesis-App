import rolRepository from "../../repositories/seguridad/rolRepository.js";

const obtenerRolesService = async () => {
  //obtener todos los roles
  const roles = await rolRepository.getAllRoles();

  let respuesta={};

  if (roles.length > 0) {
    respuesta = {
        status:true,
        message:"Roles encontrados",
        body:roles
    };
  }else{
    respuesta = {
        status:false,
        message:"No se encontraron roles",
        body:[]
    };
  }

  return respuesta;

};

const obtenerRolService = async (id) => {
    let respuesta={};
    //comprobar que el id sea un numero y no sea decimal
    if (isNaN(id) || id % 1 != 0) {
        respuesta = {
            status:false,
            message:"El id debe ser un número entero",
            body:[]
        };
        return respuesta;
    }

   
    //obtener todos los roles
    const rol = await rolRepository.getRolPorId(id);
    
    if (rol) {
        respuesta = {
            status:true,
            message:"Rol encontrado",
            body:rol
        };
    }else{
        respuesta = {
            status:false,
            message:"No se encontró el rol",
            body:[]
        };
    }
    
    return respuesta;
    
};

const crearRolService = async (nombre, descripcion) => {
    let respuesta={};
    //comprobar que el nombre no sea vacio
    if (nombre.trim() == "") {
        respuesta = {
            status:false,
            message:"El nombre no puede ser vacío",
            body:[]
        };
        return respuesta;
    }

    //comprobar que la descripcion no sea vacia
    if (descripcion.trim() == "") {
        respuesta = {
            status:false,
            message:"La descripción no puede ser vacía",
            body:[]
        };
        return respuesta;
    }

    //comprobar que el nombre no exista
    const rol = await rolRepository.getRolPorNombre(nombre);
    if (rol) {
        respuesta = {
            status:false,
            message:"El nombre del rol ya existe",
            body:[]
        };
        return respuesta;
    }
    //creo el objeto rol
    const rolInfo = {
        str_rol_nombre: nombre,
        str_rol_descripcion: descripcion,
    };

    //crear el rol
    const rolCreado = await rolRepository.createRol(rolInfo);
    if (rolCreado) {
        respuesta = {
            status:true,
            message:"Rol creado",
            body:[]
        };
    }else{
        respuesta = {
            status:false,
            message:"No se pudo crear el rol",
            body:[]
        };
    }
    return respuesta;
}
const actualizarRolService = async (id, nombre, descripcion) => {
    let respuesta={};
    //comprobar que el id sea un numero y no sea decimal
    if (isNaN(id) || id % 1 != 0) {
        respuesta = {
            status:false,
            message:"El id debe ser un número entero",
            body:[]
        };
        return respuesta;
    }

    //comprobar que el nombre no sea vacio
    if (nombre.trim() == "") {
        respuesta = {
            status:false,
            message:"El nombre no puede ser vacío",
            body:[]
        };
        return respuesta;
    }

    //comprobar que la descripcion no sea vacia
    if (descripcion.trim() == "") {
        respuesta = {
            status:false,
            message:"La descripción no puede ser vacía",
            body:[]
        };
        return respuesta;
    }

    //comprobar que el nombre no exista
    const rol = await rolRepository.getRolPorNombre(nombre);
    if (rol) {
        respuesta = {
            status:false,
            message:"El nombre del rol ya existe",
            body:[]
        };
        return respuesta;
    }
    //creo el objeto rol
    const rolInfo = {
        str_rol_nombre: nombre,
        str_rol_descripcion: descripcion,
    };

    //actualizar el rol
    const rolActualizado = await rolRepository.actualizarRol(id, rolInfo);
    if (rolActualizado) {
        respuesta = {
            status:true,
            message:"Rol actualizado",
            body:[]
        };
    }else{
        respuesta = {
            status:false,
            message:"No se pudo actualizar el rol",
            body:[]
        };
    }
    return respuesta;
}



export default {
    obtenerRolesService,
    obtenerRolService,
    crearRolService,
    actualizarRolService
};