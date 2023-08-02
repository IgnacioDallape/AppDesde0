import express from 'express'
import handlebars from 'express-handlebars'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { connection as DB } from './dao/db/db.js'
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';



//consts

const __filename = fileURLToPath(import.meta.url);
const app = express()
const PORT = 8080


//configuraciones
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser('secretoCookie'))  //aca le ponemos el secreto

//session

import dotenv from 'dotenv'
dotenv.config()
let password = process.env.PASSWORD

app.use(session({
    store: MongoStore.create({  //esto me va a crear una coleccion llamada sessions, sin que yo le diga nada
        mongoUrl: `mongodb+srv://appdesde0:${password}@appdesde0.h4mpajf.mongodb.net/appdesde0`,
        mongoOptions: {useNewUrlParser:true, useUnifiedTopology: true},
        ttl: 15
    }),
    secret: 'sessionSecret',
    resave: true,
    saveUninitialized: true
}))

app.get('/createSession', (req,res) => {
    req.session.name = 'nacho'
    res.send('session creada')
})
app.get('/getSession', (req,res) => {
    res.send(req.session)
})
app.get('/destroySession', (req,res) => {
    req.session.destroy(err => {
        if(err) {
            res.send(err)
            return false
        }
        res.send('sesion eliminada')
    })
})


// static

app.use(express.static(join(dirname(__filename), 'public')));

//routes

import { router as homeRouter } from './routes/home.view.js'
import { router as productsRouter } from './routes/dbProducts/dbProducts.routes.js';
import { router as cartsRouter } from './routes/dbProducts/dbCart.routes.js'
import { router as productsRenderRouter } from './routes/products.view.js'
import { router as chatRenderRouter } from './routes/chat/chat.view.js'
import { router as errorRouter } from './routes/error.view.js';
import { router as loginRouter } from './routes/auth/login.view.js';
import { router as registerRouter } from './routes/auth/register.view.js';
import { router as profileRouter } from './routes/profile.views.js';
import { router as authRouter } from './routes/auth/auth.routes.js';

app.use('/home', homeRouter)
app.use('/productos', productsRouter)
app.use('/carts', cartsRouter)
app.use('/products', productsRenderRouter)
app.use('/chat', chatRenderRouter)
app.use('/error', errorRouter)
app.use('/view', loginRouter)
app.use('/view', registerRouter)
app.use('/view', profileRouter)
app.use('/auth', authRouter)


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

//IMPORTANTE ESTO, CORRER DESDE SERVER PARA SOCKET! USAR SERVER
server.listen(PORT, async () => {
    console.log('corriendo en el puerto: ', PORT)
    await DB.connect()
})