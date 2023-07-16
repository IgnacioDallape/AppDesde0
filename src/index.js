import express from 'express'
import handlebars from 'express-handlebars'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { connection as DB} from './dao/db/db.js'

const __filename = fileURLToPath(import.meta.url);
const app = express()
const PORT = 8080


//configuraciones
app.use(express.json())
app.use(express.urlencoded( {extended: true} ))


// static

app.use(express.static(join(dirname(__filename), 'public')));



//routes
import {router as homeRouter} from './routes/home.view.js'
import { router as productsRouter } from './routes/dbProducts/dbProducts.routes.js';

app.use('/home', homeRouter)
app.use('/products', productsRouter)

//handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', join(dirname(__filename), 'views'));
app.set('view engine', 'handlebars')


app.listen(PORT, () => {
    console.log('corriendo en el puerto ', PORT)
    DB.connect()
})