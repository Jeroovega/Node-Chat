import express from 'express';
import 'dotenv/config';
import path from 'node:path'

import { Server } from "socket.io";
import { createServer } from 'node:http'; // API http de Node


// ! Configuration
const PORT = process.env.PORT || 8080;
const app = express();

// Inyecto express dentro del servidor de Node
const server = createServer(app);
// En el new server le paso el servidor de Node
const io = new Server(server);


// ! Middleware
// Para mostrar archivo estático como el index.html
app.use(express.static(path.join('public')))

const mensajes = [
    { usuario: 'Jeronimo', mensaje: 'Hola, bienvenido' },
    { usuario: 'Manuel', mensaje: 'Todo bien?' },
    { usuario: 'Marcos', mensaje: 'Cómo están chicos?' }
]
// ! Espacio para trabajar con SOCKET.IO

io.on('connection', (socket) => { // escucha el evento de cuanto alguien se conecte
    //console.log(socket)
    console.log('Un cliente se ha conectado: ' + socket.id)

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:' + socket.id)
    })

    // Recibiendo información del cliente (formulario)
    socket.on('nuevo-comentario', data => {
        console.log(data)
        mensajes.push(data)
        io.sockets.emit('mensajes', mensajes)
    })

    // Emitir un mensaje desde el servidor hacia el cliente
    socket.emit('mensajes', mensajes)
})
// el socket.id no es único. 

// ! Fin espacio para trabajar con SOCKET.IO

server.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});