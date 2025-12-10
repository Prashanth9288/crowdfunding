import Campaign from '../models/Campaign.js';

// Categories for one-hot encoding
const CATEGORIES = ['Technology', 'Art', 'Film', 'Music', 'Games'];

// Helper: Vectorize a campaign
const vectorize = (campaign) => {
    // 1. One-hot encode category
    const catVector = CATEGORIES.map(c => campaign.category === c ? 1 : 0);
    
    // 2. Normalize goal (Log scale to handle large variance)
    // We assume a reasonable range, e.g., log10(goal). 
    // A goal of 1000 -> 3, 100000 -> 5. We divide by max likely (e.g. 7 for 10M) to keep in 0-1 range approx.
    const goalFeature = Math.min(Math.log10(campaign.goalAmount || 1000) / 7, 1);

    return [...catVector, goalFeature];
};

// Helper: Cosine Similarity
const cosineSimilarity = (vecA, vecB) => {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    
    if (magA === 0 || magB === 0) return 0;
    return dotProduct / (magA * magB);
};

// Helper: Add vectors
const addVectors = (vecA, vecB) => {
    return vecA.map((a, i) => a + vecB[i]);
};

// Helper: Scale vector
const scaleVector = (vec, scalar) => {
    return vec.map(a => a * scalar);
};

export const getRecommendations = async (userId) => {
    try {
        // 1. Fetch all campaigns
        const allCampaigns = await Campaign.find();
        
        // 2. Identify backed campaigns by user
        const backedCampaigns = allCampaigns.filter(c => 
            c.backers && c.backers.some(b => b.userId === userId)
        );

        // 3. If no history, return trending/random (or top raised)
        if (backedCampaigns.length === 0) {
             return allCampaigns
                .sort((a, b) => b.raisedAmount - a.raisedAmount)
                .slice(0, 5);
        }

        // 4. Build User Profile Vector (Mean of backed vectors)
        let userProfile = vectorize(backedCampaigns[0]);
        for (let i = 1; i < backedCampaigns.length; i++) {
            userProfile = addVectors(userProfile, vectorize(backedCampaigns[i]));
        }
        userProfile = scaleVector(userProfile, 1 / backedCampaigns.length);

        // 5. Rank candidates (exclude already backed)
        const candidates = allCampaigns.filter(c => 
            !c.backers || !c.backers.some(b => b.userId === userId)
        );

        const scoredCandidates = candidates.map(c => ({
            campaign: c,
            score: cosineSimilarity(userProfile, vectorize(c))
        }));

        // 6. Sort by score desc
        scoredCandidates.sort((a, b) => b.score - a.score);

        return scoredCandidates.slice(0, 5).map(item => item.campaign);

    } catch (error) {
        console.error("Recommendation Error:", error);
        return [];
    }
};
