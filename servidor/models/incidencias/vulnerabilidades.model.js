import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/postgres.js';
export const Vulnerabilidades = sequelize.define(
    "tb_vulnerabilidades",
    {
        int_vulnerabilidades_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        
        },
        str_vulnerabilidades_plugin_id:{
            type: DataTypes.STRING(50),
        },
        str_vulnerabilidades_cve:{
            type: DataTypes.STRING(100),
        },
        str_vulnerabilidades_cvss_v2_0_base_score:{
            type: DataTypes.STRING(100),
        },
        str_vulnerabilidades_risk:{
            type: DataTypes.STRING(50),
        },
        str_vulnerabilidades_host:{
            type: DataTypes.STRING(50),
        },
        str_vulnerabilidades_protocol:{
            type: DataTypes.STRING(50),
        },
        str_vulnerabilidades_port:{
            type: DataTypes.STRING(50),
        },
        str_vulnerabilidades_name:{
            type: DataTypes.TEXT,
        },
        str_vulnerabilidades_synopsis:{
            type: DataTypes.TEXT,
        },
        str_vulnerabilidades_description:{
            type: DataTypes.TEXT,
        },
        str_vulnerabilidades_solution:{
            type: DataTypes.TEXT,
        },
        str_vulnerabilidades_see_also:{
            type: DataTypes.TEXT,
        },
        str_vulnerabilidades_plugin_output:{
            type: DataTypes.TEXT,
        },
        str_vulnerabilidades_stig_severity:{
            type: DataTypes.STRING(50),
        },
        str_vulnerabilidades_cvss_v3_0_base_score:{
            type: DataTypes.STRING(100),
        },
        str_vulnerabilidades_cvss_v2_0_temporal_score:{
            type: DataTypes.STRING(100),
        },
        str_vulnerabilidades_cvss_v3_0_temporal_score:{
            type: DataTypes.STRING(100),
        },
        str_vulnerabilidades_risk_factor:{
            type: DataTypes.STRING(50),
        },
        str_vulnerabilidades_bid:{
            type: DataTypes.TEXT,
        },
        str_vulnerabilidades_xref:{
            type: DataTypes.TEXT,
        },
        str_vulnerabilidades_mskb:{
            type: DataTypes.TEXT,
        },
        str_vulnerabilidades_plugin_publication_date:{
            type: DataTypes.STRING(50),
        },
        str_vulnerabilidades_plugin_modification_date:{
            type: DataTypes.STRING(50),
        },
        str_vulnerabilidades_metasploit:{
            type: DataTypes.TEXT,
        },
        str_vulnerabilidades_core_impact:{
            type: DataTypes.TEXT,
        },
        str_vulnerabilidades_canvas:{
            type: DataTypes.TEXT,
        },
        dt_fecha_creacion:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        dt_fecha_actualizacion:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        schema: "incidencias",
        timestamps: false,
        freezeTableName: true,
    }
);
