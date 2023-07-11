import express from "express";
import { CartManager } from '../DAO/managers/CartManager.js';
import { cartService } from "../DAO/services/carts.service.js";

export const routerCarts = express.Router();
routerCarts.use(express.json());
routerCarts.use(express.urlencoded({ extended: true }));
const cartManager = new CartManager();

//AGREGAR NUEVO CARRITO
routerCarts.post('/', async (req, res) => {
    try {
        let newCart = req.body;
        const cartCreated = await cartService.createCart(newCart);
        return res.status(201).json({
            status: "success",
            msg: "Cart created",
            data: cartCreated,
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

//BUSCAR CARRITO POR ID
routerCarts.get('/:id', async (req, res) => {
    try {
        const { id } = parseInt(req.params);
        const cart = await cartService.getCartById(id);
        return res.status(200).json({
            status: "success",
            msg: "Cart found",
            data: cart,
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

//AGREGAR PRODUCTOS AL CARRITO
routerCarts.post('/:cId/product/:pId', async (req, res) => {
    try {
        const { cId } = parseInt(req.params.cId);
        const { pId } = parseInt(req.params.pId);
        let newCart = req.body;
        const addProductInCart = await cartService.addProductCart(cId, pId);
        return res.status(201).json({
            status: "success",
            msg: "Cart updated",
            data: cartUpdated,
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
})

//ELIMINA UN PRODUCTO DEL CARRITO
routerCarts.delete('/:cId/product/:pId', async (req, res) => {

    try {
        const cId = req.params.id_cart;
        const pId = req.params.id_product;
        await cartService.removeProductFromCart(cId, pId);
        let cartUpdated = await cartService.getCartById(cId);

        return res.status(201).json({
            status: "Success",
            msg: "Productos eliminado del carrito de compras",
            data: cartUpdated,
        });
    } catch (error) {
        return res.status(404).json({
            status: "error",
            msg: "cart or the product could not be found",
            data: { error },
        });
    }
})

//ACTUALIZAR CARRITO
routerCarts.put('/:id', async (req, res) => {
    try {
        const { id } = parseInt(req.params);
        const { body } = req.body;
        const cartUpdated = await cartService.putCart(id, body);
        return res.status(200).json({
            status: "success",
            msg: "Cart found",
            data: cartUpdated,
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

//ACTUALIZAR CANTIDAD DE UN PRODUCTO EN CARRITO
routerCarts.put('/:cId/product/:pId', async (req, res) => {
    try {
        const { cId } = parseInt(req.params);
        const { pId } = parseInt(req.params);
        const { body } = req.body;
        const cartUpdated = await cartService.updateQuantityProduct(cId, pId, body);
        return res.status(200).json({
            status: "success",
            msg: "Cart found",
            data: cartUpdated,
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

//ELIMINA TODOS LOS PRODUCTOS DEL CARRITO
routerCarts.delete('/:cId', async (req, res) => {

    try {
        const { cId } = parseInt(req.params);
        await cartService.clearCart(cId);
        return res.status(201).json({
            status: "Success",
            msg: "Productos eliminados del carrito de compras",
            data: cartUpdated,
        });
    } catch (error) {
        return res.status(404).json({
            status: "error",
            msg: "cart or the product could not be found",
            data: { error },
        });
    }
})
