import app from "./app.js";
import { configVariables } from "./configuracion/variablesGlobales.js";
import { sequelize } from "./database/postgres.js";
import { crearUsuarioAdministrador } from "./aplicacion/usuarios/adminUserCase.js";

async function main(port) {
    try{
        //Conectarse a la base de datos
        await sequelize.authenticate();

        //Sincronizar la base de datos
        await sequelize.sync({force: false,
        logging: false});

        //Iniciar el servidor
        app.listen(port, () => {
            console.log(`Servidor escuchando en http://localhost:${port}`);
        });

        //Crear un usuario administrador
        crearUsuarioAdministrador();


    }catch(error){
        console.log(error);
    }
}
main(configVariables.port);

