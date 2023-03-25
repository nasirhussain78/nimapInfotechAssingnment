import express from 'express'
const router = express.Router();
import controller from '../controller/controller.js';



router.post('/category' , controller.createCategory);
router.get('/getCategory' , controller.getCategory);
router.get('/getCategoryById' , controller.getCategoryById);
router.put('/updateCategory' , controller.updateCategory);
router.delete('/deleteCategory' , controller.deleteCategory);



router.post('/product' , controller.createProduct);
router.get('/getProduct' , controller.getProduct);
router.put('/updateProduct' , controller.updateProduct);
router.delete('/deleteProduct' , controller.deleteProduct);


export default router;