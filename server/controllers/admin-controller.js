import expressValidator from 'express-validator';

import Administrator from '../models/administrator.js';

import PriceAndWeight from '../models/priceAndWeight.js';

import Orders from '../models/orders.js';

//function to create price and weight
export const createPriceAndWeight = async (req, res, next) => {
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
    const result = await priceAndWeight.save();
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

//function to fetch all orders in descending order
export const getAllOrders = async (req, res, next) => {
  try {
    const totalOrders = await Orders.find().countDocuments();
    const orders = await Orders.find().sort({createdAt: -1});
    res.status(200).json({
      message: 'All orders fetched',
      orders: orders,
      totalOrders: totalOrders
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//function to confirm payment of an order manually using an orderId
export const confirmOrderPayment = async (req, res, next) => {
  const orderId = req.body.orderId;
  if (!orderId) {
    const error = new Error('No order ID provided');
    error.statusCode = 404;
    return next(error);
  }
  try {
    const order = await Orders.findById(orderId);
    if (!order) {
      const error = new Error('No order found');
      error.statusCode = 404;
      return next(error);
    }
    order.isPaymentSuccessful = true;
    const result = await order.save();
    res.status(200).json({
      message: `${orderId}: Order payment confirmed`,
      result: result
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

