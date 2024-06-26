import express from 'express'
import { engine } from 'express-handlebars'
import path from 'path'
import bodyParser from 'body-parser'
import config from './config'
import router from './routes/index.routes'
const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('public', path.join(__dirname, 'public'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))

app.engine('.hbs', engine({
    defaultLayout : 'main',
    extname : '.hbs'
}))

app.set('view engine', '.hbs')
app.use(router)
app.listen(config.port, ()=> {

    console.log("Estamos corriendo el servidor a traves del puerto 8081")

})


