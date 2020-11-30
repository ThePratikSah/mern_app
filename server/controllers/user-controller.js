import PriceAndWeight from '../models/priceAndWeight.js';

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
