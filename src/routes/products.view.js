import { Router } from 'express'
import { ProductManager } from './dbProducts/ProductManager.js'
const router = new Router()
const PM = new ProductManager()


router.get('/', (req,res) => {
    try{
        let a = req.session
        console.log(a)
        res.render('products', {})
    } catch (err) {
        console.log(err)
        res.render(err)
    }
    
})

export {router}