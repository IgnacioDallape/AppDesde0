import { Router } from "express";
import { CartManager } from "./CartManager.js";

const newCM = new CartManager()
const router = new Router()

router.get('/addCart', async (req, res) => {
    try {
        let newCart = await newCM.addCart()
        if (!newCart) {
            console.log('error en crear el carrito')
            res.status(400).send('error')
            return false
        }
        res.status(200).send(newCart)
        return newCart
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.get('/getCarts', async (req, res) => {
    try {
        let finding = await newCM.getCarts()
        if (!finding) {
            console.log('error en encontrar los carritos')
            res.status(400).send('error')
            return false
        }
        res.status(200).send(finding)
        return finding
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.get('/getCartsById/:cid', async (req, res) => {
    try {
        let cid = req.params.cid
        let finding = await newCM.getCartsById(cid)
        if (!finding) {
            console.log('error en encontrar el carrito')
            res.status(400).send('error')
            return false
        }
        res.status(200).send(finding)
        return finding
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.post('/:cid/products/:pid', async (req, res) => {
    try {
        let cid = req.params.cid
        let pid = req.params.pid
        let adding = await newCM.addingProductsToCart(cid, pid)
        if (!adding) {
            console.log('error en agregar al carrito')
            res.status(400).send('error')
            return false
        }
        res.status(200).send(adding)
        return adding
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.delete('/deleteAllProducts/:cid', async (req, res) => {
    try {
        let cid = req.params.cid
        let emptyCart = await newCM.deleteAllCartProducts(cid)
        if (!emptyCart) {
            console.log('error en empty cart')
            res.status(400).send('error')
            return false
        }
        res.status(200).send('Carrito vaciado')
        return emptyCart
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.delete('/deleteOneProduct/:cid/products/:pid', async (req, res) => {
    try {
        let cid = req.params.cid
        let pid = req.params.pid
        let emptyCart = await newCM.deleteOneCartProducts(cid, pid)
        if (!emptyCart) {
            console.log('error en empty cart')
            res.status(400).send('error')
            return false
        }
        res.status(200).send(`se eliminó el producto con id ${pid}, del carrito id ${cid}`)
        return emptyCart
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

export { router }