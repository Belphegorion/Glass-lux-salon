// server/models/Stylist.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const StylistSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  bio: String,
  specialty: String,
  rating: { type: Number, default: 5.0 },
  image: String,
  yearsExperience: Number,
  services: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Stylist', StylistSchema);
