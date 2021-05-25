const { comprobarJWT } = require("../helpers/jwt");
const { usuarioConectado, usuarioDesconectado, getUsuarios, grabarMensaje } = require("../controllers/sockets");
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
            // console.log('cliente conectado: ', uid);
            // TODO: Usuario Conectado
            await usuarioConectado(uid);

            // TODO: Unir al usuario a una sala de socket.io
            socket.join(uid);

            // TODO: Validar el JWT
            // TODO: Token no válido: Desconectar
            // TODO: Usuario activo mediante UID

            // TODO: Emitir todos los usuarios conectados
            this.io.emit('lista-usuarios', await getUsuarios());

            // TODO: Socket join, UID

            // TODO: Escuchar cuando cliente manda mensaje 
            socket.on('mensaje-personal', async (payload) => {
                const mensaje = await grabarMensaje(payload);
                this.io.to(payload.para).emit('mensaje-personal', mensaje);
                this.io.to(payload.de).emit('mensaje-personal', mensaje);
                console.log(mensaje);
            });

            // TODO: Disconnect
            // Marcar en la BD que el usuario se desconecto

            // TODO: Emitir todos los usuarios conectados
            socket.on('disconnect', async() => {
                // console.log('cliente desconectado: ', uid);
                await usuarioDesconectado(uid);
                this.io.emit('lista-usuarios', await getUsuarios());
            });

        });
    }


}


module.exports = Sockets;