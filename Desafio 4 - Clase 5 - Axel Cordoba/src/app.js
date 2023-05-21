import express from 'express';
import { routerProducts } from "./routes/products.router.js";
import { routerCarts } from "./routes/carts.router.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products/', routerProducts);
app.use('/api/carts/', routerCarts);

app.get("*", (req, res) => {
    res.status(404).send({ status: "error", data: "Page not found" });
});

app.listen(port, () => {
    console.log(`App funcionando en puerto ${port}.`);
});  