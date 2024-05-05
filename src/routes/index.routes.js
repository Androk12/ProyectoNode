import express  from "express"
import indexController from "../controllers/index.controller"


const router = express.Router()

router.get('/', indexController.index)

router.get('/login', indexController.login)

router.get('/logout', indexController.logout)

router.post('/submitlogin', indexController.submitLogin)

router.get('/registro', indexController.registro)

router.get('/listarc', indexController.listarPersonas)

router.post('/guardarPersonas', indexController.guardarPersonas)

export default router