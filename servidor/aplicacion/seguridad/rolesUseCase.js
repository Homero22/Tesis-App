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



export default {
    obtenerRolesService,
    obtenerRolService
};