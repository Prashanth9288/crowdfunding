import express from 'express';
import Campaign from '../models/Campaign.js';
import { getRecommendations } from '../services/recommendationService.js';

const router = express.Router();

// GET all campaigns
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET search campaigns
router.get('/search', async (req, res) => {
    try {
        const query = req.query.term;
        let filter = {};
        if (query) {
            filter.title = { $regex: query, $options: 'i' };
        }
        const campaigns = await Campaign.find(filter).sort({ createdAt: -1 });
        res.json(campaigns);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET one campaign
router.get('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create campaign
router.post('/', async (req, res) => {
  const campaign = new Campaign({
    title: req.body.title,
    description: req.body.description,
    creator: req.body.creator,
    creatorId: req.body.creatorId,
    goalAmount: req.body.goalAmount || req.body.goal,
    deadline: req.body.deadline,
    image: req.body.image,
    category: req.body.category
  });

  try {
    const newCampaign = await campaign.save();
    res.status(201).json(newCampaign);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET campaigns by creator
router.get('/user/:uid', async (req, res) => {
  try {
    const campaigns = await Campaign.find({ creatorId: req.params.uid }).sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET campaigns backed by user
router.get('/backed/:uid', async (req, res) => {
    try {
        const campaigns = await Campaign.find({ "backers.userId": req.params.uid }).sort({ createdAt: -1 });
        res.json(campaigns);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET recommendations for user
router.get('/recommendations/:uid', async (req, res) => {
    try {
        const recommendations = await getRecommendations(req.params.uid);
        res.json(recommendations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST donation (Mock)
router.post('/:id/donate', async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
        
        const { amount, userId } = req.body;
        const donationAmount = Number(amount);
        
        campaign.raisedAmount += donationAmount;
        campaign.backersCount += 1;
        
        if (userId) {
            campaign.backers.push({ userId, amount: donationAmount });
        }
        
        await campaign.save();
        res.json(campaign);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



export default router;
