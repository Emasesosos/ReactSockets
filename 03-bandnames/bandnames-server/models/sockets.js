const BandList = require('./band-list');

class Sockets {

    constructor(io) {

        this.io = io;
        this.bandList = new BandList();
        this.socketEvents();

    }

    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => {
            console.log('Cliente Conectado');
            // Emitir al cliente conectado, todas la bandas actuales
            socket.emit('current-bands', this.bandList.getBands());
            // Votar por la banda
            socket.on('votar-banda', (id) => {
                this.bandList.increaseVotes(id);
                this.io.socket.emit('current-bands', this.bandList.getBands());
            });

        });

    }


}


module.exports = Sockets;