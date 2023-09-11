import express from 'express';
import { fileURLToPath} from 'url';
import path, { dirname } from 'path';
import { createRequire } from 'module';
import { productsRouter } from './routes/products';

const app = express();
app.use('/static', express.static(path.join(__dirname, 'public')));

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);




