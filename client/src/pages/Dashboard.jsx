import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Plus, FolderOpen } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth/login");
    }
  }, [loading, user, navigate]);

  /* Empty state rendering logic moved to inside main return */

  /* Empty state rendering logic moved to inside main return */
  
  const [stats, setStats] = useState({
      totalRaised: 0,
      activeCampaigns: 0,
      totalBackers: 0
  });
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
      const fetchCampaigns = async () => {
          if (user?.uid) {
              try {
                  const res = await fetch(`https://crowdfunding-0rtd.onrender.com/api/campaigns/user/${user.uid}`);
                  const data = await res.json();
                  setCampaigns(data);
                  
                  // Calculate stats
                  const totalRaised = data.reduce((acc, curr) => acc + (curr.raisedAmount || 0), 0);
                  const totalBackers = data.reduce((acc, curr) => acc + (curr.backersCount || 0), 0);
                  const active = data.filter(c => new Date(c.deadline) > new Date()).length;
                  
                  setStats({
                      totalRaised,
                      activeCampaigns: active,
                      totalBackers
                  });
              } catch (error) {
                  console.error("Failed to fetch campaigns", error);
              }
          }
      };
      fetchCampaigns();
  }, [user]);

  // Handle Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse text-purple-600">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar - Same as before */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 md:ml-56">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user.displayName?.split(" ")[0] || "Creator"}!</h1>
            <p className="text-slate-500">Here's what's happening with your campaigns</p>
          </div>
          <Link to="/create-campaign">
            <Button className="bg-gradient-to-r from-mint-500 to-purple-600 hover:opacity-90 text-white shadow-lg shadow-purple-500/20">
                <Plus className="w-5 h-5 mr-2" />
                New Campaign
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Raised", value: `$${stats.totalRaised.toLocaleString()}`, change: `+0%` },
            { label: "Active Campaigns", value: stats.activeCampaigns, change: "Running now" },
            { label: "Total Backers", value: stats.totalBackers, change: "across all campaigns" },
            { label: "Projects Backed", value: "0", change: "Coming soon" },
          ].map((stat, index) => (
            <div key={index} className="glass-card p-6 rounded-xl bg-white border border-slate-100 shadow-sm">
              <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-mint-600 to-purple-600">{stat.value}</p>
              <p className="text-xs text-slate-400 mt-1">{stat.change}</p>
            </div>
          ))}
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
                                <span>${campaign.raisedAmount} raised</span>
                                <span>{Math.round((campaign.raisedAmount / campaign.goalAmount) * 100)}%</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2 mb-4">
                                <div className="bg-mint-500 h-2 rounded-full" style={{ width: `${Math.min((campaign.raisedAmount / campaign.goalAmount) * 100, 100)}%` }}></div>
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

export default Dashboard;
