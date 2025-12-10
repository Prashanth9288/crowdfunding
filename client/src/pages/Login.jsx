import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, Mail, Lock, Zap } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      navigate("/dashboard");
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
    <div className="h-screen w-screen bg-[#F8F7FA] flex items-center justify-center relative overflow-hidden">
       {/* Background Aesthetics */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-100/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-mint-100/30 rounded-full blur-[120px]" />
       </div>

       {/* Back to Home Link - Absolute positioned as per design */}
       <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20">
        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-slate-800 transition-colors font-medium">
            <ArrowLeft size={20} className="mr-2" /> Back to home
        </Link>
       </div>

       {/* Main Card */}
       <div className="bg-white rounded-[32px] w-full max-w-[480px] p-8 md:p-12 shadow-xl shadow-slate-200/40 relative z-10 animate-fade-in-up">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
            <div className="flex items-center gap-2 mb-6">
                 <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-mint-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 transform -rotate-6">
                    <Zap className="w-5 h-5" fill="currentColor" />
                 </div>
                 <span className="text-2xl font-bold text-slate-900">
                    <span className="text-mint-600">Fund</span><span className="text-purple-600">Flow</span>
                 </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Welcome back</h2>
            <p className="text-slate-500 text-sm md:text-base">Sign in to manage your campaigns and back projects</p>
        </div>
      
      <form onSubmit={handleLogin} className="space-y-5">
        <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 block" htmlFor="email">Email</label>
            <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input
                    id="email"
                    type="email"
                    className="pl-11 bg-slate-50 border-slate-200 focus:bg-white focus:border-purple-500 focus:ring-purple-200 transition-all h-12 rounded-xl text-base"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
        </div>
        <div className="space-y-2">
             <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700 block" htmlFor="password">Password</label>
             </div>
            <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input
                    id="password"
                    type="password"
                    className="pl-11 bg-slate-50 border-slate-200 focus:bg-white focus:border-purple-500 focus:ring-purple-200 transition-all h-12 rounded-xl text-base"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                />
            </div>
        </div>
        
        <div className="pt-2">
            <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-mint-500 to-purple-600 hover:opacity-90 hover:shadow-lg hover:shadow-purple-500/30 transition-all text-white font-bold text-base" type="submit" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Sign In"}
            </Button>
        </div>
      </form>
      
      <div className="text-center text-sm mt-8 text-slate-500 font-medium">
        Don't have an account?{" "}
        <Link to="/auth/signup" className="font-bold text-mint-600 hover:text-purple-600 transition-colors">
            Sign up
        </Link>
      </div>
    </div>
    </div>
  );
};

export default Login;

