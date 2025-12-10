import React, { useState, useEffect } from 'react';
import { Users, Zap, Heart, Award, Shield, Bell, Star } from 'lucide-react';

const LIVE_ACTIVITY = [
  { id: 1, user: "Sarah M.", action: "backed", project: "NeuroPod", time: "2s ago", amount: 50, avatar: "SM", color: "bg-emerald-100 text-emerald-600" },
  { id: 2, user: "Alex K.", action: "backed", project: "EcoCharge", time: "15s ago", amount: 100, avatar: "AK", color: "bg-blue-100 text-blue-600" },
  { id: 3, user: "Jordan P.", action: "backed", project: "CodeMentor AI", time: "32s ago", amount: 25, avatar: "JP", color: "bg-slate-100 text-slate-600" },
  { id: 4, user: "Taylor R.", action: "backed", project: "AeroDesk", time: "1m ago", amount: 75, avatar: "TR", color: "bg-indigo-100 text-indigo-600" },
  { id: 5, user: "Morgan L.", action: "backed", project: "QuantumKey", time: "2m ago", amount: 150, avatar: "ML", color: "bg-purple-100 text-purple-600" },
];

const BADGES = [
  { id: 1, icon: Award, title: "Early Bird", desc: "First 100 backers", color: "text-pink-500", bg: "bg-pink-50" },
  { id: 2, icon: Zap, title: "Power Backer", desc: "10+ projects backed", color: "text-amber-500", bg: "bg-amber-50" },
  { id: 3, icon: Shield, title: "Founder", desc: "Successful campaign creator", color: "text-rose-500", bg: "bg-rose-50" },
  { id: 4, icon: Star, title: "Community Star", desc: "Top contributor", color: "text-yellow-500", bg: "bg-yellow-50" },
];

const UPDATES = [
  { id: 1, project: "NeuroPod Team", time: "2 hours ago", title: "Production Update: Units Shipping Next Week!", likes: 234, avatar: "N", color: "bg-slate-800 text-white" },
  { id: 2, project: "EcoCharge", time: "5 hours ago", title: "New Stretch Goal Unlocked: Fast Charging", likes: 156, avatar: "E", color: "bg-emerald-600 text-white" },
  { id: 3, project: "CodeMentor AI", time: "1 day ago", title: "Beta Access Now Available for All Backers", likes: 412, avatar: "C", color: "bg-blue-600 text-white" },
];

const Community = () => {
  const [activeUsers] = useState(12453);

  return (
    <section className="py-24 bg-mint-50/50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-mint-200/20 rounded-full blur-3xl -z-10 animate-pulse delay-700" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-100 shadow-sm text-slate-600 text-xs font-semibold uppercase tracking-wider mb-4">
            <Users size={12} className="text-purple-600" /> Community
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Join a Thriving <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint-500 to-purple-600">Community</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Connect with creators and backers who share your passion for innovation.
          </p>
        </div>

        {/* content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Card 1: Live Activity */}
          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col h-full transform hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center gap-2 mb-6 text-slate-900 font-bold text-lg">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
              Live Activity
            </div>
            <div className="space-y-4 flex-1 overflow-hidden relative">
               {/* Mask to fade out bottom */}
               <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent z-10" />
               
              {LIVE_ACTIVITY.map((item) => (
                <div key={item.id} className="flex items-center justify-between group p-2 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center font-bold text-sm shadow-sm`}>
                      {item.avatar}
                    </div>
                    <div className="text-sm">
                      <p className="text-slate-900 font-medium leading-tight">
                        {item.user} <span className="text-slate-500 font-normal">backed</span> <span className="text-mint-600 font-medium">{item.project}</span>
                      </p>
                      <p className="text-slate-400 text-xs mt-0.5">{item.time}</p>
                    </div>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold group-hover:bg-purple-100 group-hover:text-purple-600 transition-colors">
                    ${item.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Backer Badges */}
          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col h-full transform hover:scale-[1.02] transition-transform duration-300 delay-100">
             <div className="flex items-center gap-2 mb-6 text-slate-900 font-bold text-lg">
              <Award className="text-purple-500" size={20} />
              Backer Badges
            </div>
            
            <div className="grid grid-cols-2 gap-4 h-full">
              {BADGES.map((badge) => (
                <div key={badge.id} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center group hover:bg-white hover:shadow-lg hover:border-purple-100 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-full ${badge.bg} ${badge.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <badge.icon size={24} fill="currentColor" className="opacity-80" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">{badge.title}</h4>
                  <p className="text-xs text-slate-500">{badge.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-500">Earn badges as you support projects and engage with the community.</p>
            </div>
          </div>

          {/* Card 3: Creator Updates */}
          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col h-full transform hover:scale-[1.02] transition-transform duration-300 delay-200">
             <div className="flex items-center gap-2 mb-6 text-slate-900 font-bold text-lg">
              <Bell className="text-mint-500" size={20} />
              Creator Updates
            </div>
            
             <div className="space-y-4">
              {UPDATES.map((update) => (
                <div key={update.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md hover:border-mint-200 transition-all duration-300 group">
                   <div className="flex items-center gap-3 mb-2">
                      <div className={`w-8 h-8 rounded-full ${update.color} flex items-center justify-center font-bold text-xs`}>
                        {update.avatar}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 leading-none">{update.project}</h4>
                        <span className="text-xs text-slate-400">{update.time}</span>
                      </div>
                   </div>
                   <p className="text-sm text-slate-600 font-medium mb-3 pl-11 line-clamp-2">
                    {update.title}
                   </p>
                   <div className="pl-11 flex items-center gap-4">
                     <button className="flex items-center gap-1.5 text-xs text-slate-400 font-medium group-hover:text-pink-500 transition-colors">
                        <Heart size={14} className="group-hover:fill-pink-500 transition-colors" /> {update.likes}
                     </button>
                   </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Community;
