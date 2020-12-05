import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const coordinateSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
},{ _id : false });

export default mongoose.model('Coordinates',coordinateSchema);
