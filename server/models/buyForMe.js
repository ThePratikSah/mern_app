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
  landmark: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  },
  location: Coordinates
}, {_id: false});

const buyForMeSchema = new Schema({
  receiver: Address,
  items: {
    type: String,
    required: true
  },
  shop: {
    name: {
      type: String,
      default: 'NOT MENTIONED'
    },
    address: {
      type: String,
      default: 'NOT MENTIONED'
    },
    landmark: {
      type: String,
      default: 'NOT MENTIONED'
    }
  },
  approximateCost: {
    type: Number,
    required: true
  },
  isDriverAssigned: {
    type: Boolean,
    default: false
  },
  additionalInfo: {
    type: String
  },
  itemType: {
    type: String,
    default: 'UNSPECIFIED'
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
  },
  imageUrl:{
    type:String,
  }
}, {
  timestamps: true
});

export default mongoose.model('BuyForMe', buyForMeSchema);
