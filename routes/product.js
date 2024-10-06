import express from 'express';
import { createProduct, deleteProduct, getAllProducts, updateProduct } from '../controllers/product.js';
import { auth } from '../middleware/auth.js';

const router =express.Router();

router.post('/create',auth,createProduct)
router.get('/getAllProduct',auth,getAllProducts)
router.patch("/update/:id",auth,updateProduct)
router.delete("/delete/:id",auth,deleteProduct)

export default router