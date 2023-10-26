import authUseCase from "../../aplicacion/auth/validarUsuarioUseCase.js";

const validarAuth = async (req, res) => {
  try {
    //Recibe los datos del Cas

    const { xmlDatosCas } = req.body;

    //enviar los datos al caso de uso
    const respuesta = await  authUseCase.validarUsuarioDeXml(xmlDatosCas);
    console.log("Respuesta: ", respuesta)

    if (respuesta === false) {
      return res.json({
        status: false,
        message: "Usuario no autorizado",
        body: [],
      });
    } else {
      return res.json({
        status: "success",
        message: "Usuario autorizado",
        datosCas:{
          casUser:respuesta,
        }
      });
    }
  } catch {
    return res.status(500).json({
      status: false,
      message: "Error en el servidor",
      body: [],
    });
  }
};

export default {
  validarAuth,
};
