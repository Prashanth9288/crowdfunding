import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '@/context/AuthContext';

const Hero = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleStartCampaign = () => {
    if (user) {
      navigate('/create-campaign');
    } else {
      navigate('/auth/signup');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 w-full h-full bg-slate-50">
         <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-400/30 rounded-full blur-[100px] animate-pulse" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-mint-400/30 rounded-full blur-[100px] animate-pulse delay-700" />
         <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/40 shadow-sm mb-8 animate-fade-in-up">
          <span className="flex h-2 w-2 rounded-full bg-mint-500"></span>
          <span className="text-sm font-medium text-slate-600">No. 1 Platform for Creative Startups</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-tight animate-fade-in-up delay-100">
          Fund the Future, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint-500 to-purple-600"> One Pledge at a Time.</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
          Transform your visionary ideas into reality with FundFlow. 
          The most trusted crowdfunding community for creators, tech enthusiasts, and changemakers.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
           <Button onClick={handleStartCampaign} className="h-14 px-8 rounded-full text-lg bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/20 transition-all hover:scale-105">
             Start a Campaign
           </Button>
           <Link to="/auth/signup">
              <Button variant="outline" className="h-14 px-8 rounded-full text-lg border-2 border-slate-200 bg-white/50 backdrop-blur-sm hover:bg-white hover:border-slate-300 transition-all hover:scale-105">
                Discover Projects <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
           </Link>
        </div>

        {/* Metrics/Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-5xl mx-auto animate-fade-in-up delay-500">
            {[
              { label: "Total Raised", value: "$42M+", icon: TrendingUp },
              { label: "Successful Projects", value: "15k+", icon: Sparkles },
              { label: "Trust Score", value: "99%", icon: ShieldCheck },
              { label: "Global Backers", value: "2M+", icon: ArrowRight } // Placeholder icon
            ].map((stat, i) => (
               <div key={i} className="p-6 rounded-2xl bg-white/40 backdrop-blur-md border border-white/50 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-center gap-2 mb-2 text-purple-600">
                     <stat.icon size={20} />
                  </div>
                  <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
               </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
