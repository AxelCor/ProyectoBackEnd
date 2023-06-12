import express from "express";
import { productService } from "../DAO/services/products.service.js";

export const routerProducts = express.Router();
routerProducts.use(express.json());
routerProducts.use(express.urlencoded({ extended: true }));
export const productManager = new ProductManager();

//Mostrar todos los productos
routerProducts.get('/', async (req, res) => {
    // let limit = req.query.limit;
    // if (!limit) {
    //     res.status(200).send({ Productos: allProducts });
    // } else if (limit > 0 && limit <= allProducts.length) {
    //     let productsLimit = allProducts.slice(0, limit);
    //     res.status(200).send({ InformaciónSolicitada: productsLimit });
    // } else if (limit > allProducts.length) {
    //     res.status(400).send({ "error": "El límite supera la cantidad de productos." });
    // } else {
    //     res.status(400).send({ "error": "El límite debe ser un número." });
    // }
    try {
        const products = await productService.getAllProducts();
        return res.status(200).json({ result: "succes", msg: "listado de usuarios", data: users })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            status: "error", msg: "something went wrong", data: {}
        })
    }
});


//Buscar producto por ID
routerProducts.get('/:id', async (req, res) => {
    try {
        const { id } = parseInt(req.params);
        const product = await productService.getProductById(id);
        return res.status(200).json({
            status: "success",
            msg: "Product found",
            data: product,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        });
    }
});
//AGREGAR PRODUCTO
routerProducts.post('/', async(req, res) => {
    try {
        let newProduct = req.body;
        const productCreated = await productService.createProduct(newProduct);
        return res.status(201).json({
            status: "success",
            msg: "Product created",
            data: productCreated,
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        });
    }
});
//ACTUALIZAR PRODUCTO
routerProducts.put('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const updateProduct = req.body;
        const productUpdated = await productService.putProduct(id, updateProduct);
        return res.status(201).json({
            status: "success",
            msg: "Product updated",
            data: productUpdated,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        });
    }
});
//BORRAR PRODUCTO
routerProducts.delete('/:pid', async(req, res) => {
    try {
        const { id } = parseInt(req.params);
        const deleted = await productService.deleteProduct(id);
        return res.status(200).json({
            status: "success",
            msg: "Product deleted",
            data: {},
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        });
    }
});
