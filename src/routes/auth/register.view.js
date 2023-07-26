import { Router } from 'express'
const router = new Router()


router.get('/register', (req,res) => {
    try{
        res.render('register', {})
    } catch (err) {
        console.log(err)
        res.render(err)
    }
    
})

export {router}