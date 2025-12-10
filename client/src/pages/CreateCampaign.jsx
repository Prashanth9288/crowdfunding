import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2, UploadCloud } from "lucide-react";

const CreateCampaign = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        goal: "",
        category: "Technology",
        image: "",
        deadline: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Validate
            if (!formData.title || !formData.goal || !formData.deadline) {
                throw new Error("Please fill in all required fields.");
            }

            // Create campaign via API
            const response = await fetch('http://localhost:5000/api/campaigns', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}` // TODO: Add token
                },
                body: JSON.stringify({
                    ...formData,
                    creator: user.displayName || 'Anonymous', // Simplified for now
                    creatorId: user.uid,
                    image: formData.image || "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1000",
                })
            });

            if (!response.ok) throw new Error("Failed to create campaign");

            toast({
                title: "Campaign Created!",
                description: "Your project is now live.",
            });
            navigate("/my-campaigns");

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
            <div className="max-w-2xl mx-auto">
                <Button variant="ghost" className="mb-6 pl-0 text-slate-500 hover:text-slate-900" onClick={() => navigate(-1)}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900">Start a Campaign</h1>
                        <p className="text-slate-500 mt-2">Bring your creative project to life.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                             <label htmlFor="title" className="text-sm font-medium text-slate-700">Campaign Title</label>
                             <Input id="title" placeholder="e.g., The Next Gen Smartwatch" value={formData.title} onChange={handleChange} required />
                        </div>

                        <div className="space-y-2">
                             <label htmlFor="description" className="text-sm font-medium text-slate-700">Description</label>
                             <textarea 
                                id="description" 
                                className="flex min-h-[120px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Tell your story..." 
                                value={formData.description} 
                                onChange={handleChange}
                             />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <label htmlFor="goal" className="text-sm font-medium text-slate-700">Funding Goal ($)</label>
                                <Input id="goal" type="number" placeholder="10000" value={formData.goal} onChange={handleChange} required />
                             </div>
                             <div className="space-y-2">
                                <label htmlFor="category" className="text-sm font-medium text-slate-700">Category</label>
                                <select 
                                    id="category" 
                                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    <option value="Technology">Technology</option>
                                    <option value="Art">Art</option>
                                    <option value="Film">Film</option>
                                    <option value="Music">Music</option>
                                    <option value="Games">Games</option>
                                </select>
                             </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="deadline" className="text-sm font-medium text-slate-700">End Date</label>
                            <Input id="deadline" type="date" value={formData.deadline} onChange={handleChange} required />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="image" className="text-sm font-medium text-slate-700">Cover Image URL</label>
                            <Input id="image" placeholder="https://..." value={formData.image} onChange={handleChange} />
                            <p className="text-xs text-slate-400">Provide a direct link to an image.</p>
                        </div>

                        <div className="pt-4">
                            <Button type="submit" className="w-full bg-gradient-to-r from-mint-500 to-purple-600 hover:opacity-90 text-white h-12 text-lg" disabled={loading}>
                                {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Launch Campaign"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCampaign;
