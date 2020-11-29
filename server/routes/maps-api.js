import express from 'express';

import * as mapController from '../controllers/maps-api-controller.js';

const router = express.Router();

router.post('/fetch', mapController.apiRequest );

export default router;

