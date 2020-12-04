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
  amount:{
    type:Number,
    required:true
  }
  //TODO design driver schema
  // driver:{
  //   type:Schema.types.ObjectId,
  //   ref:
  // }
},{
  timestamps: true
});

export default mongoose.model('Orders', orderSchema);
