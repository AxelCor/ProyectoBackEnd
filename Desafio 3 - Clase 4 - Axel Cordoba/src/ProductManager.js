import fs from 'fs';


export class ProductManager {
    constructor() {
        this.path = "./productos.json";
        let contenido = fs.readFileSync(this.path, "utf-8");
        this.products = JSON.parse(`${contenido}`);
    }
    #escribirContenido() {
        let contenidoStringify = JSON.stringify(this.products);
        let actualizandoContenido = fs.writeFileSync(this.path, contenidoStringify);
        return actualizandoContenido;
    }
    getProducts() {
        let arrayProducts = this.products;
        if (arrayProducts.length === 0) {
            console.log('Todavía no se ingresaron productos. Array =', arrayProducts)
            return [];
        } else {
            console.log(arrayProducts);
            return arrayProducts;
        }
    };
    getProductById(id) {
        let encontrado = this.products.find((prod) => prod.id === id);
        if (encontrado) {
            console.log(encontrado);
            return encontrado;
        } else {
            console.log('Not Found');
            return null;
        }
    }
    updateProduct(id, campo, nuevoValor) {
        let arrayProducts = this.products;
        this.campo = campo
        let encontrado = arrayProducts.find((prod) => prod.id === id);
        if (encontrado) {
            encontrado[campo] = nuevoValor
            this.#escribirContenido();
            return console.log('Campo actualizado del producto', encontrado);
        } else {
            console.log('Not Found');
            return console.log('Producto no encontrado');
        }
    }
    deleteProduct(id) {
        let arrayProducts = this.products;
        let encontrado = arrayProducts.findIndex((prod) => prod.id == id);
        if (encontrado == -1) {
            console.log('Not Found');
            console.log('Producto no encontrado');
        } else {
            arrayProducts.splice(encontrado, '1');
            this.products = arrayProducts;
            this.#escribirContenido();
            console.log('Producto eliminado con exito');

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
            return console.log('ERROR - código ya existe, escriba otro')
        }
        else if (this.products.length === 0) {
            verificandoProducto ? '' : this.products = [...this.products, productoNuevo];
            const res = verificandoProducto ? 'ERROR - Por favor completar todos los campos' : 'Felicidades! Producto nuevo agregado.';
            console.log(res);
            return this.#escribirContenido()
        }
    }
}