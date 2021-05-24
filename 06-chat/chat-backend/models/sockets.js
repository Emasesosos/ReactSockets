const { comprobarJWT } = require("../helpers/jwt");
const { usuarioConectado, usuarioDesconectado, getUsuarios } = require("../controllers/sockets");
class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async( socket ) => {

            const [ valido, uid ] = comprobarJWT(socket.handshake.query['x-token']);
            if(!valido) {
                console.log('socket no identificado');
                return socket.disconnect();
            }
            console.log('cliente conectado: ', uid);
            await usuarioConectado(uid);
            // TODO: Validar el JWT
            // TODO: Token no válido: Desconectar
            // TODO: Usuario activo mediante UID

            // TODO: Emitir todos los usuarios conectados
            this.io.emit('lista-usuarios', await getUsuarios());

            // TODO: Socket join, UID
            // TODO: Escuchar cuando cliente manda mensaje 
            // mensaje-personal
            // TODO: Disconnect
            // Marcar en la BD que el usuario se desconecto
            // TODO: Emitir todos los usuarios conectados
            socket.on('disconnect', async() => {
                console.log('cliente desconectado: ', uid);
                await usuarioDesconectado(uid);
            });

        });
    }


}


module.exports = Sockets;