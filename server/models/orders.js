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
}, {_id: false});

const Address = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  },
  location: Coordinates
}, {_id: false});

const orderSchema = new Schema({
  sender: Address,
  receiver: Address,
  paymentId: {
    type: String,
    required: true,
  },
  isDriverAssigned: {
    type: Boolean,
    default: false
  },
  amount: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  driver: {
    type: Schema.Types.ObjectId,
    ref: 'Driver',
  }
}, {
  timestamps: true
});

export default mongoose.model('Orders', orderSchema);
