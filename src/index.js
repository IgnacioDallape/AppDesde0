import express from 'express'
import handlebars from 'express-handlebars'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { connection as DB } from './dao/db/db.js'

const __filename = fileURLToPath(import.meta.url);
const app = express()
const PORT = 8080


//configuraciones
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// static

app.use(express.static(join(dirname(__filename), 'public')));

//routes

import { router as homeRouter } from './routes/home.view.js'
import { router as productsRouter } from './routes/dbProducts/dbProducts.routes.js';
import { router as cartsRouter } from './routes/dbProducts/dbCart.routes.js'
import {router as productsRenderRouter} from './routes/products.view.js'
import {router as chatRenderRouter} from './routes/chat/chat.view.js'

app.use('/home', homeRouter)
app.use('/products', productsRouter)
app.use('/carts', cartsRouter)
app.use('/productos', productsRenderRouter)
app.use('/chat', chatRenderRouter)

//handlebars

app.engine('handlebars', handlebars.engine())
app.set('views', join(dirname(__filename), 'views'));
app.set('view engine', 'handlebars')


//socket

import http from 'http'
const server = http.createServer(app)
import { Server } from 'socket.io';
const io = new Server(server)

import { ChatManager } from './routes/chat/ChatManager.js';
const CM = new ChatManager()

let messages = []

io.on('connection', async (socket) => {
    try {
        socket.on('chat', async (data) => {
            try {
                let chat = await CM.addMessage(data)
                if(!chat){
                    console.log('error en index chat addMessage')
                    return false
                }
                let gettingChat = await CM.getMessage()
                if(!gettingChat){
                    console.log('error en index getting chat addMessage')
                    return false
                }
                io.sockets.emit('mensajes', gettingChat)

            } catch (error) {
                console.log(err)
                return false
            }
            

        })
    } catch (error) {
        console.log(err)
    }
})
                //IMPORTANTE ESTO, CORRER DESDE SERVER PARA SOCKET!
server.listen(PORT, () => {
    console.log('corriendo en el puerto: ', PORT)
    DB.connect()
})