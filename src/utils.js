import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join, extname} from 'path';

const currentFileUrl = import.meta.url;
const currentFilePath = fileURLToPath(currentFileUrl);
const currentDirPath = dirname(currentFileUrl);

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const imgFloderPath = join(currentDirPath, '..', 'public', 'img');
        cb(null, imgFloderPath);
    },
    filename: function(req, file, cb) {
        const timestamp = Date.now();
        const fileExt = extname(file.originalname);
        const fileName = `${timestamp}${fileExt}`;
        cb(null, fileName);
    }
})

export const uploader = multer({storage});

export function generateFileNameWithTimestamp(file) {
    const timestamp = Date.now();
    const fileExt = extname(file.originalname);
    const originalFileName = file.originalname.replace(fileExt, '');
    return `${timestamp}-${originalFileName}${fileExt}`;
}