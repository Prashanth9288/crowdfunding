import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
    {
        quote: "FundFlow made it incredibly easy to reach my target audience. The tools are intuitive and the community is supportive.",
        author: "Sarah Jenkins",
        role: "Product Designer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    {
        quote: "I was skeptical about crowdfunding, but FundFlow's analytics and guidance helped me exceed my goal by 200%.",
        author: "David Chen",
        role: "Indie Game Developer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
    },
    {
        quote: "The best platform for creators. Seamless payment processing and beautiful campaign pages that convert.",
        author: "Elena Rodriguez",
        role: "Filmmaker",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena"
    }
];

const Testimonials = () => {
    return (
        <section className="py-24 bg-slate-50 relative">
             <div className="absolute top-10 left-10 w-20 h-20 bg-purple-200 rounded-full blur-2xl opacity-60" />
             <div className="absolute bottom-10 right-10 w-32 h-32 bg-mint-200 rounded-full blur-3xl opacity-60" />

            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">Creators Love FundFlow</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Don't just take our word for it. Hear from the visionaries who brought their dreams to life.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100 flex flex-col">
                            <div className="flex gap-1 mb-6 text-yellow-400">
                                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                            </div>
                            <p className="text-slate-700 italic mb-8 flex-1">"{t.quote}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden">
                                    <img src={t.avatar} alt={t.author} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{t.author}</h4>
                                    <p className="text-xs text-slate-500 uppercase tracking-wide">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
