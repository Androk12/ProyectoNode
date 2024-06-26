import { getConnection } from "../models/connection"

const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch');

const indexController = {};

indexController.index = (req, res) => {
    const logged = isLogged();
    const nombreCliente = (logged && localStorage.getItem('tienda_cliente')) ? localStorage.getItem('tienda_cliente') : null;
    res.render('index', {
        title: 'Página Principal',
        data: {
            cliente: {
                nombre: (nombreCliente) ? nombreCliente : null
            },
            noLogged: !logged,
            isLogged: logged,
        }
    });
};

indexController.login = async (req, res) => {
    res.render('login', {
        title: 'Página Login',
    });
};

function isLogged() {
    const isLogged = localStorage.getItem("isLogged");
    return (isLogged != null);
}

indexController.logout = async (req, res) => {
    logout();
    res.redirect("/");
};

function logout() {
    localStorage.clear();
}

module.exports = indexController;


    indexController.submitLogin = async (req, res) => {
        // const loginService = require("./../services/loginService");
        const dataLogin = req.body;
    
        const dataFilled = dataLogin && dataLogin.correo != '' && dataLogin.contrasena != '';
        const loggedPromise = loggedMe(dataLogin);
        
        loggedPromise.then((isLogged) => {
            if (dataFilled && isLogged) {
                // setea el nombre en la sesión del navegador
                localStorage.setItem('tienda_cliente', dataLogin.email);
                localStorage.setItem("isLogged", true);
                res.redirect('/');
            } else {
                res.render('login', { messageIncorrectLogin: "Usuario o contraseña incorrecto" });
            }
        });
    }

    async function loggedMe(dataLogin) {
        const con = await getConnection()
        const isLoggedData = await con.request().query("select count(*) from Clientes c where c.correo = '" + dataLogin.email + "' and c.contrasena = '" + dataLogin.password + "'");
        return (parseInt(isLoggedData.recordsets[0][0]['']) > 0)
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
    indexController.productosTest = (req, res) => {
        
        res.render('productosTest', {
            title :'Productos'
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
                data : resultado.recordset,
            })
                
        } catch (error) {
            console.log(error)
        }
    }
// 

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
            const resultado = await con.request().query("select * from Clientes where id = '" + id + "'")
            res.render('editarPersonas',{
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
            const {id} = req.params
            const { nombre, correo, contrasena} = req.body
            await con.request().query("update Clientes set nombre = '" + nombre +"', correo =  '"+ correo +"', contrasena = '"+ contrasena + "' WHERE id = '" + id + "'")
            
            res.redirect('/listarc')
                
        } catch (error) {
            console.log(error)
        }
    }

    

    export default indexController
