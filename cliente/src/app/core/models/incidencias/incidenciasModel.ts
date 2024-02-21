import { DataMetadata } from "../metadata";

export interface IncidenciasModel {
  status: boolean;
  message: string;
  body: IncidenciasModelBody[];
  metadata: DataMetadata;
}

export interface IncidenciasModelBody {

  int_vulnerabilidades_id: number;
  str_vulnerabilidades_plugin_id: string;
  str_vulnerabilidades_cve: string;
  str_vulnerabilidades_cvss_v2_0_base_score: string;
  str_vulnerabilidades_risk: string;
  str_vulnerabilidades_host: string;
  str_vulnerabilidades_protocol: string;
  str_vulnerabilidades_port: string;
  str_vulnerabilidades_name: string;
  str_vulnerabilidades_synopsis: string;
  str_vulnerabilidades_description: string;
  str_vulnerabilidades_solution: string;
  str_vulnerabilidades_see_also: string;
  str_vulnerabilidades_plugin_output: string;
  str_vulnerabilidades_stig_severity: string;
  str_vulnerabilidades_cvss_v3_0_base_score: string;
  str_vulnerabilidades_cvss_v2_0_temporal_score: string;
  str_vulnerabilidades_cvss_v3_0_temporal_score: string;
  str_vulnerabilidades_risk_factor: string;
  str_vulnerabilidades_bid: string;
  str_vulnerabilidades_xref: string;
  str_vulnerabilidades_mskb: string;
  str_vulnerabilidades_plugin_publication_date: string;
  str_vulnerabilidades_plugin_modification_date: string;
  str_vulnerabilidades_metasploit: string;
  str_vulnerabilidades_core_impact: string;
  str_vulnerabilidades_canvas: string;
  dt_fecha_creacion: string;
  dt_fecha_actualizacion: string;

}
