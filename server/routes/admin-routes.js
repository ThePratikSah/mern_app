import express from 'express';

const router = express.Router();

import {isAdmin} from '../middleware/is-admin.js';

import * as adminController from '../controllers/admin-controller.js';
import expressValidator from "express-validator";

//get all orders
router.get('/orders', isAdmin, adminController.getAllOrders);

//get sorted orders and all orders
router.post('/orders', isAdmin, adminController.getSortedOrders);

//create price and weight
router.post('/create-price',
  [expressValidator.check('price').trim().isInt().not().isEmpty(),
  expressValidator.check('weight').trim().isInt().not().isEmpty()],
  isAdmin, adminController.createPriceAndWeight);

//update the payment status of an order manually
router.put('/update-order', isAdmin, adminController.confirmOrderPayment);

//create a new driver
router.post('/new-driver', isAdmin, adminController.createDriver);

//update anew driver
router.put('/update-driver', isAdmin, adminController.editDriver);

//assign driver to order
router.post('/assign-driver', isAdmin, adminController.assignDriverToOrder);

export default router;
