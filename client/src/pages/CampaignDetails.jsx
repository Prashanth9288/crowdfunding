import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Clock, Users, Share2, Heart, ShieldCheck } from "lucide-react";
import Navbar from "../components/Navbar";
import { useAuth } from "@/context/AuthContext";

const CampaignDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const { user } = useAuth();
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [donationAmount, setDonationAmount] = useState("");

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/campaigns/${id}`);
                if (!res.ok) throw new Error("Campaign not found");
                const data = await res.json();
                setCampaign(data);
            } catch (error) {
                console.error("Failed to fetch campaign", error);
                toast({ variant: "destructive", title: "Error", description: "This campaign does not exist." });
                navigate("/");
            } finally {
                setLoading(false);
            }
        };
        fetchCampaign();
    }, [id, navigate, toast]);

    const handleDonate = async () => {
        if (!donationAmount || isNaN(donationAmount) || Number(donationAmount) <= 0) {
            toast({ variant: "destructive", title: "Invalid Amount", description: "Please enter a valid donation amount." });
            return;
        }

        if (!user) {
             toast({ variant: "destructive", title: "Authentication Required", description: "Please login to back a project." });
             navigate("/auth/login");
             return;
        }

        try {
            const res = await fetch(`http://localhost:5000/api/campaigns/${id}/donate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    amount: Number(donationAmount),
                    userId: user.uid 
                })
            });
            const updatedCampaign = await res.json();
            setCampaign(updatedCampaign);
            setDonationAmount("");
            toast({ title: "Thank You!", description: `You have successfully donated $${donationAmount}.` });
            navigate("/backed-projects");
        } catch (error) {
            toast({ variant: "destructive", title: "Donation Failed", description: "Something went wrong." });
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-purple-600">Loading...</div></div>;
    if (!campaign) return null;

    const progress = Math.min((campaign.raisedAmount / campaign.goalAmount) * 100, 100);
    const daysLeft = Math.max(0, Math.ceil((new Date(campaign.deadline) - new Date()) / (1000 * 60 * 60 * 24)));

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-24 pb-12">
                <div className="container mx-auto px-6">
                    <Button variant="ghost" className="mb-6 pl-0 hover:bg-transparent hover:text-purple-600" onClick={() => navigate(-1)}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to projects
                    </Button>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Left Column: Media & Story */}
                        <div className="lg:col-span-2 space-y-8">
                             <div className="rounded-2xl overflow-hidden shadow-lg aspect-video relative group">
                                <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                             </div>

                             <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{campaign.title}</h1>
                                
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden">
                                             <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${campaign.creator}`} alt="avatar" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">By {campaign.creator}</p>
                                            <p className="text-xs text-slate-500">2 campaigns created</p>
                                        </div>
                                    </div>
                                    <div className="h-8 w-px bg-slate-200" />
                                    <div className="flex gap-2">
                                        <Button size="icon" variant="outline" className="rounded-full w-9 h-9"><Share2 size={16} /></Button>
                                    </div>
                                </div>

                                <div className="prose prose-slate max-w-none">
                                    <h3 className="text-xl font-bold text-slate-900 mb-4">About the project</h3>
                                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{campaign.description}</p>
                                </div>
                             </div>
                        </div>

                        {/* Right Column: Donation Card */}
                        <div className="relative">
                            <div className="sticky top-24 space-y-6">
                                <div className="border border-slate-100 rounded-2xl p-6 shadow-xl shadow-purple-500/5 bg-white">
                                    <div className="space-y-4 mb-6">
                                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-mint-500 to-purple-500" style={{ width: `${progress}%` }} />
                                        </div>
                                        <div>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-3xl font-bold text-mint-600">${campaign.raisedAmount.toLocaleString()}</span>
                                                <span className="text-sm text-slate-500">pledged of ${campaign.goalAmount.toLocaleString()} goal</span>
                                            </div>
                                            <div className="flex justify-between mt-4 text-sm text-slate-600">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-900">{campaign.backersCount}</span>
                                                    <span>backers</span>
                                                </div>
                                                <div className="flex flex-col text-right">
                                                    <span className="font-bold text-slate-900">{daysLeft}</span>
                                                    <span>days to go</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                                            <input 
                                                type="number" 
                                                className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 font-bold text-lg" 
                                                placeholder="Enter amount"
                                                value={donationAmount}
                                                onChange={(e) => setDonationAmount(e.target.value)}
                                            />
                                        </div>
                                        <Button className="w-full h-12 text-lg bg-gradient-to-r from-mint-500 to-purple-600 hover:opacity-90 shadow-lg shadow-purple-500/20" onClick={handleDonate}>
                                            Back this project
                                        </Button>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-slate-100 text-xs text-slate-500 text-center">
                                        <p className="flex items-center justify-center gap-1 mb-2">
                                            <ShieldCheck size={14} className="text-mint-500" />
                                            All or nothing. This project will only be funded if it reaches its goal.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignDetails;
