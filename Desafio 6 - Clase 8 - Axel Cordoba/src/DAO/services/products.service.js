//@ts-check
import { productModel } from "../models/product.model.js";



class ProductService {
    validatePostProduct(newProduct) {
        const { title, description, code, price, stock, category, thumbnail } = newProduct;
        if (!title || !description || !code || !price || !stock || !category || !thumbnail) {
            console.log(
                "validation error: Please complete all fields."
            );
            throw "Validation Error";
        }
    }
    validatePutProduct(id, updateProduct) {
        const { title, description, code, price, stock, category, thumbnail } = updateProduct;
        if (!id || !title || !description || !code || !price || !stock || !category || !thumbnail) {
            console.log(
                "validation error: please complete ID, firstName, lastname and email."
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

    async getAllProducts() {
        let products = await productModel.find({});
        return products;
    }

    async getProductById(id) {
        this.validateId(id);
        let product = await productModel.findOne({ _id: id });
        return product;
    }

    async createProduct(newProduct) {
        this.validatePostProduct(newProduct);
        const productCreated = await productModel.create(newProduct);
        return productCreated;
    }
    async putProduct(id, updateProduct) {
        this.validatePutProduct(id, updateProduct);
        const productUpdated = await productModel.updateOne(
            { _id: id },
            { updateProduct }
        );
        return productUpdated;
    }
    async deleteProduct(id) {
        this.validateId(id);
        const deleted = await productModel.deleteOne({ _id: id })
        return deleted;
    }
}

export const productService = new ProductService();