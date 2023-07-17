import { Cart } from "../../dao/models/Cart.model.js"
import { ProductManager } from "./ProductManager.js"
const newPM = new ProductManager()

class CartManager{

    async addCart(){
        try {
            let createCart = await Cart.create({})
            console.log(createCart)
            if(!createCart){
                console.log('createCart false')
                return false
            }
            return createCart
        } catch (error) {
            console.log('error en addCarts ', error)
            return false
        }
    }

    async getCarts(){
        try {
            let findingCarts = await Cart.find({})
            if(!findingCarts){
                console.log('findingCarts false')
                return false
            }
            return findingCarts
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async getCartsById(cid){
        try {
            let findingCarts = await Cart.findOne({_id : cid})
            if(!findingCarts){
                console.log('findingCarts false')
                return false
            }
            return findingCarts
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async addingProductsToCart(cid, pid){
        try {
            let cart = await this.getCartsById(cid)
            if(!cart){
                console.log('cart false en addingProductsToCart')
                return false
            }
            let prod = await newPM.getProductsById(pid)
            if(!prod){
                console.log('prod false en addingProductsToCart')
                return false
            }
            cart.products.push(prod)
            let updatingCart = await Cart.updateOne({_id : cid}, cart)
            if(!updatingCart){
                console.log('error al actualizar el carrito')
                return false
            }
            return cart

        } catch (error) {
            console.log(error)
            return false
        }
    }

    async deleteAllCartProducts(cid){
        try {
            let findingCarts = await Cart.findOne({_id : cid})
            if(!findingCarts){
                console.log('findingCarts false en deleteAllCartProducts')
                return false
            }
            findingCarts.products = []
            let emptyCart = await Cart.updateOne({_id : cid}, findingCarts)
            return emptyCart
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async deleteOneCartProducts(cid,pid){
        try {
            let findingCarts = await this.getCartsById(cid)
            if(!findingCarts){
                console.log('findingCarts false en deleteAllCartProducts')
                return false
            }
            let findingProd = await newPM.getProductsById(pid)
            if(!findingProd){
                console.log('error al encontrar el producto')
                return false
            }
            let updatingCart = await Cart.updateOne(
                { _id: cid },
                { $pull: { products: { product: pid } } }
            );
    
            if (!updatingCart) {
                console.log('Error al actualizar el carrito');
                return false;
            }
            
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

export { CartManager }