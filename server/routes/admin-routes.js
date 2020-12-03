import express from'express';

const router = express.Router();

import {isAdmin} from'../middleware/is-admin.js';

import * as adminController from '../controllers/admin-controller.js';

//get all orders
router.get('/orders', isAdmin, adminController.getAllOrders);

//create price and weight
router.post('/create-price', isAdmin, adminController.createPriceAndWeight);

//update the payment status of an order manually
router.put('/update-order', isAdmin, adminController.confirmOrderPayment);

export default router;
