
const socket = io()


socket.on('bienvenida', (data) => {
    console.log(data)
})

socket.on('mensajes', (data) => {
    const chat = data.map( e => {
        return(
            `
            <div> 
                <span>
                <strong> nombre: ${e.username} </strong>
                <p> nombre: ${e.message} </p>
                <span>    
            </div>
            
            `
        )
    }).join('')

    document.getElementById('chat').innerHTML = chat
})

//falta adaptar la barra lateral

function deleteAllMessages(){
    socket.emit('deleteMessages')
}

document.getElementById('deleteMessagesBtn').addEventListener('click', deleteAllMessages)


const oneMessage = () => {
    let allMessage = {
        username: document.getElementById('name').value,
        message: document.getElementById('message').value,
    }
    
    socket.emit('chat', allMessage)
    return false
}