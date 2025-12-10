import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Heart, Search } from "lucide-react";
import Sidebar from "@/components/Sidebar";

const BackedProjects = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [campaigns, setCampaigns] = useState([]);
    const [isLoadingData, setIsLoadingData] = useState(true);

    useEffect(() => {
        if (!loading && !user) {
            navigate("/auth/login");
            return;
        }

        const fetchBackedCampaigns = async () => {
            if (user?.uid) {
                try {
                    const res = await fetch(`http://localhost:5000/api/campaigns/backed/${user.uid}`);
                    const data = await res.json();
                    setCampaigns(data);
                } catch (error) {
                    console.error("Failed to fetch backed campaigns", error);
                } finally {
                    setIsLoadingData(false);
                }
            }
        };
        fetchBackedCampaigns();
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
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Backed Projects</h1>
                    <p className="text-slate-500">Campaigns you have supported</p>
                </div>

                {campaigns.length === 0 ? (
                    <div className="glass-card rounded-2xl p-12 text-center border-dashed border-2 border-slate-200 bg-slate-50/50">
                        <div className="w-16 h-16 rounded-full bg-slate-100 mx-auto mb-6 flex items-center justify-center">
                            <Heart className="w-8 h-8 text-slate-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-slate-900 mb-2">No backed projects yet</h2>
                        <p className="text-slate-500 mb-6 max-w-md mx-auto">
                            You haven't backed any campaigns yet. Explore projects and support creators!
                        </p>
                        <Link to="/dashboard">
                            <Button className="bg-gradient-to-r from-mint-500 to-purple-600 hover:opacity-90 text-white">Explore Projects</Button>
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
                                    
                                    <div className="flex justify-between items-center text-sm font-medium pt-2 border-t border-slate-100 mt-4">
                                        <span className="text-slate-500">Your Pledge</span>
                                        <span className="text-mint-600">${campaign.backers?.find(b => b.userId === user.uid)?.amount || 0}</span>
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

export default BackedProjects;
