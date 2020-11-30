import express from 'express';

import expressValidator from 'express-validator';

import * as userController from '../controllers/user-controller.js';

const router = express.Router();

//create price and weight
router.get('/fetch/price-weights',userController.fetchPriceAndWeights);

export default router;
