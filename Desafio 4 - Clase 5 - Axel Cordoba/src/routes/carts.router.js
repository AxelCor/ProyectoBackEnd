import express from "express";
import { ProductManager } from '../ProductManager.js';

export const routerCarts = express.Router();
routerCarts.use(express.json());
routerCarts.use(express.urlencoded({ extended: true }));
const productManager = new ProductManager();


