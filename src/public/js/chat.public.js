
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


const oneMessage = () => {
    let allMessage = {
        username: document.getElementById('name').value,
        message: document.getElementById('message').value,
    }
    
    socket.emit('chat', allMessage)
    return false
}