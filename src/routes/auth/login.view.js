import { Router } from 'express'
const router = new Router()


router.get('/login', (req,res) => {
    try{
        let { username, password } = req.query
        req.session.username = username
        req.session.password = password
        // console.log(req.session.password)

        res.render('login', {nombre: req.session.username})
    } catch (err) {
        console.log(err)
        res.render(err)
    }
    
})

export {router}