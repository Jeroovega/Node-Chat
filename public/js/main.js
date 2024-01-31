console.log(document.querySelector('title').textContent);

// Creando un cliente
const socket = io.connect()

// Esta funcion trae mensajes desde el servidor.
socket.on('mensajes', data => {
    console.log(data)
    render(data)
})

// ----------------------------------------
// Renderizado de los mensajes recibidos
function render(data) {
    let html = data.map(msj => {
        return (
            `
            <div>
                <strong>${msj.usuario}</strong>
                <em>${msj.mensaje}</em>
            </div>
            `
        )
    }).join(' ')
    document.querySelector('.mensajes').innerHTML = html
}

// ----------------------------------------
// Gestion de carga de texto de los chats

// Enviar mensajes hacia el servidor
function agregarMensaje(e) {
    e.preventDefault();

    const usuario = document.querySelector('#lbl-usuario').value;
    const mensaje = document.querySelector('#lbl-mensaje').value;

    const obj = {
        usuario: usuario,
        mensaje: mensaje
    }

    socket.emit('nuevo-comentario', obj)
}

const btn = document.querySelector('#btn');
btn.addEventListener('click', agregarMensaje)

