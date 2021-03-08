class Sockets {

    constructor(io) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => {

            // Escuchar evento
            socket.on('mensaje-to-server', (data) => {
                console.log(data);
                // socket.emit('mensaje-from-server', data); // Particular
                this.io.emit('mensaje-from-server', data); // Todos
            });

        });
    }

}

module.exports = Sockets;