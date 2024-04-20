import vulnerabilidadesRepository from "../../repositories/incidencias/vulnerabilidadesRepository.js";
import fs from "fs";
import parser from "csv-parser";
import multer from "multer";
import { eliminarFichero } from "../utils/eliminarFichero.utils.js";
import archivoUseCase from "./archivoUseCase.js";
import {
  paginacion,
  validarPaginacion,
  obtenerDataQueryPaginacion,
} from "../utils/paginacion.utils.js";

import md5 from "md5";

const importarVulnerabilidadesService = async (path, name) => {
  try {
    // leo el archivo .csv de /uploads
    const vulnerabilidades = [];
    const hashesDB = new Set();
    let vulnerabilidadesDBFormateadas = [];

     const dataArchivo = await archivoUseCase.crearArchivoUseCase(name);
     
     if(!dataArchivo.status){
       return {
         status: false,
         message: dataArchivo.message,
         body: [],
       };
     }

     const int_archivo_id = dataArchivo.body.int_archivo_id;




    const data = await obtenerData(path);

   



    //obtengo las vulnerabilidades de la base de datos para comparar si ya existen
    const vulnerabilidadesDB =
      await vulnerabilidadesRepository.obtenerAllVulnerabilidadesRepository();

    if (vulnerabilidadesDB) {
      //formateo los datos de la base de datos para compararlos con los datos del archivo .csv
      vulnerabilidadesDBFormateadas = formatearData(vulnerabilidadesDB);
      //recorro las vulnerabilidades de la base de datos y guardo los hashes en el set
      vulnerabilidadesDBFormateadas.forEach((vulnerabilidad) => {
        const hash = md5(JSON.stringify(vulnerabilidad));
        hashesDB.add(hash);
      });
    }

    data.forEach((vulnerabilidad) => {
      const vulnerabilidadObj = {
        int_archivo_id: int_archivo_id,
        str_vulnerabilidades_plugin_id: vulnerabilidad["Plugin ID"],
        str_vulnerabilidades_cve: vulnerabilidad["CVE"],
        str_vulnerabilidades_cvss_v2_0_base_score:
          vulnerabilidad["CVSS v2.0 Base Score"],
        str_vulnerabilidades_risk: vulnerabilidad["Risk"],
        str_vulnerabilidades_host: vulnerabilidad["Host"],
        str_vulnerabilidades_protocol: vulnerabilidad["Protocol"],
        str_vulnerabilidades_port: vulnerabilidad["Port"],
        str_vulnerabilidades_name: vulnerabilidad["Name"],
        str_vulnerabilidades_synopsis: vulnerabilidad["Synopsis"],
        str_vulnerabilidades_description: vulnerabilidad["Description"],
        str_vulnerabilidades_solution: vulnerabilidad["Solution"],
        str_vulnerabilidades_see_also: vulnerabilidad["See Also"],
        str_vulnerabilidades_plugin_output: vulnerabilidad["Plugin Output"],
        str_vulnerabilidades_stig_severity: vulnerabilidad["STIG Severity"],
        str_vulnerabilidades_cvss_v3_0_base_score:
          vulnerabilidad["CVSS v3.0 Base Score"],
        str_vulnerabilidades_cvss_v2_0_temporal_score:
          vulnerabilidad["CVSS v2.0 Temporal Score"],
        str_vulnerabilidades_cvss_v3_0_temporal_score:
          vulnerabilidad["CVSS v3.0 Temporal Score"],
        str_vulnerabilidades_risk_factor: vulnerabilidad["Risk Factor"],
        str_vulnerabilidades_bid: vulnerabilidad["BID"],
        str_vulnerabilidades_xref: vulnerabilidad["XREF"],
        str_vulnerabilidades_mskb: vulnerabilidad["MSKB"],
        str_vulnerabilidades_plugin_publication_date:
          vulnerabilidad["Plugin Publication Date"],
        str_vulnerabilidades_plugin_modification_date:
          vulnerabilidad["Plugin Modification Date"],
        str_vulnerabilidades_metasploit: vulnerabilidad["Metasploit"],
        str_vulnerabilidades_core_impact: vulnerabilidad["Core Impact"],
        str_vulnerabilidades_canvas: vulnerabilidad["CANVAS"],
      };
      const hash = md5(JSON.stringify(vulnerabilidad));
      //si el hash no esta en el set, lo agrego al array de vulnerabilidades
      if (!hashesDB.has(hash)) {
        vulnerabilidades.push(vulnerabilidadObj);
        hashesDB.add(hash);
      }
    });

    // elimino el archivo .csv de /uploads
    eliminarFichero(path);

    if(vulnerabilidades.length === 0){
      return {
        status: false,
        message: "No hay nuevas vulnerabilidades para importar",
        body: [],
      };
    }


    // creo los registros en la base de datos
    const vulnerabilidadesCreadas = await vulnerabilidadesRepository.importarVulnerabilidadesRepository(
        vulnerabilidades
    );

    if (vulnerabilidadesCreadas.length > 0) {
      return {
        status: true,
        message: `Vulnerabilidades importadas correctamente:  ${vulnerabilidadesCreadas.length}`,
        body: 1,
        cantidad: vulnerabilidadesCreadas.length,
      };
    } else {
      return {
        status: false,
        message: "Error al importar las vulnerabilidades",
        body: [],
      };
    }

  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: error.message,
      body: [],
    };
  }
};


//funcion para formatear la data que se obtiene de la base de datos
function formatearData(data) {
  /**
   * {"Plugin ID":"10287","CVE":"","CVSS v2.0 Base Score":"","Risk":"None","Host":"172.17.102.1","Protocol":"udp","Port":"0","Name":"Traceroute Information","Synopsis":"It was possible to obtain traceroute information.","Description":"Makes a traceroute to the remote host.","Solution":"n/a","See Also":"","Plugin Output":"For your information, here is the traceroute from 172.17.102.213 to 172.17.102.1 : \n172.17.102.213\n172.17.102.1\n\nHop Count: 1\n","STIG Severity":"","CVSS v3.0 Base Score":"","CVSS v2.0 Temporal Score":"","CVSS v3.0 Temporal Score":"","Risk Factor":"None","BID":"","XREF":"","MSKB":"","Plugin Publication Date":"1999/11/27","Plugin Modification Date":"2020/08/20","Metasploit":"","Core Impact":"","CANVAS":""}
   */
  const vulnerabilidades = [];

  data.forEach((vulnerabilidad) => {
    const vulnerabilidadObj = {
      "Plugin ID": vulnerabilidad.str_vulnerabilidades_plugin_id,
      CVE: vulnerabilidad.str_vulnerabilidades_cve,
      "CVSS v2.0 Base Score":
        vulnerabilidad.str_vulnerabilidades_cvss_v2_0_base_score,
      Risk: vulnerabilidad.str_vulnerabilidades_risk,
      Host: vulnerabilidad.str_vulnerabilidades_host,
      Protocol: vulnerabilidad.str_vulnerabilidades_protocol,
      Port: vulnerabilidad.str_vulnerabilidades_port,
      Name: vulnerabilidad.str_vulnerabilidades_name,
      Synopsis: vulnerabilidad.str_vulnerabilidades_synopsis,
      Description: vulnerabilidad.str_vulnerabilidades_description,
      Solution: vulnerabilidad.str_vulnerabilidades_solution,
      "See Also": vulnerabilidad.str_vulnerabilidades_see_also,
      "Plugin Output": vulnerabilidad.str_vulnerabilidades_plugin_output,
      "STIG Severity": vulnerabilidad.str_vulnerabilidades_stig_severity,
      "CVSS v3.0 Base Score":
        vulnerabilidad.str_vulnerabilidades_cvss_v3_0_base_score,
      "CVSS v2.0 Temporal Score":
        vulnerabilidad.str_vulnerabilidades_cvss_v2_0_temporal_score,
      "CVSS v3.0 Temporal Score":
        vulnerabilidad.str_vulnerabilidades_cvss_v3_0_temporal_score,
      "Risk Factor": vulnerabilidad.str_vulnerabilidades_risk_factor,
      BID: vulnerabilidad.str_vulnerabilidades_bid,
      XREF: vulnerabilidad.str_vulnerabilidades_xref,
      MSKB: vulnerabilidad.str_vulnerabilidades_mskb,
      "Plugin Publication Date":
        vulnerabilidad.str_vulnerabilidades_plugin_publication_date,
      "Plugin Modification Date":
        vulnerabilidad.str_vulnerabilidades_plugin_modification_date,
      Metasploit: vulnerabilidad.str_vulnerabilidades_metasploit,
      "Core Impact": vulnerabilidad.str_vulnerabilidades_core_impact,
      CANVAS: vulnerabilidad.str_vulnerabilidades_canvas,
    };
    vulnerabilidades.push(vulnerabilidadObj);
  });
  return vulnerabilidades;
}

//funcion para obtener la data del archivo .csv
function obtenerData(path) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(path)
      .pipe(parser())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

const obtenerVulnerabilidadesPaginationService = async (query) => {
  const validacion = validarPaginacion(query);
  if (validacion != true) {
    return validacion;
  }
  //obtener los datos de la query
  const { page, limit } = obtenerDataQueryPaginacion(query);

  const vulnerabilidades =
    await vulnerabilidadesRepository.obtenerVulnerabilidadesPaginationRepository(
      page,
      limit
    );
  const totalVulnerabilidades =
    await vulnerabilidadesRepository.obtenerTotalVulnerabilidadesRepository();

  if (vulnerabilidades.length > 0) {
    const metadata = paginacion(page, limit, totalVulnerabilidades);

    return {
      status: true,
      message: "Vulnerabilidades encontradas",
      body: vulnerabilidades,
      metadata: {
        pagination: metadata,
      },
    };
  }
  return {
    status: false,
    message: "No se encontraron vulnerabilidades",
    body: [],
  };
};

const buscarVulnerabilidadesService = async (texto, page) => {
  //convierto page en numero
  page = parseInt(page);
  const { vulnerabilidades , totalVulnerabilidades } = await vulnerabilidadesRepository.buscarIncidenciasRepository(texto, page);
  if(vulnerabilidades.length > 0){
    const metadata = paginacion(page, 10, totalVulnerabilidades);
    return {
      status: true,
      message: "Vulnerabilidades encontradas",
      body: vulnerabilidades,
      metadata: {
        pagination: metadata,
      },
    };
  }else{
    return {
      status: false,
      message: "No se encontraron vulnerabilidades",
      body: [],
      metadata: {
        pagination:{
          previousPage: 0,
          currentPage: 1,
          nextPage: null,
          total: vulnerabilidades.length,
          limit: vulnerabilidades.length,
        }
      },
    }
  }

};

const filtrarVulnerabilidadesService = async (texto, page) => {
  //convierto page en numero
  page = parseInt(page);
  const { vulnerabilidades, totalVulnerabilidades } = await vulnerabilidadesRepository.filtrarVulnerabilidadesRepository(texto, page);
  if(vulnerabilidades.length > 0){
    const metadata = paginacion(page, 10, totalVulnerabilidades);
    return {
      status: true,
      message: "Vulnerabilidades encontradas",
      body: vulnerabilidades,
      metadata: {
        pagination: metadata,
      },
    };
  }else{
    return {
      status: false,
      message: "No se encontraron vulnerabilidades",
      body: [],
      metadata: {
        pagination:{
          previousPage: 0,
          currentPage: 1,
          nextPage: null,
          total: vulnerabilidades.length,
          limit: vulnerabilidades.length,
        }
      },
    }
  }
};



export default {
  importarVulnerabilidadesService,
  obtenerVulnerabilidadesPaginationService,
  buscarVulnerabilidadesService,
  filtrarVulnerabilidadesService,
};
