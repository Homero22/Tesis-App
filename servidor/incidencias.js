import app from "./app.js";
import { configVariables } from "./configuracion/variablesGlobales.js";
import { sequelize } from "./database/postgres.js";
import { configuracionInicial } from "./aplicacion/configuracion/configuracionInicialUseCase.js";
import https from "https";
import fs from "fs";



async function main(port) {
  try {
    //Conectarse a la base de datos
    await sequelize.authenticate();

    //Sincronizar la base de datos
    await sequelize.sync({ force: false, logging: false });

    if (configVariables.env == "production") {
      //Iniciar el servidor
      app.listen(port, () => {
        console.log(
          `Servidor produccion escuchando en el puerto ${port}`
        );
      });
    } else {
      console.log("Desarrollo");
      const options = {
        cert: fs.readFileSync(
          "../cliente/src/assets/Certificados/STAR_espoch_edu_ec.crt"
        ),
        key: fs.readFileSync(
          "../cliente/src/assets/Certificados/STAR_espoch_edu_ec.key"
        ),
      };
      https.createServer(options, app).listen(port, () => {
        console.log(
          `Servidor desarrollo escuchando en https://localhost:${port}`  
        );
      }); 
    }

    //Configuración inicial
    configuracionInicial();
  } catch (error) {
    console.log(error);
  }
}
main(configVariables.port);
