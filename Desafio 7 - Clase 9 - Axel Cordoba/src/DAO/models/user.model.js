//@ts-check
import { Schema, model } from "mongoose";

export const userModel = model(
    "users",
    new Schema({
        firstName: { type: String, required: true, max: 100 },
        lastName: { type: String, required: true, max: 100 },
        email: { type: String, required: true, max: 100 },
    })
);


// userModel = model("collection", schema )