import vulnerabilidadesRepository from "../../repositories/incidencias/vulnerabilidadesRepository.js";
import fs from "fs";
import parser from "csv-parser";
import multer from "multer";
import { eliminarFichero } from "../utils/eliminarFichero.utils.js";
import {
  paginacion,
  validarPaginacion,
  obtenerDataQueryPaginacion,
} from "../utils/paginacion.utils.js";

const importarVulnerabilidadesService = async (path) => {
  try {
    // leo el archivo .csv de /uploads
    const vulnerabilidades = [];

    const data = await obtenerData(path);
    // recorro el array de objetos y creo un objeto con los campos que necesito

    data.forEach((vulnerabilidad) => {
      const vulnerabilidadObj = {
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
      vulnerabilidades.push(vulnerabilidadObj);
    });
    // elimino el archivo .csv de /uploads
    eliminarFichero(path);
    // creo los registros en la base de datos
    const vulnerabilidadesCreadas =
      await vulnerabilidadesRepository.importarVulnerabilidadesRepository(
        vulnerabilidades
      );
    if (vulnerabilidadesCreadas.length > 0) {
      return {
        status: true,
        message: "Vulnerabilidades importadas correctamente",
        body: 1,
      };
    } else {
      return {
        status: false,
        message: "Error al importar las vulnerabilidades",
        body: [],
      };
    }
  } catch (error) {
    return {
      status: false,
      message: error.message,
      body: [],
    };
  }
};

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

export default {
  importarVulnerabilidadesService,
  obtenerVulnerabilidadesPaginationService,
};
