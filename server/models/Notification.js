// server/models/Notification.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const NotificationSchema = new Schema({
  stylist: { type: Schema.Types.ObjectId, ref: 'Stylist', required: true },
  message: { type: String, required: true },
  booking: { type: Schema.Types.ObjectId, ref: 'Booking' },
  read: { type: Boolean, default: false },
  meta: { type: Schema.Types.Mixed }
}, { timestamps: true });

export default mongoose.model('Notification', NotificationSchema);
