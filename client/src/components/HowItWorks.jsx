import React from 'react';
import { PenTool, Target, Rocket, Heart, CreditCard } from 'lucide-react';

const steps = [
    {
        icon: PenTool,
        title: "Create",
        description: "Draft your campaign story, set a goal, and add compelling rewards."
    },
    {
        icon: Target,
        title: "Launch",
        description: "Go live and share your project with our global community of backers."
    },
    {
        icon: Rocket,
        title: "Share",
        description: "Use our built-in tools to promote your campaign across social media."
    },
    {
        icon: CreditCard,
        title: "Fund",
        description: "Receive funds securely as backers pledge to support your vision."
    },
    {
        icon: Heart,
        title: "Deliver",
        description: "Bring your project to life and fulfill rewards for your supporters."
    }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-mint-600 font-semibold tracking-wide uppercase text-sm">Simple Process</span>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-3 mb-6">From Idea to Reality in 5 Steps</h2>
                <p className="text-lg text-slate-600">
                    We've streamlined the crowdfunding journey so you can focus on what matters most: creating.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
                 {/* Connecting Line (Desktop) */}
                 <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-mint-200 via-purple-200 to-mint-200 -z-10" />

                 {steps.map((step, index) => (
                     <div key={index} className="relative flex flex-col items-center text-center group">
                        <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-50 shadow-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 z-10">
                            <step.icon className="w-10 h-10 text-purple-600 group-hover:text-mint-500 transition-colors" />
                        </div>
                        <div className="absolute top-0 right-0 -mt-2 -mr-2 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm z-20">
                            {index + 1}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                        <p className="text-slate-500 leading-relaxed text-sm">
                            {step.description}
                        </p>
                     </div>
                 ))}
            </div>
        </div>
    </section>
  );
};

export default HowItWorks;
