import PriceAndWeight from '../models/priceAndWeight.js';

import Order from '../models/orders.js';

//function to fetch all price and weights
export const fetchPriceAndWeights = async (req, res, next) => {
  try {
    const priceAndWeights = await PriceAndWeight.find();
    res.status(200).json({
      message: 'Fetched all prices successfully',
      result: priceAndWeights
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


export const placeOrder = async (req, res, next) => {
  const {sender, receiver, paymentId, amount} = req.body;
  if (!sender || !receiver || !paymentId  || !amount) {
    const error = new Error('Missing fields');
    error.statusCode = 406;
    return next(error);
  }
  const order = new Order({
    sender: sender,
    receiver: receiver,
    paymentId: paymentId,
    amount: amount
  });
  try {
    const result = await order.save();
    res.status(201).json({
      message: 'order created successfully',
      result: result
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const trackOrder = async (req, res, next) => {
  const orderId = req.body.orderId;
  try {
    const order = await Order.findById(orderId);
    if (!order){
      const error = new Error('No such order found');
      error.statusCode = 404;
      return next(error);
    }
    //TODO: implement socket.io
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


