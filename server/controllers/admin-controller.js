import expressValidator from'express-validator';

import Administrator from '../models/administrator.js';

import PriceAndWeight from '../models/priceAndWeight.js';

export const createPriceAndWeight = async(req, res, next) => {
  const errors = expressValidator.validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation Failed');
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }
  const {price, weight} = req.body;
  try {
    const priceAndWeight = new PriceAndWeight({
      price: price,
      weight: weight
    });
    const result =  await priceAndWeight.save();
    res.status(201).json({
      message: 'Price and Weight created!',
      result: result
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

