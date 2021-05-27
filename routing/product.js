const express = require('express');
const router = express.Router();
const multer = require('multer');

const productController = require('../controllers/productControl');
const checkAuth = require('../ware/checkAuth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => { // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


router.post('/', productController.product_get_all)

router.post('/upload', checkAuth, upload.single('productImage'), productController.product_post_one)

router.get('/:productId', checkAuth, productController.product_get_one)

router.patch('/:productId', checkAuth, productController.product_update_one)

router.delete('/:productId', checkAuth, productController.product_delete_one)


module.exports = router;
