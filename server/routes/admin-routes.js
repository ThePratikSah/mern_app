import express from'express';

const router = express.Router();

import {isAdmin} from'../middleware/is-admin.js';

import * as adminController from '../controllers/admin-controller.js';

//create price and weight
router.post('/create-price', isAdmin, adminController.createPriceAndWeight);

export default router;
