//Cuando inicia la aplicación se debe crear en la base de datos un usuario administrador con todos los permisos
import usuarioRepository from "../../repositories/usuarios/usuarioRepository.js"
export const crearUsuarioAdministrador = async () => {
    //comprobar si existe un usuario administrador con cédula
    const usuario = await usuarioRepository.getUsuarioPorCedula("1550168494");
    if(!usuario){
        //crear el usuario administrador
        const adminInfo ={
            str_usuario_cedula: "0000000000",
            str_usuario_nombres: "HOMERO ABELARDO",
            str_usuario_apellidos: "OJEDA CULTID",
            str_usuario_email: "homero.ojeda@espoch.edu.ec",
        }
        const usuarioCreado = await usuarioRepository.createUser({
            ...adminInfo
        });
        if(usuarioCreado){
            console.log("Usuario administrador creado");
        }
    }else{
        console.log("El usuario administrador ya existe");
    }

}