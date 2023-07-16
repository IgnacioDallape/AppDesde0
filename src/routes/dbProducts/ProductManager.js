import { Products } from "../../dao/models/Product.model.js";
import paginate from 'mongoose-paginate-v2';

class ProductManager {

    async addProduct(prod) {
        try {
            let newProd = new Products(prod)
            let prodCreated = await newProd.save()
            console.log(prodCreated)
            if (!prodCreated) {
                console.log('no se creo el prod')
                return false
            }
            return prodCreated
        } catch (error) {
            console.log(error, 'error al crear el prod en addProducts')
            return false
        }
    }

    async getProducts(page, limit) {
        try {
            let allProd = await Products.paginate({}, { page: page || 1, limit: limit || 3 })
            console.log(allProd)
            if (!allProd) {
                console.log('error en get prod paginate')
                return false
            }
            return allProd
        } catch (error) {
            console.log(error, 'error al obtener prod en getProducts')
            return false
        }
    }

    async deleteProduct(pid) {
        try {
            let prodToDelete = await Products.findOne({ _id: pid })
            if (!prodToDelete) {
                console.log(`no existe el producto con id${pid}`)
                return false
            }
            let deleting = await Products.deleteOne(prodToDelete)
            if (!deleting) {
                console.log('error al eliminar el producto')
                return false
            }
            console.log(`El producto con id ${pid} ha sido eliminado`);
            return deleting
        } catch (error) {
            console.log(error, 'error al eliminar el prod en deleteProduct')
            return false
        }
    }

    async updateProduct(pid, newProd){
        try {
            let prodToUpdate = await Products.findOne({_id: pid})
            if(!prodToUpdate) {
                console.log(`no existe el producto con id${pid}`)
                return false
            }
            let updatedProduct = {...prodToUpdate, ...newProd}
            return updatedProduct
        } catch (error) {
            console.log(error, 'error al actualizar el prod en updateProduct')
            return false
        }
    }


}

export { ProductManager }