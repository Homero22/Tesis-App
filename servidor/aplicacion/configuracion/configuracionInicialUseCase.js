import rolRepository from "../../repositories/seguridad/rolRepository.js";
import menuRepository from "../../repositories/seguridad/menuRepository.js";
import usuarioRolRepository from "../../repositories/seguridad/usuarioRolRepository.js";
import usuarioRepository from "../../repositories/seguridad/usuarioRepository.js";
import permisoRepository from "../../repositories/seguridad/permisoRepository.js";

export const configuracionInicial = async () => {
  //Configuración Inicial de la aplicación
  /**
   * Contexto: Cuando se crean las tablas en la base de datos se deben crear menus, submenus, roles,permisos antes de crear cualquier usuario
   * Una vez creados los menus, submenus, roles,permisos se debe crear un usuario administrador con todos los permisos
   */

  //Al iniciar la app se debe crear dos roles: "Administrador" y "Usuario"
  const adminInfo = {
    str_rol_nombre: "Administrador",
    str_rol_descripcion: "Rol con todos los permisos",
  };
  const usuarioInfo = {
    str_rol_nombre: "Usuario",
    str_rol_descripcion: "Rol con permisos básicos",
  };
  //comprobar que el nombre del rol no exista
  const rolAdminExistente = await rolRepository.getRolPorNombre(
    adminInfo.str_rol_nombre
  );
  const rolUsuarioExistente = await rolRepository.getRolPorNombre(
    usuarioInfo.str_rol_nombre
  );
  if (!rolAdminExistente || !rolUsuarioExistente) {
   

    const rolAdmin = await rolRepository.createRol({
      ...adminInfo,
    });
    const rolUsuario = await rolRepository.createRol({
      ...usuarioInfo,
    });
    if (rolAdmin && rolUsuario) {
      console.log("Roles creados");
    }
  }
  //crear usuario administrador
  const usuario = await usuarioRepository.getUsuarioPorCedula("1550168494");
  if (!usuario) {
    //crear el usuario administrador
    const adminInfo = {
      str_usuario_cedula: "1550168494",
      str_usuario_nombres: "HOMERO ABELARDO",
      str_usuario_apellidos: "OJEDA CULTID",
      str_usuario_email: "homero.ojeda@espoch.edu.ec",
      str_usuario_telefono: "0999778684",
    };
    const usuarioCreado = await usuarioRepository.createUser({
      ...adminInfo,
    });
    if (usuarioCreado) {
      console.log("Usuario administrador creado");
    }
  } else {
    console.log("El usuario administrador ya existe");
  }

  // Al iniciar la app se deben crear los menus y submenus del front ya establecidos

  const menus = [
    {
      int_menu_padre_id: null,
      str_menu_nombre: "Principal",
      str_menu_descripcion: "Menu general",
      str_menu_icono: "menu",
      str_menu_path: "welcome",
    },
    {
      int_menu_padre_id: 1,
      str_menu_nombre: "Inicio",
      str_menu_descripcion: "Bienvenida",
      str_menu_icono: "home",
      str_menu_path: "welcome",
    },
    {
      int_menu_padre_id: 1,
      str_menu_nombre: "Ajustes",
      str_menu_descripcion: "Seguridad",
      str_menu_icono: "settings",
      str_menu_path: "ajustes",
    },
    {
      int_menu_padre_id: 3,
      str_menu_nombre: "Roles",
      str_menu_descripcion: "Roles del usuario",
      str_menu_icono: "subdirectory_arrow_right",
      str_menu_path: "ajustes/roles",
    },
    {
      int_menu_padre_id: 3,
      str_menu_nombre: "Mi cuenta",
      str_menu_descripcion: "información del usuario",
      str_menu_icono: "subdirectory_arrow_right",
      str_menu_path: "ajustes/cuenta",
    },
    {
      int_menu_padre_id: 3,
      str_menu_nombre: "Menus",
      str_menu_descripcion: "Todos los menus del sistema",
      str_menu_icono: "subdirectory_arrow_right",
      str_menu_path: "ajustes/menus",
    },
    {
      int_menu_padre_id: 3,
      str_menu_nombre: "Usuarios",
      str_menu_descripcion: "Todos los usuarios del sistema",
      str_menu_icono: "subdirectory_arrow_right",
      str_menu_path: "ajustes/usuarios",
    },
    {
      int_menu_padre_id: 1,
      str_menu_nombre: "Reportes",
      str_menu_descripcion: "Menu de reportes",
      str_menu_icono: "assignment_turned_in",
      str_menu_path: "reportes",
    },
    {
      int_menu_padre_id: 1,
      str_menu_nombre: "Incidencias",
      str_menu_descripcion: "Menu de incidencias",
      str_menu_icono: "assignment_turned_in",
      str_menu_path: "incidencias",
    },
  ];
  //comprobar que los menus no existan
  const menusEncontrados = await menuRepository.comprobarMenusPorNombres(
    menus.map((menu) => menu.str_menu_nombre)
  );
  if (menusEncontrados.length == 0) {
    
   
    const menusCreados = await menuRepository.createMenus(menus);
    if (menusCreados) {
      console.log("Menus creados");
    }
  }
  // Se crea el usuario administrador por defecto y se le asigna el rol "Administrador" antes creado en la tabla usuario_rol
  //comprobar que usuarioInfo no exista

  const usuarioRolInfo = {
    int_usuario_id: 1,
    int_rol_id: 1,
  };
  const usuarioRolInfoExistente =
    await usuarioRolRepository.comprobarUsuarioRol(usuarioRolInfo);
  if (!usuarioRolInfoExistente) {
    const usuarioRolCreado = await usuarioRolRepository.createUsuarioRol({
      ...usuarioRolInfo,
    });
    if (usuarioRolCreado) {
      console.log("Usuario rol creado");
    }
  }

  // luego de crear a este usuario administrador se llena la tabla permisos con este id de usuario_rol y todos los menus antes creados con editar, crear, eliminar, ver en true para el rol administrador

  const permisos = [
    {
      int_usuario_rol_id: 1,
      int_menu_id: 1,
      bln_permiso_crear: true,
      bln_permiso_editar: true,
      bln_permiso_eliminar: true,
      bln_permiso_ver: true,
    },
    {
      int_usuario_rol_id: 1,
      int_menu_id: 2,
      bln_permiso_crear: true,
      bln_permiso_editar: true,
      bln_permiso_eliminar: true,
      bln_permiso_ver: true,
    },
    {
      int_usuario_rol_id: 1,
      int_menu_id: 3,
      bln_permiso_crear: true,
      bln_permiso_editar: true,
      bln_permiso_eliminar: true,
      bln_permiso_ver: true,
    },
    {
      int_usuario_rol_id: 1,
      int_menu_id: 4,
      bln_permiso_crear: true,
      bln_permiso_editar: true,
      bln_permiso_eliminar: true,
      bln_permiso_ver: true,
    },
    {
      int_usuario_rol_id: 1,
      int_menu_id: 5,
      bln_permiso_crear: true,
      bln_permiso_editar: true,
      bln_permiso_eliminar: true,
      bln_permiso_ver: true,
    },
    {
      int_usuario_rol_id: 1,
      int_menu_id: 6,
      bln_permiso_crear: true,
      bln_permiso_editar: true,
      bln_permiso_eliminar: true,
      bln_permiso_ver: true,
    },
    {
      int_usuario_rol_id: 1,
      int_menu_id: 7,
      bln_permiso_crear: true,
      bln_permiso_editar: true,
      bln_permiso_eliminar: true,
      bln_permiso_ver: true,
    },
    {
      int_usuario_rol_id: 1,
      int_menu_id: 8,
      bln_permiso_crear: true,
      bln_permiso_editar: true,
      bln_permiso_eliminar: true,
      bln_permiso_ver: true,
    },
    {
      int_usuario_rol_id: 1,
      int_menu_id: 9,
      bln_permiso_crear: true,
      bln_permiso_editar: false,
      bln_permiso_eliminar: false,
      bln_permiso_ver: true,
    }
  ];
  //comprobar que los permisos no existan
  const permisosEncontrados = await permisoRepository.comprobarPermisos(
    permisos
  );
  if (permisosEncontrados.length == 0) {
    console.log("Creando permisos");

    const permisosCreados = await permisoRepository.createPermisos(permisos);

    if (permisosCreados) {
      console.log("Permisos creados");
    }
  }
};
