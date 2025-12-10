import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const CallToAction = () => {
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
        <section className="py-24 relative overflow-hidden">
             <div className="absolute inset-0 bg-slate-900 z-0" />
             <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-mint-900/50 z-0" />
             {/* Abstract Shapes */}
             <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
                 <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-purple-500 rounded-full blur-[150px]" />
                 <div className="absolute -bottom-[20%] -left-[10%] w-[800px] h-[800px] bg-mint-500 rounded-full blur-[150px]" />
             </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                    Ready to Bring Your <br /> Vision to Life?
                </h2>
                <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                    Join thousands of creators who are funding their dreams on FundFlow. Start your campaign today in just a few clicks.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                     <Button onClick={handleStartCampaign} className="h-14 px-8 rounded-full text-lg bg-white text-slate-900 hover:bg-slate-100 shadow-xl transition-transform hover:scale-105">
                        Start a Campaign
                     </Button>
                     <Link to="/auth/signup">
                        <Button variant="outline" className="h-14 px-8 rounded-full text-lg border-white text-white hover:bg-white/10 hover:text-white transition-transform hover:scale-105 bg-transparent">
                            Learn More <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                     </Link>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;
