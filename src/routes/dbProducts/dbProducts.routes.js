import { Router } from "express";
import { ProductManager } from "./ProductManager.js";

const newPM = new ProductManager()
const router = new Router()

router.get('/getProducts', async (req, res) => {
    try {
        let {page,  limit } = req.query
        let products = await newPM.getProducts(page,limit)
        if(!products){
            res.status(500).send('error')
            return false
        }
        res.status(200).send({products: products})
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.get('/getProducts/:pid', async (req, res) => {
    try {
        let pid = req.params.pid
        let products = await newPM.getProductsById(pid)
        if(!products){
            res.status(500).send('error')
            return false
        }
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
        console.log(adding)
        if(!adding){
            res.status(500).send('error')
            return false
        }
        console.log('Producto añadido!')
        res.status(200).send('Producto añadido con exito: ' + adding)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.delete('/deleteProducts/:pid', async (req, res) => {
    try {
        let pid = req.params.pid
        let deleting = await newPM.deleteProduct(pid)
        if(!deleting){
            res.status(500).send('error')
            return false
        }
        console.log(`producto con id ${pid}, eliminado exitosamente`)
        res.status(200).send(deleting)
        return deleting
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})


router.put('/updateProducts/:pid', async(req, res) => {
    try {
        let pid = req.params.pid
        let bodyMod = req.body
        let newProd = await newPM.updateProduct(pid, bodyMod)
        if(!newProd){
            res.status(500).send('error')
            return false
        }
        console.log(`producto con id ${pid}, modificado exitosamente`)
        res.status(200).send(newProd)
        return newProd
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})


export { router }