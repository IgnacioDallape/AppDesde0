import { Router } from 'express'
const router = new Router()

let users = []

router.post('/register', (req,res) => {
    try {
        let newUser = req.body;
        let finding = users.find( e => e.email == newUser.email)
        if(finding){
            console.log('usuario ya registrado')
            res.send('usuario ya registrado')
            return false
        }        
        newUser.id = Math.random()
        users.push(newUser)
        res.redirect('/view/login')
    } catch (error) {
        console.log(error)
        res.redirect('/error')
    }
})

router.post('/login', (req,res) => {
    try {
        let loginUser = req.body
        let finding = users.find(e => {
            return loginUser.email == e.email  && loginUser.password ==  e.password
        })
        if(!finding){
            console.log('usuario no existente')
            res.redirect('/view/login')
            return false
        }
        req.session.user = loginUser.email 
        req.session.password = loginUser.password
        req.session.admin = false
        if(loginUser.email == 'nachodallape2@gmail.com'){
            req.session.admin = true
        }
        res.redirect('/view/profile')
    } catch (error) {
        console.log(error)
        res.redirect('/error')
    }
})


router.get('/users', (req,res) => {
    try {
        res.send(users)
    } catch (error) {
        console.log(error)
        res.redirect('/error')
    }
})

router.get('/logout', (req,res) => {
    try {
        req.session.destroy( (err) => {
            if(err){
                console.log(err)
                res.status(500).send('no se pudo eliminar la session')
            }
        res.redirect('/view/login')
        })
    } catch (error) {
        console.log(error)
        res.redirect('/error')
    }
})


export {router}