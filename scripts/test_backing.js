
// Test Script for Backed Projects Flow
// Run with: node scripts/test_backing.js
// Note: Requires fetch (Node 18+)

const BASE_URL = 'http://localhost:5000/api/campaigns';
const TEST_USER_ID = 'test_backer_' + Date.now();

async function runTest() {
    console.log("Starting Backed Projects Test...");

    try {
        // 1. Create a Campaign
        console.log("1. Creating a test campaign...");
        const createRes = await fetch(`${BASE_URL}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: "Test Campaign " + Date.now(),
                description: "This is a test campaign for verification.",
                creator: "Test Creator",
                creatorId: "test_creator_123",
                goal: 1000,
                category: "Technology",
                deadline: new Date(Date.now() + 86400000).toISOString()
            })
        });
        
        if (!createRes.ok) throw new Error(`Create failed: ${createRes.status}`);
        const campaign = await createRes.json();
        const campaignId = campaign._id;
        console.log(`   -> Campaign created: ${campaignId}`);

        // 2. Back the Campaign
        console.log(`2. Backing campaign with User ID: ${TEST_USER_ID}...`);
        const donateRes = await fetch(`${BASE_URL}/${campaignId}/donate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: 50,
                userId: TEST_USER_ID
            })
        });

        if (!donateRes.ok) throw new Error(`Donate failed: ${donateRes.status}`);
        const updatedCampaign = await donateRes.json();
        
        // Verify response contains backer
        const backerFound = updatedCampaign.backers.some(b => b.userId === TEST_USER_ID);
        if (!backerFound) throw new Error("Backer NOT found in donation response!");
        console.log("   -> Donation successful, backer recorded in response.");

        // 3. Verify in Backed Projects List
        console.log("3. Fetching backed projects for user...");
        const backedRes = await fetch(`${BASE_URL}/backed/${TEST_USER_ID}`);
        if (!backedRes.ok) throw new Error(`Fetch backed failed: ${backedRes.status}`);
        const backedProjects = await backedRes.json();

        const isProjectListed = backedProjects.some(p => p._id === campaignId);
        
        if (isProjectListed) {
            console.log("SUCCESS: Campaign found in user's backed projects list!");
        } else {
            console.error("FAILURE: Campaign NOT found in user's backed projects list.");
            console.log("List received:", JSON.stringify(backedProjects, null, 2));
        }

    } catch (error) {
        console.error("TEST FAILED:", error.message);
    }
}

runTest();
