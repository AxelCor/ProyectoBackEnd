import express from 'express';
import { ProductManager } from '../src/ProductManager.js';
import { routerProducts } from "./routes/products.router.js";
// import { routerCarts } from "./routes/carts.router.js";
// import __dirname from './utils.js'

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const productManager = new ProductManager();


// app.use(express.static(__dirname+'/public'))
app.use('/api/products/',routerProducts);
// app.use('/api/carts/',routerCarts);


// //Mostrar todos los productos
// app.get('/products', (req, res) => {
//     const allProducts = productManager.getProducts();
//     let limit = req.query.limit;

//     if (!limit) {
//         res.status(200).send({ Productos: allProducts });
//     } else if (limit > 0 && limit <= allProducts.length) {
//         let productsLimit = allProducts.slice(0, limit);
//         res.status(200).send({ InformaciónSolicitada: productsLimit });
//     } else if (limit > allProducts.length) {
//         res
//             .status(400)
//             .send({ "error": "El límite supera la cantidad de productos." });
//     } else {
//         res.status(400).send({ "error": "El límite debe ser un número." });
//     }
//     console.log('Mostrando información solicitada.');
// });


// //Buscar producto por ID
// app.get('/products/:pId', (req, res) => {
//     const pId = parseInt(req.params.pId);
//     const product = productManager.getProductById(pId);
//     if (!product) {
//         console.log('Producto no encontrado, ingrese otro ID.');
//         return res.send({ error: 'Producto no encontrado, ingrese otro ID.' })
//     }
//     console.log('Mostrando producto seleccionado por ID.');
//     res.send({ product });
// });

app.listen(port, () => {
    console.log(`App funcionando en puerto ${port}.`);
});  