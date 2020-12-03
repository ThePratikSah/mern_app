import PriceAndWeight from '../models/priceAndWeight.js';

import Order from '../models/orders.js';

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
  const {sender, receiver, paymentId} = req.body;
  if (!sender || !receiver || !paymentId){
    res.status(406).json({
      message: 'Missing fields',
    });
  }
  const order = new Order({
    sender: sender,
    receiver: receiver,
    paymentId:paymentId,
});
  try{
    const result = await order.save();
    res.status(201).json({
      message: 'order created successfully',
      result: result
    });
  }catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


