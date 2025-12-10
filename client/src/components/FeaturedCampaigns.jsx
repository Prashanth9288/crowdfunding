import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, Zap, Leaf, Shield, Monitor, Gamepad } from 'lucide-react';
import { Link } from 'react-router-dom';
import CampaignCard from './CampaignCard';
import { Button } from './ui/button';

const MOCK_CAMPAIGNS = [
  {
    _id: "mock1",
    title: "NeuroPod - AI-Powered Sleep Optimizer",
    creator: "NeuroTech Labs",
    raisedAmount: 847500,
    goalAmount: 1000000,
    deadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800",
    category: "Technology",
    featured: true,
    backers: 3240
  },
  {
    _id: "mock2",
    title: "EcoCharge - Solar Battery Pack",
    creator: "GreenLife Solutions",
    raisedAmount: 234000,
    goalAmount: 300000,
    deadline: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=800",
    category: "Green Tech",
    featured: false,
    backers: 1850
  },
  {
    _id: "mock3",
    title: "CodeMentor AI - Learning Platform",
    creator: "DevElevate",
    raisedAmount: 567000,
    goalAmount: 600000,
    deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    category: "Education",
    featured: true,
    backers: 4120
  },
  {
    _id: "mock4",
    title: "AeroDesk - Smart Standing Desk",
    creator: "ErgoWork",
    raisedAmount: 189000,
    goalAmount: 250000,
    deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800",
    category: "Productivity",
    featured: false,
    backers: 890
  },
  {
    _id: "mock5",
    title: "QuantumKey - Security Hardware",
    creator: "SecureFuture",
    raisedAmount: 445000,
    goalAmount: 500000,
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&q=80&w=800",
    category: "Security",
    featured: true,
    backers: 2340
  },
  {
    _id: "mock6",
    title: "HoloFrame - AR Display",
    creator: "Visionary Tech",
    raisedAmount: 123000,
    goalAmount: 200000,
    deadline: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
    image: "https://images.unsplash.com/photo-1535378437327-10f228d47196?auto=format&fit=crop&q=80&w=800",
    category: "Gadgets",
    featured: false,
    backers: 670
  }
];

// Generate more data to simulate "20+" items
const MORE_MOCKS = Array.from({ length: 14 }).map((_, i) => ({
    ...MOCK_CAMPAIGNS[i % MOCK_CAMPAIGNS.length],
    _id: `generated_${i}`,
    title: `${MOCK_CAMPAIGNS[i % MOCK_CAMPAIGNS.length].title} (v${i+2})`,
    raisedAmount: Math.floor(Math.random() * 500000) + 50000
}));

const ALL_MOCKS = [...MOCK_CAMPAIGNS, ...MORE_MOCKS];

const FeaturedCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Trending");
  const [showAll, setShowAll] = useState(false);

  const visibleCampaigns = showAll ? campaigns : campaigns.slice(0, 6);

  useEffect(() => {
    // Simulate fetching or fallback to mocks
    const loadData = async () => {
        // For this specific request, we prioritize the MOCK data to match the UI screenshot perfectly
        // In a real app, we'd merge this with fetch results
        setTimeout(() => {
            setCampaigns(ALL_MOCKS);
            setLoading(false);
        }, 800);
    };
    loadData();
  }, []);

  const tabs = ["Trending", "New", "Almost Funded", "Staff Picks"];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-mint-100/30 blur-3xl -z-10 rounded-l-[100px]" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-purple-100/30 blur-3xl -z-10 rounded-r-[100px]" />
        
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
                 <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles size={12} fill="currentColor" /> Discover
                 </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint-500 to-purple-600">Campaigns</span>
            </h2>
            <p className="text-lg text-slate-600">
                Explore innovative projects from visionary creators around the world.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeTab === tab 
                        ? 'bg-gradient-to-r from-mint-500 to-purple-600 text-white shadow-lg shadow-purple-200' 
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-purple-200 hover:text-purple-600'
                    }`}
                >
                    {tab}
                </button>
            ))}
          </div>
        </div>

        {loading ? (
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-[450px] bg-white rounded-3xl animate-pulse shadow-sm border border-slate-100"></div>
                ))}
            </div>
        ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleCampaigns.map((campaign, index) => (
               <Link to={`/campaign/${campaign._id}`} key={campaign._id} className="group">
                <CampaignCard 
                    title={campaign.title}
                    author={campaign.creator}
                    raised={campaign.raisedAmount}
                    goal={campaign.goalAmount}
                    image={campaign.image}
                    category={campaign.category}
                    daysLeft={Math.max(0, Math.ceil((new Date(campaign.deadline) - new Date()) / (1000 * 60 * 60 * 24)))}
                    // Pass featured flag if needed for custom badge in Card
                    isFeatured={campaign.featured}
                />
               </Link>
              ))}
            </div>
        )}
        
        {!showAll && (
            <div className="mt-16 text-center">
                <Button 
                    onClick={() => setShowAll(true)}
                    variant="outline" 
                    className="h-12 px-8 rounded-full text-base font-medium border-2 border-slate-200 text-slate-600 hover:border-purple-600 hover:text-purple-600 transition-all"
                >
                    View All Projects <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
            </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCampaigns;
