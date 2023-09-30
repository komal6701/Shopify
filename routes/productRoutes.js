import express from "express";
import { brainTreePaymentController, braintreeTokenController, createProductContoller, deleteProductController, getSingleProductController, getproduct, productCategoryController, productCountController, productFilterController, productListContoller, productPhotoContoller, relatedProductController, searchProductController, updateProductController} from "../controllers/productController.js";
import { isAdmin, requiresSignIn } from "../middlewares/authMiddleware.js";
import formidable from 'express-formidable'
const router = express.Router()

//routes
router.post('/create-product', requiresSignIn, isAdmin, formidable(), createProductContoller)
//get products
router.get('/get-product', getproduct)
//single product
router.get('/get-product/:slug', getSingleProductController)
//get photo
router.get('/product-photo/:pid', productPhotoContoller)
//delete product
router.delete('/delete-product/:pid', deleteProductController)
//update product
router.put('/update-product/:pid', requiresSignIn, isAdmin, formidable(),updateProductController)
//filter product
router.post('/product-filters', productFilterController)
//product count
router.get('/product-count', productCountController)
//product per page
router.get('/product-list/:page', productListContoller)
//search product 
router.get('/search/:keyword', searchProductController)
//similiar product
router.get('/related-product/:pid/:cid', relatedProductController)
//category wise-product
router.get('/product-category/:slug', productCategoryController)
//payments routes
router.get('/braintree/token', braintreeTokenController)
//payments
router.post('/braintree/payment', requiresSignIn, brainTreePaymentController)
export default router

