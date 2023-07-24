import express from 'express'
import handlebars from 'express-handlebars'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { connection as DB } from './dao/db/db.js'
import cookieParser from 'cookie-parser';
import session from 'express-session';

//consts

const __filename = fileURLToPath(import.meta.url);
const app = express()
const PORT = 8080


//configuraciones
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser('secretoCookie'))  //aca le ponemos el secreto

//session

app.use(session({
    secret: 'sessionSecret',
    resave: true,
    saveUninitialized: true
}))


// static

app.use(express.static(join(dirname(__filename), 'public')));

//routes

import { router as homeRouter } from './routes/home.view.js'
import { router as productsRouter } from './routes/dbProducts/dbProducts.routes.js';
import { router as cartsRouter } from './routes/dbProducts/dbCart.routes.js'
import { router as productsRenderRouter } from './routes/products.view.js'
import { router as chatRenderRouter } from './routes/chat/chat.view.js'
import { router as errorRouter } from './routes/error.view.js';
import { router as loginRouter } from './routes/login.view.js';
import { router as registerRouter } from './routes/register.view.js';


app.use('/home', homeRouter)
app.use('/productos', productsRouter)
app.use('/carts', cartsRouter)
app.use('/products', productsRenderRouter)
app.use('/chat', chatRenderRouter)
app.use('/error', errorRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)


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


io.on('connection', async (socket) => {
    try {
        try {
            let gettingChat = await CM.getMessage()
            if (!gettingChat) {
                console.log('error en index getting chat addMessage')
                return false
            }
            io.sockets.emit('mensajes', gettingChat)
        } catch (error) {
            console.log(err)
        }
        socket.on('chat', async (data) => {
            try {
                let chat = await CM.addMessage(data)
                if (!chat) {
                    console.log('error en index chat addMessage')
                    return false
                }
                let gettingChat = await CM.getMessage()
                if (!gettingChat) {
                    console.log('error en index getting chat addMessage')
                    return false
                }
                io.sockets.emit('mensajes', gettingChat)

            } catch (error) {
                console.log(err)
                return false
            }
        })
        try {
            socket.on('deleteMessages', async () => {
                let deleting = await CM.deleteMessages()
                if (!deleting) {
                    console.log('no se elimino el chat')
                    return false
                }
                const gettingChat = await CM.getMessage();
                io.sockets.emit('mensajes', gettingChat);

            })
        } catch (error) {
            console.log(err)
            return false
        }


    } catch (error) {
        console.log(err)
    }
})

//session prueba

// function auth(req,res,next){
// if(!req.session.admin || !req.session.user){
//     res.status(401).send('primero debe loguarse como admin')
//     return false
// }
// next()
// }

// app.get('/log', (req,res) => {
//     let {username, password} = req.query
//     req.session.username = username;
//     req.session.password = password;
//     console.log(req.session.username)
//     console.log(req.session.password)
//     if(username !== 'nacho' || password != 1234){
//         console.log('error al loguear')
//         res.status(400).send('error al loguarse')
//         return false
//     }
//     req.session.user = username;
//     req.session.admin = true
//     res.send('logueado!')

// })

// app.get('/private', auth, (req,res) => {
//     res.send('te logueaste al privado!')
// })

// app.get('/logout', (req,res) => {
//     req.session.destroy(err => {
//         if(err){
//             console.log(err)
//             res.status(500).send('logout erroneo')
//         }
//         res.send('logout ok')
//     })
// })


//IMPORTANTE ESTO, CORRER DESDE SERVER PARA SOCKET!
server.listen(PORT, async () => {
    console.log('corriendo en el puerto: ', PORT)
    await DB.connect()
})