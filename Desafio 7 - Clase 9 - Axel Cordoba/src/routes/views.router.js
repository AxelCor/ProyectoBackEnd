import express from "express";
import { ProductManager } from '../DAO/managers/ProductManager.js';
export const routerViews = express.Router();
const productManager = new ProductManager();
import { cartService } from "../DAO/services/carts.service.js";
import { productService } from "../DAO/services/products.service.js";


//Renderizamos con la plantilla Handlebars
routerViews.get('/', (req, res) => {
    const allProducts = productManager.getProducts();
    res.render('home', {
        allProducts,
        style: 'home.css',
    });
})

//SOLICITAMOS LOS PRODUCTOS EN TIEMPO REAL
routerViews.get('/realtimeproducts', (req, res) => {
    const allProducts = productManager.getProducts();
    res.render('realTimeProducts', {
        allProducts,
        style: 'home.css',
    });
});

//TODOS LOS PRODUCTOS
routerViews.get('/products', async (req, res) => {
    try {
        let { limit, page, query, sort } = req.query;
        const products = await productService.getProducts(
            limit,
            page,
            query,
            sort
        );
        // const products = await productService.getAllProducts();
        return res.status(200).render('productsList', {
            title: "Lista de productos",

            products: products.docs.map((product) => ({
                id: product._id.toString(),
                title: product.title,
                description: product.description,
                category: product.category,
                price: product.price,
                stock: product.stock,
            })),
            pagingCounter: products.pagingCounter,
            page: products.page,
            totalPages: products.totalPages,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
        });
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            status: "error", msg: "something went wrong", data: {}
        })
    }
});
//PRODUCTOS DEL CARRITO
routerViews.get('/carts/:id', async (req, res) => {
    try {
        const { id } = parseInt(req.params);
        const cart = await cartService.getCartById(id);
        const theCart = cart.products.map((prod) => prod.toJSON());

        return res.status(200).render("cartsList", {
            title: "Detalle del carrito",
            cart: theCart,
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            msg: "something went wrongggg",
            data: { error },
        });
    }
});

// routerViews.post('/realtimeproducts', (req, res) => {
//     const allProducts = productManager.getProducts();
//     res.render('realTimeProducts', {
//         allProducts,
//         style: 'home.css',
//     });
// })

//OBJETO DE PRUEBA
// let testUser = {
//     nombre: "Axel",
//     last_name: "Cordoba",
//     role: "admin"
// }
// let food = [
//     { name: "Hamburguesa", price: "150" },
//     { name: "Ensalada", price: "120" },
//     { name: "Pizza", price: "200" }
// ]