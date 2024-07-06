import { Ticket } from "../../models/incidencias/ticket.model.js";
import { Vulnerabilidades } from "../../models/incidencias/vulnerabilidades.model.js";
import sequelize from "sequelize";
import { Op } from "sequelize";

/**
 * data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Incidencias Registradas',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: 'origin'
      },
      {
        label: 'Incidencias Resueltas',
        data: [28, 48, 40, 19, 86, 27, 90],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: 'origin'
      }
    ]
  };
 */
//debo obtener la data dado un año y obtner la cantidad de incidencias registradas y resueltas(estado finalizado)

const obtenerIncidenciasPorMesRepository = async (anio) => {
    try {
      console.log(anio);
      //obtengo las vulnerabilidades entre el rango de fechas segun el año ingresado
      let fechaInicio = new Date(anio, 1, 1);
      let fechaFin = new Date(anio, 12, 31);



      const data = await Vulnerabilidades.findAll({
        where: {
          dt_fecha_creacion: {
            [Op.between]: [fechaInicio, fechaFin]
          }
        },
        raw: true
      });

      //obtengo la cantidad de incidencias registradas por mes
      let incidenciasRegistradas = [];
      for (let i = 1; i <= 12; i++) {
        let incidencias = data.filter((vulnerabilidad) => {
          return new Date(vulnerabilidad.dt_fecha_creacion).getMonth() + 1 === i;
        });
        incidenciasRegistradas.push(incidencias.length);
      }

      //obtengo la cantidad de incidencias resueltas por mes viendo que el estado sea finalizado en la tabla de tickets en el rango de fechas
     
      //where int_estado_id = 3 y fecha entre fechaInicio y fechaFin
      const dataTickets = await Ticket.findAll({
        where: {
          int_estado_id: 3,
          dt_fecha_creacion: {
            [Op.between]: [fechaInicio, fechaFin]
          }
        },
        raw: true
      });

      console.log(dataTickets.length);



      let incidenciasResueltas = [];
      for (let i = 1; i <= 12; i++) {
        let incidencias = dataTickets.filter((ticket) => {
          return new Date(ticket.dt_fecha_creacion).getMonth() + 1 === i;
        });
        incidenciasResueltas.push(incidencias.length);
      }

      //armo el objeto data

      let dataFinal = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [
          {
            label: 'Incidencias Registradas',
            data: incidenciasRegistradas,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: 'origin'
          },
          {
            label: 'Incidencias Resueltas',
            data: incidenciasResueltas,
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            fill: 'origin'
          }
        ]
      };


      return dataFinal;


    } catch (error) {
        console.log(error);
        return error.message;
    }
};

export default {
    obtenerIncidenciasPorMesRepository
};

