const multer = require('multer');
const path = require('path');
const fs = require('fs');

const MAX_FILE_SIZE = 1024 * 1024 * 10; // 10MB

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const user_id = req.user.user_id; // auth middleware adja
        const uploadDir = path.join(process.cwd(), 'uploads_tmp', String(user_id));

        try {
            fs.mkdirSync(uploadDir, { recursive: true });
            cb(null, uploadDir);
        } catch (err) {
            cb(err, null);
        }
    },
    filename: (req, file, cb) => {
        const now = new Date().toISOString().split('T')[0];
        cb(null, `${req.user.user_id}-${now}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpg|jpeg|png|gif|svg|webp|avif|bmp|tiff/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if (extName && mimeType) {
            cb(null, true);
        } else {
            cb(new Error('Csak képformátumok megengedettek'), null);
        }
    }
});

module.exports = { upload };