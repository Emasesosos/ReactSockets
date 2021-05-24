const { comprobarJWT } = require("../helpers/jwt");
const { usuarioConectado, usuarioDesconectado } = require("../controllers/sockets");
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

            // // Escuchar evento: mensaje-to-server
            // socket.on('mensaje-to-server', ( data ) => {
            //     console.log( data );
                
            //     this.io.emit('mensaje-from-server', data );
            // });
            
        
        });
    }


}


module.exports = Sockets;