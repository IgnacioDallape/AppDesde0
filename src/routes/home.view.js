import { Router } from 'express'
const router = new Router()


router.get('/', (req,res) => {
    try{
        res.render('home', {})
    } catch (err) {
        console.log(err)
        res.render(err)
    }
    
})

export {router}