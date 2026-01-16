import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  duration: Number,
  category: String,
  icon: String,
  image: String,
  popular: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Service', ServiceSchema);
