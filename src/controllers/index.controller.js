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

    //controlador traer datos sql vista
    
    indexController.listarPersonas = async (req, res)=>{
        try {
            const con = await getConnection()
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
