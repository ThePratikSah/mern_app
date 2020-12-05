import expressValidator from 'express-validator';

import Driver from '../models/driver.js';

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

//function to add a new driver
export const createDriver = async (req, res, next) => {
  const {name, email, phone, adhaarNumber} = req.body;
  try {
    const driver = new Driver({
      name: name,
      email: email,
      phone: phone,
      adhaarNumber: adhaarNumber
    });
    const result = await driver.save();
    res.status(201).json({
      message: 'New Driver created!',
      result: result
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//function to edit a driver
export const editDriver = async (req, res, next) => {
  const {driverId, name, email, phone, alternatePhone, adhaarNumber, isApproved} = req.body;
  try {
    const driver = await Driver.findById(driverId);
    if (!driver) {
      const error = new Error('No driver found');
      error.statusCode = 404;
      return next(error);
    }
    driver.name = name;
    driver.email = email;
    driver.phone = phone;
    driver.alternatePhone = alternatePhone;
    driver.adhaarNumber = adhaarNumber;
    driver.isApproved = isApproved;
    const result = await driver.save();
    res.status(201).json({
      message: `Driver updated`,
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
    const orders = await Orders.find({isPaymentSuccessful: {$eq: true}}).sort({createdAt: -1});
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

//function to fetch orders =>sorting passed by admin
export const getSortedOrders = async (req, res, next) => {
  let {fromDate, toDate} = req.body;
  const skip = parseInt(req.body.skip);
  const limit = parseInt(req.body.limit);
  let filter;
  try {
    const totalOrders = await Orders.find().countDocuments();
    if (!fromDate || !toDate) {
      const orders = await Orders.find().sort({createdAt: -1}).skip(skip).limit(limit);
      res.status(200).json({
        message: 'All orders fetched',
        orders: orders,
        total: totalOrders,
      });
      return;
    }
    filter = {createdAt: {$lte: fromDate, $gte: toDate}};
    const orders = await Orders.find(filter).sort({createdAt: -1}).skip(skip).limit(limit);
    res.status(200).json({
      message: 'Filtered orders fetched',
      total: totalOrders,
      orders: orders,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//

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

// function to assign a driver to an order
export const assignDriverToOrder = async (req, res, next) => {
  const {orderId, driverId} = req.body;
  try {
    const order = await Orders.findById(orderId);
    const driver = await Driver.findById(driverId);
    if (!order || !driver) {
      const error = new Error('No order found');
      error.statusCode = 404;
      return next(error);
    }
    if (order.isPaymentSuccessful === false) {
      const error = new Error('Payment not confirmed yet');
      error.statusCode = 402;
      return next(error);
    }
    //manipulating order document
    order.driverId = driver._id;
    order.isDriverAssigned = true;
    
    //manipulating driver document
    driver.isOccupied = true;
    driver.currentOrder = order._id;
    driver.orders.push(order._id);
    
    order.save();
    driver.save();
    res.status(201).json({
      message: `${orderId}: Order  assigned to ${driverId}: Driver`,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//helper function to pass error validation to central error handler
const validationErrorHandler = (req, next) => {
  const errors = expressValidator.validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation Failed');
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }
};

