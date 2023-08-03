import { Router } from 'express'
const router = new Router()
import { Users } from '../../dao/models/Users.model.js';
import { UsersManager } from '../dbProducts/UsersManager.js';
const UM = new UsersManager()

router.post('/register', async (req,res) => {
    try {
        let {firstName, lastName, email, password} = req.body;
        let finding = await UM.findUser(email)
        console.log(finding)
        if(!finding){
            res.status(401).send('email ya registrado')
            return false
        }
        let adding = await UM.addUser(firstName, lastName, email, password)
        if(!adding){
            res.status(401).send('error al registrar ususario, asegurese de completar bien los datos')
            return false
        }
        res.redirect('/view/login')
    } catch (error) {
        console.log(error)
        res.redirect('/error')
    }
})

router.post('/login', async (req,res) => {
    try {
        let loginUser = req.body
        console.log(loginUser)
        let login = await UM.loginUser(loginUser, loginUser.password)
        if(!login){
            res.status(401).redirect('/view/login')
            return false
        }
        req.session.name = login.name
        req.session.email = login.email
        req.session.admin = false
        if(req.session.email == 'nacho.dallape@gmail.com'){
            req.session.admin = true
        }
        console.log(req.session)
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