import { getConnection } from "../models/connection"

const indexController = {}

    const LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');

    indexController.index = (req, res) => {
        const logged = isLogged();
        const nombreCliente = (logged) ? localStorage.getItem('tienda_cliente') : null;
        res.render('index', {
            title :'Página Principal',
            data: {
                cliente: {
                    nombre: (nombreCliente) ? nombreCliente : null
                },
                noLogged: !logged,
                isLogged: logged,
            }
        })

    }

    indexController.login = async (req, res) => {
        res.render('login', {
            title :'Página Login',
        })

    }

    function isLogged() {
        const isLogged = localStorage.getItem("isLogged");
        return (isLogged != null);
    }

    indexController.logout = async (req, res) => {
        logout();
        res.redirect("/")
    }

    function logout() {
        localStorage.clear();
    }

    indexController.submitLogin = async (req, res) => {
        // const loginService = require("./../services/loginService");
        const cliente = req.body;
    
        const isLogged = true;
        // if (loginService.logggedMe(cliente)) {
        if (isLogged) {
            // setea el nombre en la sesión del navegador
            localStorage.setItem('tienda_cliente', cliente.email);
            localStorage.setItem("isLogged", true);
            res.redirect('/');
        }
    }

    indexController.registro = (req, res) => {
        
        res.render('registro', {
            title :'Página registro'
        })

    }

    indexController.crearCuenta = (req, res) => {
        const nuevoCliente = req.body;
        const created = crearNuevoCliente(nuevoCliente);

        if (created) {
            localStorage.setItem('tienda_cliente', nuevoCliente.email);
            localStorage.setItem("isLogged", true);
            res.redirect("/");
        } else {
            // mensaje de que no pudo crearse la cuenta
        }
    }

    function crearNuevoCliente(nuevoCliente) {
        //enviarselo a la base de datos
        return true;
    }

    //controlador traer datos sql vista
    
    indexController.listarPersonas = async (req, res)=>{
        try {
            const con = await getConnection()
            const resultado = await con.request().query('select * from Clientes')
            res.render('listarc',{
                title : 'Pg Clientes',
                data : resultado.recordset
            })
                
        } catch (error) {
            console.log(error)
        }
    }

    indexController.guardarPersonas = async (req, res)=>{
        try {
            const con = await getConnection()
            const {id, nombre, correo, contrasena} = req.body
            await con.request().query("insert into Clientes(id, nombre, correo, contrasena) values('"+ id +"','"+ nombre +"', '" + correo +"', '"+ contrasena +"')")
            
            res.redirect('listarc')
                
        } catch (error) {
            console.log(error)
        }
    }

    indexController.buscarPersonas = async (req, res)=>{
        try {
            const con = await getConnection()
            const{txtBuscar} = req.body
            const resultado = await con.request().query("select * from Clientes where nombre = '" + txtBuscar + "' or correo = '" + txtBuscar +"'")
            res.render('listarc',{
                title : 'Pg Clientes',
                data : resultado.recordset
            })
                
        } catch (error) {
            console.log(error)
        }
    }
// revisar pasar de string a int

    indexController.eliminarPersonas = async (req, res)=>{
        try {
            const con = await getConnection()
            const { id } = req.params
            
            const resultado = await con.request().query("delete from Clientes where id = '" + id +"'")

            res.redirect('/listarc')  
        } catch (error) {
            console.log(error)
        }
    }

    indexController.editarPersonas = async (req, res)=>{
        try {
            const con = await getConnection()
            const{id} = req.params
            const resultado = await con.request().query("select * from Clientes where nombre = '" + id + "'")
            res.render('editarPersona',{
                title : 'Editar Clientes',
                data : resultado.recordset[0]
            })
                
        } catch (error) {
            console.log(error)
        }
    }

    indexController.actualizarPersonas = async (req, res)=>{
        try {
            const con = await getConnection()
            const {cc} = req.params
            const {id, nombre, correo, contrasena} = req.body
            await con.request().query("insert into Clientes(id, nombre, correo, contrasena) values('"+ id +"','"+ nombre +"', '" + correo +"', '"+ contrasena +"')")
            
            res.redirect('/listarc')
                
        } catch (error) {
            console.log(error)
        }
    }


    export default indexController
