import express from 'express';

const router = express.Router();

import {isAdmin} from '../middleware/is-admin.js';

import * as adminController from '../controllers/admin-controller.js';
import expressValidator from "express-validator";

//get all orders
router.get('/orders', isAdmin, adminController.getAllOrders);

//get all buy for me
router.get('/buy-for-me', isAdmin, adminController.getAllBuyForMe);

//get sorted orders and all orders
router.post('/orders', isAdmin, adminController.getSortedOrders);

//create price and weight
router.post('/create-price', isAdmin,
  [expressValidator.check('price').trim().isInt().not().isEmpty(),
    expressValidator.check('weight').trim().isInt().not().isEmpty()],
  adminController.createPriceAndWeight);

//update the payment status of an order manually
router.put('/update-order', isAdmin,
  [expressValidator.check('orderId').not().isEmpty()],
  adminController.confirmOrderPayment);

//create a new driver
router.post('/new-driver', isAdmin,
  [expressValidator.check('name').trim().not().isEmpty(),
    expressValidator.check('email').isEmail().normalizeEmail(),
    expressValidator.check('phone').not().isEmpty().isLength({min: 10, max: 12}),
    expressValidator.check('adhaarNumber').not().isEmpty().isLength({min: 12, max: 12})],
  adminController.createDriver);

//update anew driver
router.put('/update-driver', isAdmin,
  [expressValidator.check('name').trim().not().isEmpty(),
    expressValidator.check('email').isEmail().normalizeEmail(),
    expressValidator.check('phone').not().isEmpty().isLength({min: 10, max: 12}),
    expressValidator.check('alternatePhone').not().isEmpty().isLength({min: 10, max: 12}),
    expressValidator.check('adhaarNumber').not().isEmpty().isLength({min: 12, max: 12})],
  adminController.editDriver);

//assign driver to order
router.post('/assign-driver', isAdmin, adminController.assignDriverToOrder);

export default router;
