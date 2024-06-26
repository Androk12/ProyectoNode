import express  from "express"
import indexController from "../controllers/index.controller"


const router = express.Router()

router.get('/', indexController.index)

router.get('/login', indexController.login)

router.get('/logout', indexController.logout)

router.post('/submitlogin', indexController.submitLogin)

router.get('/registro', indexController.registro)

router.get('/listarc', indexController.listarPersonas)

router.get('/productos', indexController.productos)

router.get('/productosmujer', indexController.productos2)

router.get('/productoshom', indexController.productos3)

router.get('/productosnino', indexController.productos4)

router.get('/carrito', indexController.carrito)
router.post('/guardarPersonas', indexController.guardarPersonas)
router.post('/buscarPersona', indexController.buscarPersonas)
router.post('/actualizarPersona',indexController.actualizarPersonas)
router.get('/editar/:id', indexController.editarPersonas)
router.get('/eliminar/:id', indexController.eliminarPersonas)
router.post('/actualizarPersonas/:id', indexController.actualizarPersonas)
router.get('/productosTest', indexController.productosTest)
router.get('/actualizarPersonas/',indexController.actualizarPersonas)



export default router