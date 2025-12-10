import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Sync user from Firebase to MongoDB
router.post('/sync', async (req, res) => {
  const { firebaseUid, email, name, avatar } = req.body;
  
  try {
    let user = await User.findOne({ firebaseUid });
    
    if (!user) {
      user = new User({ 
        firebaseUid, 
        email, 
        name: name || email.split('@')[0], 
        avatar 
      });
      await user.save();
    } else {
      // Update info if changed and provided
      if (name) user.name = name;
      if (avatar) user.avatar = avatar;
      await user.save();
    }
    
    res.json(user);
  } catch (error) {
    console.error('Auth sync error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get current user profile
router.get('/:uid', async (req, res) => {
    try {
        const user = await User.findOne({ firebaseUid: req.params.uid })
            .populate('backedCampaigns')
            .populate('createdCampaigns');
            
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
