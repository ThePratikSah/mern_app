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
});

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
  pickupTime:{
    type : Date,
    default: Date.now
  },
  location: coordinateSchema
});

const orderSchema = new Schema({
  sender:[Address],
  receiver:[Address],
  paymentId:{
    type:String,
    required:true,
  },
  isPaymentSuccessful:{
    type: Boolean,
    default:false
  },
},{
  timestamps: true
});

export default mongoose.model('Orders', orderSchema);
