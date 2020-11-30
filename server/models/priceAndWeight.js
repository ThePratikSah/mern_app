import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const priceAndWeightSchema = new Schema({
  weight:{
    type: Number,
    required: true
  },
  price:{
    type: Number,
    required: true
  }
});

export default mongoose.model('PriceAndWeight', priceAndWeightSchema);
