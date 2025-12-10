import React from 'react';
import { Clock, Users } from 'lucide-react';

const CampaignCard = ({ title, author, raised, goal, daysLeft, image, category, isFeatured }) => {
  // Ensure we don't divide by zero
  const progress = goal > 0 ? Math.min((raised / goal) * 100, 100) : 0;

  return (
    <div className="bg-white rounded-3xl overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 h-full flex flex-col">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Overlays */}
        <div className="absolute top-4 left-4 flex gap-2">
            {category && (
                <span className="px-3 py-1 rounded-full bg-mint-500/90 backdrop-blur-sm text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
                    {category}
                </span>
            )}
        </div>

        {isFeatured && (
            <div className="absolute top-4 right-4">
                 <span className="px-3 py-1 rounded-full bg-purple-600/90 backdrop-blur-sm text-[10px] font-bold text-white uppercase tracking-wider shadow-sm flex items-center gap-1">
                    Featured
                </span>
            </div>
        )}

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
            <button className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-all hover:bg-mint-500 hover:text-white shadow-lg">
                View Project
            </button>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-purple-600 transition-colors">
          {title}
        </h3>
        
        <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-1">
            Revolutionize your daily life with this innovative solution designed for {category?.toLowerCase() || 'creators'}.
        </p>

        <div className="space-y-3 mt-auto">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-mint-600">${raised.toLocaleString()}</span>
            <span className="text-slate-400">of ${goal.toLocaleString()}</span>
          </div>
          
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-mint-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-50 mt-4">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
                <Users size={16} className="text-purple-400" />
                <span>{(raised / 100).toFixed(0)}</span>
            </div>
             <div className="flex items-center gap-2 text-slate-500 text-sm">
                <Clock size={16} className="text-mint-400" />
                <span>{daysLeft} days left</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
