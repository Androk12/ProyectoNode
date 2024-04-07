import express from 'express'
import { engine } from 'express-handlebars'
import path from 'path'
import bodyParser from 'body-parser'
import config from './config'
const app = express()

app.set('views', path.dirname(__dirname, 'views'))
app.set('public', path.dirname(__dirname, 'public'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))

app.engine('.hbs', engine({
    defaultLayout : 'main',
    extname : 'hbs'
}))

app.set('view engine', '.hbs')

app.listen(config.port, ()=> {

    console.log("Estamos corriendo el servidor a traves del puerto 8081")

})


