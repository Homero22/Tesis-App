import app from "./app.js";
import { configVariables } from "./infraestructura/configuracion/variablesGlobales.js";
import { sequelize } from "./infraestructura/database/postgres.js";
import { Rol } from "./infraestructura/models/esquemaSeguridad/rol.model.js";
import { Usuario } from "./infraestructura/models/esquemaSeguridad/usuario.model.js";
import { UsuarioRol } from "./infraestructura/models/esquemaSeguridad/usuarioRoles.model.js";
import { Permiso } from "./infraestructura/models/esquemaSeguridad/permisos.model.js";
import { PermisoRol } from "./infraestructura/models/esquemaSeguridad/permisoRol.model.js";


async function main(port) {
    try{
        //Conectarse a la base de datos
        await sequelize.authenticate();
        console.log("Conectado a la base de datos");
        //Sincronizar la base de datos
        await sequelize.sync({force: false,
        logging:console.log});
        console.log("Base de datos sincronizada");
        //Iniciar el servidor
        app.listen(port, () => {
            console.log(`Servidor escuchando en http://localhost:${port}`);
        });


    }catch(error){
        console.log(error);
    }
}
main(configVariables.port);