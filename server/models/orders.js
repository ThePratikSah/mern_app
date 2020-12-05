import mongoose from 'mongoose';
import Coordinates from './coordinates.js';

const Schema = mongoose.Schema;

const Address = new Schema({
  name : {
    type:String,
    required :true
  },
  email:{
    type: String,
    required: true
  },
  phone:{
    type:Number,
    required: true
  },
  address:{
    type: String,
    required: true
  },
  time:{
    type : Date,
    default: Date.now
  },
  location: Coordinates
},{ _id : false });

const orderSchema = new Schema({
  sender: Address,
  receiver:Address,
  paymentId:{
    type:String,
    required:true,
  },
  isPaymentSuccessful:{
    type: Boolean,
    default:false
  },
  isDriverAssigned:{
    type: Boolean,
    default:false
  },
  amount:{
    type:Number,
    required:true
  },
  driver:{
    type:Schema.types.ObjectId,
    ref:'Driver',
  }
},{
  timestamps: true
});

export default mongoose.model('Orders', orderSchema);
