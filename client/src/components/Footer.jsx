import React from 'react';
import { Zap, Twitter, Facebook, Instagram, Linkedin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
                    <div className="col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                             <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-mint-500 to-purple-600 flex items-center justify-center text-white">
                                <Zap className="w-5 h-5" />
                             </div>
                             <span className="text-xl font-bold text-slate-900">FundFlow</span>
                        </div>
                        <p className="text-slate-500 mb-6 max-w-sm leading-relaxed">
                            Empowering creators to bring their projects to life through the power of community funding. Built with love for the future.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Facebook, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-purple-100 hover:text-purple-600 transition-colors">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Explore</h4>
                        <ul className="space-y-4 text-slate-500">
                            <li><Link to="/discover" className="hover:text-purple-600 transition-colors">Discover Projects</Link></li>
                            <li><Link to="/trending" className="hover:text-purple-600 transition-colors">Trending</Link></li>
                            <li><Link to="/newest" className="hover:text-purple-600 transition-colors">Newest</Link></li>
                            <li><Link to="/popular" className="hover:text-purple-600 transition-colors">Popular</Link></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Resources</h4>
                        <ul className="space-y-4 text-slate-500">
                            <li><Link to="/help" className="hover:text-purple-600 transition-colors">Help Center</Link></li>
                            <li><Link to="/guidelines" className="hover:text-purple-600 transition-colors">Guidelines</Link></li>
                            <li><Link to="/blog" className="hover:text-purple-600 transition-colors">Blog</Link></li>
                            <li><Link to="/careers" className="hover:text-purple-600 transition-colors">Careers</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Legal</h4>
                        <ul className="space-y-4 text-slate-500">
                            <li><Link to="/privacy" className="hover:text-purple-600 transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-purple-600 transition-colors">Terms of Service</Link></li>
                            <li><Link to="/cookie" className="hover:text-purple-600 transition-colors">Cookie Policy</Link></li>
                            <li><Link to="/accessibility" className="hover:text-purple-600 transition-colors">Accessibility</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-sm">
                        &copy; {new Date().getFullYear()} FundFlow Inc. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                        <span>Made with</span>
                        <Heart size={14} className="text-red-500 fill-red-500" />
                        <span>by Builders</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
