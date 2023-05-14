const fs = require('fs');


class ProductManager {
    static createFile = () => {
        if (!fs.existsSync("productos.json")) {
            return fs.writeFileSync("productos.json", "[]");
        }
    };
    constructor() {
        ProductManager.createFile();
        this.path = "./productos.json";
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    }
    #escribirContenido() {
        let contenidoStringify = JSON.stringify(this.products);
        let actualizandoContenido = fs.writeFileSync(this.path, contenidoStringify);
        return actualizandoContenido;
    }
    getProducts() {
        if (this.products.length === 0) {
            console.log('Todavía no se ingresaron productos.')
            return [];
        } else {
            console.log(this.products);
            return this.products;
        }
    };
    getProductById(id) {
        let encontrado = this.products.find((prod) => prod.id === id);
        if (!encontrado) {
            console.log('Not Found');
            return null;
        } else {
            console.log(encontrado);
            return encontrado;
        }
    }
    updateProduct(id, campo, nuevoValor) {
        let arrayProducts = this.products;
        let encontrado = arrayProducts.find((prod) => prod.id === id);
        if (!encontrado) {
            console.log('Not Found');
            return error;
        } else if(campo === 'id'){
            console.log('No se puede modificar este dato.');
        }else{
            encontrado[campo] = nuevoValor
            this.products = arrayProducts;
            console.log('Campo actualizado del producto');
            this.#escribirContenido();
            return encontrado;
        }
    }
    deleteProduct(id) {
        let arrayProducts = this.products;
        let encontrado = arrayProducts.findIndex((prod) => prod.id === id);
        if (encontrado === -1) {
            console.log('Not Found');
        } else {
            arrayProducts.splice(encontrado, 1);
            this.products = arrayProducts;
            console.log('Producto eliminado con exito');
            return this.#escribirContenido();
        }
    }
    #generarId() {
        let maxId = 0;
        for (let i = 0; i < this.products.length; i++) {
            const prod = this.products[i];
            if (prod.id > maxId) {
                maxId = prod.id;
            }
        }
        return ++maxId;
    }
    #verificarProducto(productoNuevo) {
        const verificandoProductoNuevo = Object.values(productoNuevo).some((values) => values === null || values === undefined || values === '');
        return verificandoProductoNuevo;
    }
    addProduct(
        title, description, price, thumbnail, code, stock
        ) {
            let productoNuevo = { title, description, price, thumbnail, stock, code, id: this.#generarId() };
        const verificandoProducto = this.#verificarProducto(productoNuevo);
        const codeYaExiste = this.products.find((prod) => prod.code === code);
        if (codeYaExiste) {
            console.log('ERROR - código ya existe, escriba otro')
        }
        else if (verificandoProducto) {
            console.log('ERROR - Por favor completar todos los campos');
        }
        else {
            this.products = [...this.products, productoNuevo];
            console.log('Felicidades! Producto nuevo agregado.')
            this.#escribirContenido()
        }
    }
}

const productos = new ProductManager();

console.log('--- 1 ---');

productos.getProducts();

console.log('--- 2 ---');

productos.addProduct(
    'producto prueba',
    'Este es un producto prueba',
    200,
    'Sin imagen',
    'abc123',
    25);

console.log('--- 3 ---');

productos.getProducts();

console.log('--- 4 ---');

productos.getProductById(3);

console.log('--- 5 ---');

productos.updateProduct(1, 'id', 999);

console.log('--- 6 ---');

productos.deleteProduct(7);