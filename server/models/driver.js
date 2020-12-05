import mongoose from 'mongoose';
import Coordinates from './coordinates.js';

const Schema = mongoose.Schema;

const driverSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  phone:{
    type: Number,
    required: true
  },
  alternatePhone:{
    type: Number,
  },
  adhaarNumber:{
    type:Number,
    required: true
  },
  isApproved: {
    type:Boolean,
    default: false
  },
  isOccupied:{
    type: Boolean,
    default: false
  },
  location: Coordinates,
  currentOrder:{
    type: Schema.types.ObjectID,
    ref: 'Orders'
  },
  orders:[{
    type: Schema.types.ObjectID,
    ref: 'Orders'
  }],
});

export default mongoose.model('Driver', driverSchema);
