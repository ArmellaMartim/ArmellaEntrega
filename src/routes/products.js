import  express  from "express";
import { uploader , generateFileNameWithTimestamp } from "../utils";

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));



let products = [];
let nextProductId = 1;

router.get('/api/product', (req, res) => {
    res.send(products);
});


router.post('/api/product', uploader.array('file'), (req, res) => {
    const product = req.body;
    if (!product.title || !product.description || !product.price || !product.price || !product.code || !product.stock || !product.category){
        return res.status(400).send({ status: "error", error: "Valores incompletos" });
    }

    const fileName = generateFileNameWithTimestamp(req.file);
    product.id = nextProductId++;
    product.status = true;
    product.thumbnail = fileName;
    products.push(product);
    res.send({ status: "success", message: "Producto creado" });
});

router.put('/api/product/:id', (req, res) => {
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

export { router as productsRouter };