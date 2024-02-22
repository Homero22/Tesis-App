import menuRepository from "../../repositories/seguridad/menuRepository.js";
import {
  paginacion,
  validarPaginacion,
  obtenerDataQueryPaginacion,
} from "../utils/paginacion.utils.js";
import permisosService from "../../aplicacion/seguridad/permisosUseCase.js";
import { or } from "sequelize";
import e from "express";

const obtenerMenusService = async (query) => {
  const validacion = validarPaginacion(query);
  if (validacion != true) {
    return validacion;
  }
  //obtener los datos de la query
  const { page, limit } = obtenerDataQueryPaginacion(query);
  //obtener todos los menus
  const menus = await menuRepository.obtenerMenusConPaginacion(page, limit);
  //obtener el total de registros de menus
  const totalMenus = await menuRepository.obtenerTotalMenus();
  if (menus.length > 0) {
    const metadata = paginacion(page, limit, totalMenus);
    return {
      status: true,
      message: "Menus encontrados",
      body: menus,
      metadata: {
        pagination: metadata,
      },
    };
  }
  return {
    status: false,
    message: "No se encontraron menus",
    body: [],
  };
};
const obtenerMenuService = async (id) => {
  let respuesta = {};
  //comprobar que el id sea un numero y no sea decimal
  if (isNaN(id) || id % 1 != 0) {
    respuesta = {
      status: false,
      message: "El id debe ser un número entero",
      body: [],
    };
    return respuesta;
  }

  //obtener el menu por id
  const menu = await menuRepository.getMenuPorId(id);

  if (menu) {
    respuesta = {
      status: true,
      message: "Menu encontrado",
      body: menu,
    };
  } else {
    respuesta = {
      status: false,
      message: "No se encontró el menu",
      body: [],
    };
  }

  return respuesta;
};
const obtenerSubmenusService = async (id) => {
  let respuesta = {};
  //comprobar que el id sea un numero y no sea decimal
  if (isNaN(id) || id % 1 != 0) {
    respuesta = {
      status: false,
      message: "El id debe ser un número entero",
      body: [],
    };
    return respuesta;
  }

  //obtener el menu por id
  const submenus = await menuRepository.getSubmenusPorId(id);

  if (submenus.length > 0) {
    const metadata = paginacion(1, submenus.length, submenus.length);
    respuesta = {
      status: true,
      message: "Submenus encontrados",
      body: submenus,
      metadata: {
        pagination: metadata,
      },
    };
  } else {
    respuesta = {
      status: false,
      message: "No se encontraron submenus",
      body: [],
      metadata: {
        pagination: {
          previousPage: 0,
          currentPage: 1,
          nextPage: null,
          total: submenus.length,
          limit: submenus.length,
        },
      },
    };
  }

  return respuesta;
};
const crearMenuService = async (
  nombre,
  path,
  icono,
  descripcion,
  id_menu_padre
) => {
  let respuesta = {};
  //comprobar que el id_menu_padre sea un numero y no sea decimal
  if (isNaN(id_menu_padre) || id_menu_padre % 1 != 0) {
    respuesta = {
      status: false,
      message: "El id_menu_padre debe ser un número entero",
      body: [],
    };
    return respuesta;
  }

  //comprobar que el menu no exista
  const menuEncontrado = await menuRepository.comprobarMenuPorNombre(nombre);

  if (menuEncontrado) {
    respuesta = {
      status: false,
      message: "El menu ya existe",
      body: [],
    };
    return respuesta;
  }
  //creo el objeto
  const menu = {
    str_menu_nombre: nombre,
    str_menu_path: path,
    str_menu_icono: icono,
    str_menu_descripcion: descripcion,
    int_menu_padre_id: id_menu_padre,
  };
  //crear el menu
  const menuCreado = await menuRepository.createMenu(menu);

  if (!menuCreado) {
    respuesta = {
      status: false,
      message: "No se pudo crear el menu",
      body: [],
    };
    return respuesta;
  }

  //Cuando se crea un nuevo Menu , se debe actualizar la tabla permisos con el int_menu_id que se crea recientemente y debemos obtener
  //tods los int_usuario_rol_id de UsuarioRol para completar los permisos.

  //llamo al permisosService enviandole el int_menu_id creado
  console.log("Id del menu creado", menuCreado.int_menu_id);
  const permisosActualizados =
    await permisosService.crearPermisosPorIdMenuService(menuCreado.int_menu_id);

  if (!permisosActualizados) {
    respuesta = {
      status: false,
      message: "No se pudo actualizar los permisos",
      body: [],
    };
    return respuesta;
  }

  respuesta = {
    status: true,
    message: "Menu creado",
    body: menuCreado,
  };

  return respuesta;
};
const actualizarMenuService = async (
  id,
  nombre,
  path,
  icono,
  descripcion,
  id_menu_padre
) => {
  let respuesta = {};
  console.log(id);
  console.log(id_menu_padre);
  //comprobar que el id_menu_padre sea un numero entero
  if (isNaN(id_menu_padre) || isNaN(id)) {
    respuesta = {
      status: false,
      message: "El id_menu_padre debe ser un número entero",
      body: [],
    };
    return respuesta;
  }

  //creo el objeto
  const menu = {
    str_menu_nombre: nombre,
    str_menu_path: path,
    str_menu_icono: icono,
    str_menu_descripcion: descripcion,
    int_menu_padre_id: id_menu_padre,
  };

  //actualizar el menu
  const menuActualizado = await menuRepository.actualizarMenu(id, menu);

  if (menuActualizado) {
    respuesta = {
      status: true,
      message: "Menu actualizado",
      body: menuActualizado,
    };
  } else {
    respuesta = {
      status: false,
      message: "No se pudo actualizar el menu",
      body: [],
    };
  }

  return respuesta;
};
const desactivarMenuService = async (id) => {
  let respuesta = {};
  //comprobar que el id sea un numero y no sea decimal
  if (isNaN(id) || id % 1 != 0) {
    respuesta = {
      status: false,
      message: "El id debe ser un número entero",
      body: [],
    };
    return respuesta;
  }

  //comprobar que el menu exista
  const menuEncontrado = await menuRepository.getMenuPorId(id);

  if (!menuEncontrado) {
    respuesta = {
      status: false,
      message: "El menu no existe",
      body: [],
    };
    return respuesta;
  }
  let estado = menuEncontrado.str_menu_estado;
  if (estado == "ACTIVO") {
    estado = "INACTIVO";
  } else {
    estado = "ACTIVO";
  }

  //desactivar el menu
  const menuDesactivado = await menuRepository.desactivarMenu(id, estado);

  if (menuDesactivado) {
    return {
      status: true,
      message: "Se ha cambiado el estado del menú",
      body: menuDesactivado,
    };
  } else {
    return {
      status: false,
      message: "No se pudo cambiar el estado del menú",
      body: [],
    };
  }
};
const filtrarMenusService = async (texto, page) => {
  page = parseInt(page);
  const { menus, totalMenus } = await menuRepository.filtrarMenus(texto, page);
  console.log("TOTAL", totalMenus);
  if (menus.length > 0) {
    const metadata = paginacion(page, 10, totalMenus);
    console.log(metadata);
    return {
      status: true,
      message: "Menus encontrados",
      body: menus,
      metadata: {
        pagination: metadata,
      },
    };
  } else {
    return {
      status: false,
      message: "No se encontraron menus",
      body: [],
      metadata: {
        pagination: {
          previousPage: 0,
          currentPage: 1,
          nextPage: null,
          total: menus.length,
          limit: menus.length,
        },
      },
    };
  }
};
const buscarMenuService = async (texto, page) => {
  page = parseInt(page);
  const { menus, totalMenus } = await menuRepository.buscarMenu(texto, page);
  if (menus.length > 0) {
    const metadata = paginacion(page, 10, totalMenus);
    return {
      status: true,
      message: "Menus encontrados",
      body: menus,
      metadata: {
        pagination: metadata,
      },
    };
  } else {
    return {
      status: false,
      message: "No se encontraron menus",
      body: [],
      metadata: {
        pagination: {
          previousPage: 0,
          currentPage: 1,
          nextPage: null,
          total: menus.length,
          limit: menus.length,
        },
      },
    };
  }
};
const obtenerMenusSinPaginacionService = async () => {
  const menus = await menuRepository.getAllMenus();
  if (menus.length > 0) {
    return {
      status: true,
      message: "Menus encontrados",
      body: menus,
    };
  }
  return {
    status: false,
    message: "No se encontraron menus",
    body: [],
  };
};

const obtenerMenusAndSubmenusService = async () => {
  let menus = await menuRepository.getAllMenusAndSubmenus();
  if (!menus) {
    return {
      status: false,
      message: "No se encontraron menus",
      body: [],
    };
  }

  for (let i = 0; i < menus.length; i++) {
    let submenu = await menuRepository.getSubmenusPorId(menus[i].int_menu_id);
    menus[i].submenus = submenu;
  }

  menus = organizarMenus(menus);

  function organizarMenus(menus) {
    // Crear un mapa para almacenar los menús por su ID
    const menuMap = new Map();

    // Crear una función recursiva para organizar los menús
    function organizar(menu) {
      // Verificar si el menú ya está en el mapa
      if (!menuMap.has(menu.int_menu_id)) {
        // Si no está en el mapa, agregarlo
        menuMap.set(menu.int_menu_id, menu);

        // Verificar si el menú tiene submenús
        if (menu.submenus && menu.submenus.length > 0) {
          // Organizar los submenús recursivamente
          menu.submenus = menu.submenus.map((submenu) => organizar(submenu));
        }

        return menu;
      } else {
        // Si el menú ya está en el mapa, devolver null para indicar que debe ser omitido
        return null;
      }
    }

    // Organizar los menús iniciales
    const menusOrganizados = menus
      .map((menu) => organizar(menu))
      .filter((menu) => menu !== null);

    return menusOrganizados;
  }

  return {
    status: true,
    message: "Menus encontrados",
    body: menus,
  };
};
//funcion que ordena los menus y submenus dado un arreglo de menus
const obtenerMenusAndSubmenusService2 = async (menusP) => {
  //console.log("MENUS", menusP.body);

  /**
     * [
  {
    int_permiso_id: 64,
    str_permiso_estado: 'ACTIVO',
    bln_permiso_ver: true,
    bln_permiso_crear: true,
    bln_permiso_editar: true,
    bln_permiso_eliminar: true,
    int_menu_id: 1,
    int_usuario_rol_id: 12,
    dt_fecha_creacion: 2024-01-25T14:52:44.964Z,
    dt_fecha_actualizacion: 2024-01-25T14:52:44.964Z,
    tb_menu: {
      int_menu_id: 1,
      str_menu_nombre: 'Principal',
      str_menu_descripcion: 'Menu general',
      str_menu_icono: 'menu',
      str_menu_path: 'welcome',
      int_menu_padre_id: null,
      str_menu_estado: 'ACTIVO'
    }
  },
  {
    int_permiso_id: 65,
    str_permiso_estado: 'ACTIVO',
    bln_permiso_ver: false,
    bln_permiso_crear: false,
    bln_permiso_editar: false,
    bln_permiso_eliminar: false,
    int_menu_id: 2,
    int_usuario_rol_id: 12,
    dt_fecha_creacion: 2024-01-25T14:52:44.964Z,
    dt_fecha_actualizacion: 2024-01-25T14:52:44.964Z,
    tb_menu: {
      int_menu_id: 2,
      str_menu_nombre: 'Inicio',
      str_menu_descripcion: 'Bienvenida',
      str_menu_icono: 'home',
      str_menu_path: 'welcome',
      int_menu_padre_id: 1,
      str_menu_estado: 'ACTIVO'
    }
  },
  {
    int_permiso_id: 66,
    str_permiso_estado: 'ACTIVO',
    bln_permiso_ver: false,
    bln_permiso_crear: false,
    bln_permiso_editar: false,
    bln_permiso_eliminar: false,
    int_menu_id: 3,
    int_usuario_rol_id: 12,
    dt_fecha_creacion: 2024-01-25T14:52:44.964Z,
    dt_fecha_actualizacion: 2024-01-25T14:52:44.964Z,
    tb_menu: {
      int_menu_id: 3,
      str_menu_nombre: 'Ajustes',
      str_menu_descripcion: 'Seguridad',
      str_menu_icono: 'settings',
      str_menu_path: 'ajustes',
      int_menu_padre_id: 1,
      str_menu_estado: 'ACTIVO'
    }
  },
  {
    int_permiso_id: 67,
    str_permiso_estado: 'ACTIVO',
    bln_permiso_ver: false,
    bln_permiso_crear: false,
    bln_permiso_editar: false,
    bln_permiso_eliminar: false,
    int_menu_id: 4,
    int_usuario_rol_id: 12,
    dt_fecha_creacion: 2024-01-25T14:52:44.964Z,
    dt_fecha_actualizacion: 2024-01-25T14:52:44.964Z,
    tb_menu: {
      int_menu_id: 4,
      str_menu_nombre: 'Roles',
      str_menu_descripcion: 'Roles del usuario',
      str_menu_icono: 'subdirectory_arrow_right',
      str_menu_path: 'ajustes/roles',
      int_menu_padre_id: 3,
      str_menu_estado: 'ACTIVO'
    }
  },
  {
    int_permiso_id: 68,
    str_permiso_estado: 'ACTIVO',
    bln_permiso_ver: false,
    bln_permiso_crear: false,
    bln_permiso_editar: false,
    bln_permiso_eliminar: false,
    int_menu_id: 5,
    int_usuario_rol_id: 12,
    dt_fecha_creacion: 2024-01-25T14:52:44.964Z,
    dt_fecha_actualizacion: 2024-01-25T14:52:44.964Z,
    tb_menu: {
      int_menu_id: 5,
      str_menu_nombre: 'Mi cuenta',
      str_menu_descripcion: 'información del usuario',
      str_menu_icono: 'subdirectory_arrow_right',
      str_menu_path: 'ajustes/cuenta',
      int_menu_padre_id: 3,
      str_menu_estado: 'ACTIVO'
    }
  },
  {
    int_permiso_id: 69,
    str_permiso_estado: 'ACTIVO',
    bln_permiso_ver: false,
    bln_permiso_crear: false,
    bln_permiso_editar: false,
    bln_permiso_eliminar: false,
    int_menu_id: 6,
    int_usuario_rol_id: 12,
    dt_fecha_creacion: 2024-01-25T14:52:44.964Z,
    dt_fecha_actualizacion: 2024-01-25T14:52:44.964Z,
    tb_menu: {
      int_menu_id: 6,
      str_menu_nombre: 'Menus',
      str_menu_descripcion: 'Todos los menus del sistema',
      str_menu_icono: 'subdirectory_arrow_right',
      str_menu_path: 'ajustes/menus',
      int_menu_padre_id: 3,
      str_menu_estado: 'ACTIVO'
    }
  },
  {
    int_permiso_id: 70,
    str_permiso_estado: 'ACTIVO',
    bln_permiso_ver: false,
    bln_permiso_crear: false,
    bln_permiso_editar: false,
    bln_permiso_eliminar: false,
    int_menu_id: 7,
    int_usuario_rol_id: 12,
    dt_fecha_creacion: 2024-01-25T14:52:44.964Z,
    dt_fecha_actualizacion: 2024-01-25T14:52:44.964Z,
    tb_menu: {
      int_menu_id: 7,
      str_menu_nombre: 'Usuarios',
      str_menu_descripcion: 'Todos los usuarios del sistema',
      str_menu_icono: 'subdirectory_arrow_right',
      str_menu_path: 'ajustes/usuarios',
      int_menu_padre_id: 3,
      str_menu_estado: 'ACTIVO'
    }
  },
  {
    int_permiso_id: 71,
    str_permiso_estado: 'ACTIVO',
    bln_permiso_ver: false,
    bln_permiso_crear: false,
    bln_permiso_editar: false,
    bln_permiso_eliminar: false,
    int_menu_id: 10,
    int_usuario_rol_id: 12,
    dt_fecha_creacion: 2024-01-25T14:52:44.964Z,
    dt_fecha_actualizacion: 2024-01-25T14:52:44.964Z,
    tb_menu: {
      int_menu_id: 10,
      str_menu_nombre: 'rr',
      str_menu_descripcion: 'r',
      str_menu_icono: '3d_rotation',
      str_menu_path: 'r',
      int_menu_padre_id: 1,
      str_menu_estado: 'INACTIVO'
    }
  },
  {
    int_permiso_id: 72,
    str_permiso_estado: 'ACTIVO',
    bln_permiso_ver: false,
    bln_permiso_crear: false,
    bln_permiso_editar: false,
    bln_permiso_eliminar: false,
    int_menu_id: 8,
    int_usuario_rol_id: 12,
    dt_fecha_creacion: 2024-01-25T14:52:44.965Z,
    dt_fecha_actualizacion: 2024-01-25T14:52:44.965Z,
    tb_menu: {
      int_menu_id: 8,
      str_menu_nombre: 'Reportes',
      str_menu_descripcion: 'Menu de reportes',
      str_menu_icono: 'assignment_turned_in',
      str_menu_path: 'reportes',
      int_menu_padre_id: 1,
      str_menu_estado: 'ACTIVO'
    }
  },
  {
    int_permiso_id: 73,
    str_permiso_estado: 'ACTIVO',
    bln_permiso_ver: false,
    bln_permiso_crear: false,
    bln_permiso_editar: false,
    bln_permiso_eliminar: false,
    int_menu_id: 9,
    int_usuario_rol_id: 12,
    dt_fecha_creacion: 2024-01-25T14:52:44.965Z,
    dt_fecha_actualizacion: 2024-01-25T14:52:44.965Z,
    tb_menu: {
      int_menu_id: 9,
      str_menu_nombre: 'Incidencias',
      str_menu_descripcion: 'Menu de incidencias',
      str_menu_icono: 'assignment',
      str_menu_path: '/incidencias',
      int_menu_padre_id: 1,
      str_menu_estado: 'ACTIVO'
    }
  }
]
     */

  let menus = [];


  for (let i = 0; i < menusP.body.length; i++) {
    const menu = menusP.body[i];
    const menuNuevo = {
      int_menu_id: menu.int_menu_id,
      str_menu_estado: menu.tb_menu.str_menu_estado,
      int_menu_padre_id: menu.tb_menu.int_menu_padre_id,
      str_menu_nombre: menu.tb_menu.str_menu_nombre,
      str_menu_descripcion: menu.tb_menu.str_menu_descripcion,
      str_menu_path: menu.tb_menu.str_menu_path,
      str_menu_icono: menu.tb_menu.str_menu_icono,
      bln_permiso_ver: menu.bln_permiso_ver,
      bln_permiso_crear: menu.bln_permiso_crear,
      bln_permiso_editar: menu.bln_permiso_editar,
      bln_permiso_eliminar: menu.bln_permiso_eliminar,
      submenus: [],
    };
    //no agregar los menus con estado inactivo
    if (menuNuevo.str_menu_estado == "ACTIVO") {
      menus.push(menuNuevo);
    }
  }



  let menusOrganizados = obtenerMenusConSubmenus(menus);

  function obtenerMenusConSubmenus(menus) {
    // Filtrar los menús que tienen un padre definido
    const menusSinPadre = menus.filter(menu => menu.int_menu_padre_id != null);

    // Filtrar los menús que son padres directos
    const menusPadre = menus.filter(menu => menu.int_menu_padre_id === 1);

    // Mapear los menús padres y asignarles sus submenús correspondientes
    const menusConSubmenus = menusPadre.map(menuPadre => {
        const submenus = menusSinPadre.filter(menu => menuPadre.int_menu_id === menu.int_menu_padre_id);
        return { ...menuPadre, submenus };
    });

    return menusConSubmenus;
}
 

  return {
    status: true,
    message: "Menus encontrados",
    body: menusOrganizados,
  };
};

export default {
  obtenerMenusService,
  obtenerMenuService,
  obtenerSubmenusService,
  crearMenuService,
  actualizarMenuService,
  desactivarMenuService,
  filtrarMenusService,
  buscarMenuService,
  obtenerMenusSinPaginacionService,
  obtenerMenusAndSubmenusService,
  obtenerMenusAndSubmenusService2,
};
