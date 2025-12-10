import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Menu, X, Search } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth(); // Get user and logout
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStartCampaign = () => {
      if (user) {
          navigate("/create-campaign");
      } else {
          navigate("/auth/signup");
      }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'glass py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-mint-500 to-purple-600 flex items-center justify-center text-white font-bold">
            F
          </div>
          <span className="text-slate-800">FundFlow</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/discover" className="text-slate-600 hover:text-purple-600 transition-colors font-medium">Discover</Link>
          <button onClick={handleStartCampaign} className="text-slate-600 hover:text-purple-600 transition-colors font-medium">Start a Campaign</button>
          <Link to="/how-it-works" className="text-slate-600 hover:text-purple-600 transition-colors font-medium">How it Works</Link>
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="p-2 text-slate-600 hover:text-purple-600 transition-colors">
            <Search size={20} />
          </button>
          
          {user ? (
             <div className="flex items-center gap-4">
                 <Link to="/dashboard" className="font-medium text-slate-900 hover:text-purple-600">Dashboard</Link>
                 <button onClick={logout} className="px-5 py-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium transition-colors">Log Out</button>
             </div>
          ) : (
             <>
                <Link to="/auth/login" className="text-slate-600 hover:text-purple-600 font-medium px-4 py-2">
                    Log In
                </Link>
                <Link to="/auth/signup" className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition-all shadow-lg hover:shadow-slate-900/20">
                    Sign Up
                </Link>
             </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass border-t border-slate-200/50 p-6 flex flex-col space-y-4 animate-fade-in-up">
          <Link to="/discover" className="text-lg font-medium text-slate-700">Discover Projects</Link>
          <button onClick={handleStartCampaign} className="text-lg font-medium text-slate-700 text-left">Start a Campaign</button>
          <Link to="/how-it-works" className="text-lg font-medium text-slate-700">How it Works</Link>
          <hr className="border-slate-200" />
          {user ? (
               <>
                 <Link to="/dashboard" className="text-lg font-medium text-slate-700">Dashboard</Link>
                 <button onClick={logout} className="text-lg font-medium text-red-500 text-left">Log Out</button>
               </>
          ) : (
               <>
                <Link to="/auth/login" className="text-lg font-medium text-slate-700">Log In</Link>
                <Link to="/auth/signup" className="text-lg font-medium text-white bg-slate-900 px-4 py-3 rounded-xl text-center">Sign Up</Link>
               </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
