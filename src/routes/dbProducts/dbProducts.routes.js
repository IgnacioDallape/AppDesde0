import { Router } from "express";
import { ProductManager } from "./ProductManager.js";

const newPM = new ProductManager()
const router = new Router()

router.get('/getProducts', async (req, res) => {
    try {
        let {page,  limit } = req.query
        let products = await newPM.getProducts(page,limit)
        if(!products) return false
        res.status(200).send({products: products})
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.post('/addProducts', async(req, res) => {
    try {
        let newProd = req.body
        let adding = await newPM.addProduct(newProd)
        if(!adding) return false
        console.log('Producto añadido!')
        res.status(200).send('Producto añadido con exito: ' + adding)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.delete('/deleteProducts', async(req, res) => {
    try {
        
        console.log('esta todo ok')
        res.status(200).send('esta todo ok')
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})


router.put('/updateProducts', async(req, res) => {
    try {
        


        console.log('esta todo ok')
        res.status(200).send('esta todo ok')
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})


export { router }