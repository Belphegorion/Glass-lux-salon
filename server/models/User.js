import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, required: true },
  phone: String,
  dateOfBirth: Date,
  password: { type: String, required: true },
  role: { type: String, enum: ['user','admin'], default: 'user' },
  profilePhoto: String,
  preferences: {
    hairType: String,
    skinTone: String,
    services: [String]
  },
  termsAccepted: { type: Boolean, default: false },
  emailVerified: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
