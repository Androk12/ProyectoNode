import express  from "express"
import indexController from "../controllers/index.controller"


const router = express.Router()

router.get('/', indexController.index)

router.get('/login', indexController.login)

router.get('/registro', indexController.registro)

router.get('/listarc', indexController.listarPersonas)

router.get('/productos', indexController.productos)

router.get('/productosmujer', indexController.productos2)

router.get('/productoshom', indexController.productos3)

router.get('/productosnino', indexController.productos4)

router.get('/carrito', indexController.carrito)

export default router