import { getConnection } from "../models/connection"

const indexController = {}

    indexController.index = (req, res) => {
        
        res.render('index', {
            title :'Página Principal'
        })

    }

    indexController.login = (req, res) => {
        
        res.render('login', {
            title :'Página Login'
        })

    }

    indexController.registro = (req, res) => {
        
        res.render('registro', {
            title :'Página registro'
        })

    }

    indexController.carrito = (req, res) => {
        
        res.render('carrito', {
            title :'pedidos'
        })

    }

    indexController.productos = (req, res) => {
        
        res.render('productos', {
            title :'Explorar productos'
        })

    }

    indexController.productos2 = (req, res) => {
        
        res.render('productosmujer', {
            title :'Mujer'
        })

    }
    indexController.productos3 = (req, res) => {
        
        res.render('productoshom', {
            title :'Hombre'
        })

    }

    indexController.productos4 = (req, res) => {
        
        res.render('productosnino', {
            title :'ninos'
        })

    }

    //controlador traer datos sql vista
    
    indexController.listarPersonas = async (req, res)=>{
        try {
            const con = await getConnection()
            console.log("conexion exitosa(db)")
            const resultado = await con.request().query('select * from tbl_Clientes')
            res.render('listarc',{
                title : 'Pg Clientes',
                data : resultado.recordset
            })
                
        } catch (error) {
            console.log(error)
        }
    }

    

    export default indexController
