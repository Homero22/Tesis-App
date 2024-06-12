import {EventEmitter} from 'events';
export const eventEmitter = new EventEmitter();

export const enviarNotificacion = (req, res) => {
    try{
        const {tipo, mensaje} = req.body;
        eventEmitter.emit('notificacion', {tipo, mensaje,idUsuario});
        res.json({status: true, message: "Notificación enviada"});
    }catch(error){
        res.status(500).json({status: false, message: "Error en el servidor" + error});
    }
}
export const suscribir = (req, res) => {
    try{
        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        const sendNotificacion = (data) => {
            res.write(`data: ${JSON.stringify(data)}\n\n`);
        };
 
        eventEmitter.on('notificacion', sendNotificacion);

        //Eliminar el evento
        req.on('close', () => {
            eventEmitter.off('notificacion', sendNotificacion);
        });

    }catch(error){
        res.status(500).json({status: false, message: "Error en el servidor" + error});
    }
}

export default {
    enviarNotificacion,
    suscribir
}