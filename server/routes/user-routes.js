import express from 'express';

import expressValidator from 'express-validator';

import * as userController from '../controllers/user-controller.js';

const router = express.Router();

//fetch price and weight
router.get('/fetch/price-weights',userController.fetchPriceAndWeights);

//create a new order
router.post('/create/order',userController.placeOrder);

export default router;
