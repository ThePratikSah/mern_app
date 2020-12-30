import PriceAndWeight from '../models/priceAndWeight.js';

import Order from '../models/orders.js';

import BuyForMe from '../models/buyForMe.js';

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
  const {sender, receiver, paymentId, amount, weight, distance, additionalInfo, itemType} = req.body;
  if (!sender || !receiver || !paymentId || !amount || !weight || !distance) {
    const error = new Error('Missing fields');
    error.statusCode = 406;
    return next(error);
  }
  const order = new Order({
    sender: sender,
    receiver: receiver,
    paymentId: paymentId,
    amount: amount,
    weight: weight,
    distance: distance,
    additionalInfo: additionalInfo,
    itemType: itemType
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

export const placeBuyForMeOrder = async (req, res, next) => {
  const {receiver, items, shop, approximateCost, additionalInfo, itemType, amount, weight, distance } = req.body;
  const image = req.file;
  let imageUrl ='';
  if(image) {
    imageUrl = req.file.path;
  }
  const buyForMe = new BuyForMe({
    receiver: receiver,
    items: items,
    shop: shop,
    approximateCost: approximateCost,
    additionalInfo: additionalInfo,
    itemType: itemType,
    amount: amount,
    weight: weight,
    distance: distance,
    imageUrl: imageUrl
  });
  try{
    const result = await buyForMe.save();
    res.status(201).json({
      message: 'Buy for me ordered successfully',
      result: result
    });
  }catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const trackOrder = async (req, res, next) => {
  try {
    const orderId = req.body.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
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


