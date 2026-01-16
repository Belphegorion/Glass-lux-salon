// server/models/Booking.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const BookingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  stylist: { type: Schema.Types.ObjectId, ref: 'Stylist', required: true },
  location: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  duration: { type: Number, default: 60 },
  price: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'confirmed' },
  notes: String,
  payment: {
    method: String,
    status: String,
    transactionId: String
  }
}, { timestamps: true });

export default mongoose.model('Booking', BookingSchema);
