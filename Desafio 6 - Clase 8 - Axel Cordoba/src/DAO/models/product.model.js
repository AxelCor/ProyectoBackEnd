//@ts-check
import { Schema, model } from "mongoose";

export const productModel = model(
    "products",
    new Schema({
        title: { type: String, required: true, max: 100 },
        description: { type: String, required: true, max: 100 },
        code: { type: String, required: true, max: 100 },
        price: { type: Number, required: true, max: 100 },
        status: {type: Boolean},
        stock: { type: Number, required: true, max: 100 },
        category: { type: String, required: true, max: 100 },
        thumbnail: { type: String, required: true, max: 100 },
        // id: { type: Number, required: true, max: 100 },
    })
);

// userModel = model("collection", schema )
