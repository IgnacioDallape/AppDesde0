import { Router } from 'express'
const router = new Router()
import { Users } from '../../dao/models/Users.model.js';
import { UsersManager } from '../dbProducts/UsersManager.js';
import passport from 'passport';
const UM = new UsersManager()

router.post('/register', passport.authenticate('register', { failureRedirect: '/auth/failedRegister' }), async (req, res) => {
    try {
        console.log('usuario registrado')
        res.redirect('/view/login')
    } catch (error) {
        console.log(error)
        res.redirect('/error')
    }
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/view/login' }), async (req, res) => {
    try {
        console.log('usuario logueado')
        res.redirect('/view/profile')
        return
    } catch (error) {
        console.log(error)
        return
    }
})

router.get('/failedRegister', (req, res) => {
    try {
        res.send('error al registrar el usuario')
    } catch (error) {
        console.log(error)
        res.redirect('/error')
    }
})


router.get('/users', (req, res) => {
    try {
        res.send(users)
    } catch (error) {
        console.log(error)
        res.redirect('/error')
    }
})

router.get('/logout', (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.log(err)
                res.status(500).send('no se pudo eliminar la session')
            }
            console.log('logout exitoso')
            res.redirect('/view/login')
        })
    } catch (error) {
        console.log(error)
        res.redirect('/error')
    }
})


router.get('/github', passport.authenticate('github', { scope: ['user:email'], session: false }))

router.get('/github/callback', passport.authenticate('github', { scope: ['user:email'], session: false }), (req, res) => {
    req.session.name = req.user.displayName
    req.session.passport = true
    res.redirect('/view/profile')
})

router.get('/google',
    passport.authenticate('google', { scope: ['profile'], session: false }));

router.get('/google/callback',
    passport.authenticate('google', { scope: ['profile'], session: false }),
    function (req, res) {
        req.session.name = req.user.displayName
        req.session.passport = true
        res.redirect('/view/profile')
    });

export { router }