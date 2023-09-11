import  express  from "express";
import { uploader , generateFileNameWithTimestamp } from "../utils";

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));



let products = [];
let nextProductId = 1;

router.get('/api/products', (req, res) => {
    res.send(products);
});


router.post('/api/user', uploader.array('file'), (req, res) => {
    const product = req.body;
    if (!product.title || !product.description || !product.price || !product.price || !product.code || !product.stock || !product.category){
        return res.status(400).send({ status: "error", error: "Valores incompletos" });
    }
    product.id = nextProductId++;
    product.status = true;
    product.thumbnail = req.file.path;
    products.push(product);
    res.send({ status: "success", message: "Producto creado" });
});

router.put('/api/user/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const updatedProduct = req.body;

    if (!updatedProduct.title || !updatedProduct.description || !updatedProduct.price || !updatedProduct.code || !updatedProduct.stock || !updatedProduct.category ||) {
        return res.status(400).send({ status: "error", error: "Valores incompletos" });
    }

    const productIndex = products.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
        products[productIndex] = {
            ...products[productIndex],
            ...updatedProduct
        };
        res.send({ status: "success", message: "Producto actualizado" });
    } else {
        res.status(404).send({ status: "error", error: "Producto no encontrado" });
    }
});

router.delete('/api/product/:id', (req, res) => {
    const productId = parseInt(req.params.id);

    const productIndex = users.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
        prducts.splice(productIndex, 1);
        res.send({ status: "success", message: "Producto eliminado" });
    } else {
        res.status(404).send({ status: "error", error: "Producto no encontrado" });
    }
});











class ProductManager{
    constructor(filePath){
        this.path = filePath;
        this.products = [];
        this.nextId = 1;
    }

    addProduct(product){
        if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock){
            console.log("Todos los campos son obligatorios");
            return;
        }
        const dataProduct = fs.readFileSync(this.path, 'utf-8');
        this.products = JSON.parse(dataProduct);
        const existingProduct = this.products.find(existingProduct => existingProduct.code === product.code);
        if(existingProduct){
            console.log("The code is already in use");
            return
        }
        
        const newProduct = {
            ...product,
            id: this.nextId
        };
        this.products.push(newProduct)
        this.nextId++;

        fs.writeFileSync(this.path, JSON.stringify(this.products), 'utf-8');

        console.log("added product:", newProduct);
    }
    

    getProduct() {
        const dataProduct = fs.readFileSync(this.path, 'utf-8');
        this.products = JSON.parse(dataProduct);
        return this.products;
    }

    getProductById(id){
        const dataProduct = fs.readFileSync(this.path, 'utf-8');
        this.products = JSON.parse(dataProduct);
        const product = this.products.find(existingProduct => existingProduct.id === id)
        if(product){
            return product;
        } else {
            console.log("Not Found");
            return null;
        }
    }

    updateProduct(id, update){
        const productUpdate = this.products.find(product => product.id === id);
        if(productUpdate !== -1) {
            this.products[productUpdate] = {
                ...this.products[productUpdate],
                ...update
            };
            fs.writeFileSync(this.path, JSON.stringify(this.products), 'utf-8');
            console.log("Producto actualizado: ", this.products[productUpdate]);
        } else{
            console.log("Producto no encontrado")
        }
    }

    deleteProduct(id) {
        const productDelete = this.products.find(product => product.id === id);
        if(productDelete !== -1) {
            const deletedProduct = this.products.splice(productDelete, 1)[0];
            fs.writeFileSync(this.path, JSON.stringify(this.products), 'utf-8');
            console.log("Producto eliminado: ", deletedProduct);
        } else {
            console.log("Producto no encontrado");
        }
    }

}

const productManager = new ProductManager('product.json');

productManager.addProduct({
    title: "Product 1",
    description: "Description 1",
    price: 300,
    thumbnail: "ruta/imagen1.jpg",
    code: "P1",
    stock: 20
})

productManager.addProduct({
    title: "Product 2",
    description: "Description 2",
    price: 200,
    thumbnail: "ruta/imagen2.jpg",
    code: "P2",
    stock: 3
})

console.log("Productos: ", productManager.getProduct());

const productById = productManager.getProductById(2);

if(productById){
    console.log("Producto encontrado: ", productById);
}