import { Router } from 'express'
import { ProductManager } from './dbProducts/ProductManager.js'
const router = new Router()
const PM = new ProductManager()


router.get('/', async (req,res) => {
    try{
        let a = req.session
        console.log(a)
        let {page, limit} = req.query
        let products = await PM.getProducts(page,limit)
        if(!products){
            console.log('error en products.view')
            res.status(500).send('error obteniendo los productos')
            return false
        }
        
        let productData = products.docs.map( e => {
            return { name: e.name, price: e.price}
        })
        
        const { docs, ...rest } = products //crea la variable rest y le almacena los datos de docs, menos los docs y gracias a eso puedo hacer el for de abajo para hacer el paginate
    

        let links = []
        for(let i = 1; i < rest.totalPages + 1; i++){
            links.push({label:i, href: '/products/?page=' + i})
        }
        res.status(200).render('products', { productData, pagination: links, paginationData: rest });
    } catch (err) {
        console.log(err)
        res.render(err)
    }
    
})

export {router}