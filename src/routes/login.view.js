import { Router } from 'express'
const router = new Router()


router.get('/', (req,res) => {
    try{
        let { username, password } = req.query
        req.session.username = username
        req.session.password = password
        console.log(req.session)

        res.render('login', {
        })
    } catch (err) {
        console.log(err)
        res.render(err)
    }
    
})

export {router}