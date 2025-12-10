import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Plus, FolderOpen } from "lucide-react";
import Sidebar from "@/components/Sidebar";

const MyCampaigns = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [campaigns, setCampaigns] = useState([]);
    const [isLoadingData, setIsLoadingData] = useState(true);

    useEffect(() => {
        if (!loading && !user) {
            navigate("/auth/login");
            return;
        }

        const fetchCampaigns = async () => {
            if (user?.uid) {
                try {
                    const res = await fetch(`http://localhost:5000/api/campaigns/user/${user.uid}`);
                    const data = await res.json();
                    setCampaigns(data);
                } catch (error) {
                    console.error("Failed to fetch campaigns", error);
                } finally {
                    setIsLoadingData(false);
                }
            }
        };
        fetchCampaigns();
    }, [user, loading, navigate]);

    if (loading || isLoadingData) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-pulse text-purple-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans">
            <Sidebar />

            <main className="flex-1 p-6 lg:p-8 md:ml-56">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">My Campaigns</h1>
                        <p className="text-slate-500">Manage your fundraising projects</p>
                    </div>
                    <Link to="/create-campaign">
                        <Button className="bg-gradient-to-r from-mint-500 to-purple-600 hover:opacity-90 text-white shadow-lg shadow-purple-500/20">
                            <Plus className="w-5 h-5 mr-2" />
                            New Campaign
                        </Button>
                    </Link>
                </div>

                {campaigns.length === 0 ? (
                    <div className="glass-card rounded-2xl p-12 text-center border-dashed border-2 border-slate-200 bg-slate-50/50">
                        <div className="w-16 h-16 rounded-full bg-slate-100 mx-auto mb-6 flex items-center justify-center">
                            <FolderOpen className="w-8 h-8 text-slate-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-slate-900 mb-2">No active campaigns</h2>
                        <p className="text-slate-500 mb-6 max-w-md mx-auto">
                            You don't have any active campaigns yet. Launch your idea today!
                        </p>
                        <Link to="/create-campaign">
                            <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">Create Campaign</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {campaigns.map(campaign => (
                            <div key={campaign._id} className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <img src={campaign.image || "https://via.placeholder.com/400x200"} alt={campaign.title} className="w-full h-40 object-cover" />
                                <div className="p-4">
                                    <h3 className="font-bold text-lg mb-1 truncate">{campaign.title}</h3>
                                    <div className="flex justify-between text-sm text-slate-500 mb-3">
                                        <span>${campaign.raisedAmount || 0} raised</span>
                                        <span>{campaign.goalAmount ? Math.round(((campaign.raisedAmount || 0) / campaign.goalAmount) * 100) : 0}%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2 mb-4">
                                        <div className="bg-mint-500 h-2 rounded-full" style={{ width: `${Math.min(((campaign.raisedAmount || 0) / (campaign.goalAmount || 1)) * 100, 100)}%` }}></div>
                                    </div>
                                    <Link to={`/campaign/${campaign._id}`}>
                                        <Button variant="outline" size="sm" className="w-full">View Details</Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default MyCampaigns;
