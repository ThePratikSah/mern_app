import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Coordinates = new Schema({
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
    type: Schema.Types.ObjectId,
    ref: 'Orders'
  },
  orders:[{
    type: Schema.Types.ObjectId,
    ref: 'Orders'
  }],
});

export default mongoose.model('Driver', driverSchema);
