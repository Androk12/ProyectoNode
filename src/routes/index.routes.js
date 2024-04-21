import express  from "express"
import indexController from "../controllers/index.controller"


const router = express.Router()

router.get('/', indexController.index)

router.get('/login', indexController.login)

router.get('/registro', indexController.registro)

router.get('/listarc', indexController.listarPersonas)

export default router