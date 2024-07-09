import { Vulnerabilidades } from "../../models/incidencias/vulnerabilidades.model.js";
import { Op } from "sequelize";


const importarVulnerabilidadesRepository = async (data) => {
  try {
    const dataCreate = await Vulnerabilidades.bulkCreate(data);
    return dataCreate;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
const obtenerAllVulnerabilidadesRepository = async () => {
  try {
    const vulnerabilidades = await Vulnerabilidades.findAll({raw:true});
    return vulnerabilidades;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
const obtenerVulnerabilidadesPaginationRepository = async (page, cantidad) => {
  try {
    const skip = (page - 1) * cantidad;
    const vulnerabilidades = await Vulnerabilidades.findAll({
        offset: skip,
        limit: cantidad,
        order:[
            ['dt_fecha_actualizacion','DESC']
        ]
    });
    return vulnerabilidades;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
const obtenerTotalVulnerabilidadesRepository = async () => {
  try {
    const totalVulnerabilidades = await Vulnerabilidades.count();
    return totalVulnerabilidades;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const buscarIncidenciasRepository = async (texto, page) => {
  try{
    const skip = (page - 1) * 10;
    const vulnerabilidades = await Vulnerabilidades.findAll({
      where:{
        [Op.or]:[
          {
            str_vulnerabilidades_plugin_id:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_cve:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_cvss_v2_0_base_score:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_risk:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_host:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_protocol:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_port:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_name:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_synopsis:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_description:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_solution:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_see_also:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_plugin_output:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_stig_severity:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_cvss_v3_0_base_score:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_cvss_v2_0_temporal_score:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_cvss_v3_0_temporal_score:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_risk_factor:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_bid:{
              [Op.iLike]:`%${texto}%`
            }
          },

        ]
      },
      order:[
        ['dt_fecha_actualizacion','DESC']
      ],
      offset: skip,
      limit: 10
    });

    const totalVulnerabilidades = await Vulnerabilidades.count({
      where:{
        [Op.or]:[
          {
            str_vulnerabilidades_plugin_id:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_cve:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_cvss_v2_0_base_score:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_risk:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_host:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_protocol:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_port:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_name:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_synopsis:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_description:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_solution:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_see_also:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_plugin_output:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_stig_severity:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_cvss_v3_0_base_score:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_cvss_v2_0_temporal_score:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_cvss_v3_0_temporal_score:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_risk_factor:{
              [Op.iLike]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_bid:{
              [Op.iLike]:`%${texto}%`
            }
          },

        ]
      }
    });

    const data = {
      vulnerabilidades,
      totalVulnerabilidades
    };
    return data;


  }catch(error){
    console.log(error);
    return error.message;
  }
}

const filtrarVulnerabilidadesRepository = async (texto, page) => {
  try{


    const skip = (page - 1) * 10;

    const vulnerabilidades = await Vulnerabilidades.findAll({
      where:{
        [Op.or]:[
          {
            str_vulnerabilidades_protocol:{
              [Op.like]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_risk_factor:{
              [Op.like]:`%${texto}%`
            }
          }
        ]
      },
      order:[
        ['dt_fecha_actualizacion','DESC']
      ],
      offset: skip,
      limit: 10
    });

    const totalVulnerabilidades = await Vulnerabilidades.count({
      where:{
        [Op.or]:[
          {
            str_vulnerabilidades_protocol:{
              [Op.like]:`%${texto}%`
            }
          },
          {
            str_vulnerabilidades_risk_factor:{
              [Op.like]:`%${texto}%`
            }
          }
        ]
      }
    });

    const data = {
      vulnerabilidades,
      totalVulnerabilidades
    };
    return data;

  }catch(error){
    console.log(error);
    return error.message;
  }
}

export const obtenerVulnerabilidadByIdRepository = async (id) => {
  try {
    const vulnerabilidad = await Vulnerabilidades.findByPk(id);
    return vulnerabilidad;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

export default {
  importarVulnerabilidadesRepository,
  obtenerVulnerabilidadesPaginationRepository,
  obtenerTotalVulnerabilidadesRepository,
  obtenerAllVulnerabilidadesRepository,
  buscarIncidenciasRepository,
  filtrarVulnerabilidadesRepository
};
