import express from "express";
import { productService } from "../DAO/services/products.service.js";
import { ProductManager } from '../DAO/managers/ProductManager.js';
export const routerProducts = express.Router();
routerProducts.use(express.json());
routerProducts.use(express.urlencoded({ extended: true }));
export const productManager = new ProductManager();

//Mostrar todos los productos
routerProducts.get('/', async (req, res) => {
    try {
        let { limit, page, query, sort } = req.query;
        const products = await productService.getProducts(
            limit,
            page,
            query,
            sort
        );
        return res.status(200).json({
            status: "Success",
            msg: "Mostrando todos los productos encontrados con exito",
            data: products,
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            msg: "something went wrong",
            data: { error },
        });
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
routerProducts.post('/', async (req, res) => {
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
routerProducts.put('/:id', async (req, res) => {
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
routerProducts.delete('/:pid', async (req, res) => {
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
