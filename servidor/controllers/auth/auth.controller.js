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
      //extraer el token
      const token = respuesta.token;

      //Agrego a la cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      return res.json({
        status: "success",
        message: "Usuario autorizado",
        datosCas:{
          casUser:respuesta.usuario,
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
