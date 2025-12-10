import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String },
  avatar: { type: String },
  bio: { type: String },
  backedCampaigns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' }],
  createdCampaigns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' }],
  role: { type: String, enum: ['user', 'creator', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
