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

    export default indexController
