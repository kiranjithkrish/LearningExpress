import multer from 'multer'
import path from 'path'
import { getAbsolutePath } from './absolutePath.js';

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file)
        cb(null, './uploads/'); // Destination folder for uploaded files
        //Can do this way also
       // const relativePath = '../../../uploads'; // Adjust the relative path based on your project structure
       // const absolutePath = getAbsolutePath(relativePath);
       // cb(null, absolutePath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + path.extname(file.originalname)); // Unique filename
    }
});

export const uploadStorage = multer({ storage: storage});


