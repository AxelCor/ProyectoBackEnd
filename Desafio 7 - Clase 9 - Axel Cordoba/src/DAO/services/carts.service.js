//@ts-check
import { cartModel } from "../models/cart.model.js";
import { productService } from "./products.service.js";



class CartService {
    validatePutCart(id, updateCart) {
        const { title, description, code, price, stock, category, thumbnail } = updateCart;
        if (!id || !title || !description || !code || !price || !stock || !category || !thumbnail) {
            console.log(
                "validation error: please complete all fields."
            );
            throw "Validation Error";
        }
    }
    validateId(id) {
        if (!id) {
            console.log(
                "validation error: please complete ID."
            );
            throw "Validation Error";
        }
    }
    validateCidPid(cId, pId) {
        if (!cId || !pId) {
            console.log(
                "validation error: please complete ID."
            );
            throw "Validation Error";
        }
    }

    async getAllCarts() {
        let carts = await cartModel.find({});
        return carts;
    }

    async getCartById(id) {
        this.validateId(id);
        let cart = await cartModel.findOne({ _id: id }).populate("products.product");
        return cart;
    }

    async createCart(newCart) {
        const cartCreated = await cartModel.create(newCart);
        return cartCreated;
    }
    async addProductCart(cId, pId) {
        try {
            this.validateCidPid(cId, pId);
            // Buscar el carrito por su ID
            let cart = await this.getCartById(cId);
            // Si el carrito no existe, crear uno nuevo con el producto
            if (!cart) {
                let newCart = await cartModel.create({
                    products: [{ id: pId, quantity: 1 }]
                });
                return newCart;
            }

            // Buscar el producto en el carrito
            const productIndex = cart.products.findIndex((p) => p.id === pId);
            // Si el producto no está en el carrito, agregarlo
            if (productIndex === -1) {
                cart.products.push({ id: pId, quantity: 1 });
            } else {
                // Si el producto está en el carrito, incrementar su cantidad en 1
                cart.products[productIndex].quantity += 1;
            }
            return cart;
        } catch (error) {
            throw new Error(error);
        }
    }

    async removeProductFromCart(cId, pId) {

        // Buscar el carrito en la base de datos
        const cart = await cartModel.findOne({ _id: cId });
        if (cart) {
            // Verificar si el producto existe en el carrito
            const productIndex = cart.products.findIndex(
                (product) => product.product.toString() === pId
            );
            if (productIndex !== -1) {
                // El producto existe en el carrito, eliminarlo
                cart.products.splice(productIndex, 1);
            }
            // Guardar los cambios en el carrito en la base de datos
            await cart.save();
        }
    }
    async putCart(id, updateCart) {
        this.validatePutCart(id, updateCart);
        const cartUpdated = await cartModel.updateOne(
            { _id: id },
            { updateCart }
        );
        return cartUpdated;
    }
    async updateQuantityProduct(cId, pId, quantity) {
        // Buscar el carrito en la base de datos
        const cart = await cartModel.findOne({ _id: cId });

        if (cart) {
            // Buscar el producto en el carrito
            const product = cart.products.find(
                (product) => product.product.toString() === pId
            );
            if (product) {
                // Actualizar la cantidad del producto en el carrito
                product.quantity = quantity;
            }
            // Guardar los cambios en el carrito en la base de datos
            await cart.save();
            return cart;
        }

    }

    async clearCart(id) {

        let cart = await cartModel.findOne({ _id: id });
        if (!cart) {
            throw new Error("No se encontró el carrito con el ID proporcionado");
        }
        cart.products = [];
        cart = await cart.save();
        return cart;
    }
}

// async deleteCart(id) {
//     this.validateId(id);
//     const deleted = await cartModel.deleteOne({ _id: id })
//     return deleted;
// }


export const cartService = new CartService();