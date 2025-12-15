import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send, Bot, Sparkles, ChevronRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

const AIAssistant = () => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, type: 'bot', text: "Hi there! I'm your AI assistant. I can help you find projects you'll love based on your backing history. Want some recommendations?" }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleGetRecommendations = async () => {
        if (!user) {
            setMessages(prev => [...prev, 
                { id: Date.now(), type: 'user', text: "Show me recommendations." },
                { id: Date.now()+1, type: 'bot', text: "Please log in so I can personalize recommendations for you!" }
            ]);
            return;
        }

        // Add user message
        setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: "Show me recommendations." }]);
        setIsTyping(true);

        try {
            const res = await fetch(`https://crowdfunding-0rtd.onrender.com/api/campaigns/recommendations/${user.uid}`);
            const data = await res.json();
            
            setTimeout(() => {
                setIsTyping(false);
                if (data.length > 0) {
                     setMessages(prev => [...prev, { 
                        id: Date.now()+1, 
                        type: 'bot', 
                        text: "Here are some projects I think you'll love based on what you've backed:",
                        recommendations: data
                    }]);
                } else {
                     setMessages(prev => [...prev, { id: Date.now()+1, type: 'bot', text: "I couldn't find specific matches yet. Try backing some projects to help me learn your taste!" }]);
                }
            }, 1000); // Fake AI delay

        } catch (error) {
            console.error(error);
            setIsTyping(false);
            setMessages(prev => [...prev, { id: Date.now()+1, type: 'bot', text: "Oops, my circuits are crossed. I couldn't fetch recommendations right now." }]);
        }
    };

    const [inputValue, setInputValue] = useState("");

    const fetchResults = async (query = "") => {
        setIsTyping(true);
        try {
            const endpoint = query 
                ? `https://crowdfunding-0rtd.onrender.com/api/campaigns/search?term=${encodeURIComponent(query)}`
                : `https://crowdfunding-0rtd.onrender.com/api/campaigns/search`; 
            
            const res = await fetch(endpoint);
            const data = await res.json();
            
            setIsTyping(false);
            if (data.length > 0) {
                 setMessages(prev => [...prev, { 
                    id: Date.now()+1, 
                    type: 'bot', 
                    text: query ? `I found ${data.length} projects matching "${query}":` : "Here are the top projects:",
                    recommendations: data
                }]);
            } else {
                 setMessages(prev => [...prev, { id: Date.now()+1, type: 'bot', text: `I couldn't find any projects matching "${query}". Try different keywords!` }]);
            }
        } catch (error) {
            console.error(error);
            setIsTyping(false);
            setMessages(prev => [...prev, { id: Date.now()+1, type: 'bot', text: "Sorry, I encountered an error while searching." }]);
        }
    };

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;
        
        const query = inputValue.trim();
        setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: query }]);
        setInputValue("");
        
        fetchResults(query);
    };

    const handleViewAll = () => {
         setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: "View all projects" }]);
         fetchResults(""); // Empty query = fetch all
    };


    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSendMessage();
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans">
            {/* ... (rest of render logic remains similar, inserting into input area below) */}
            
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[600px] animate-in slide-in-from-bottom-5 duration-300">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
                                <Bot size={20} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">FundFlow AI</h3>
                                <p className="text-xs text-indigo-100 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Online
                                </p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                            <X size={18} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 bg-slate-50 p-4 overflow-y-auto min-h-[300px] max-h-[400px]">
                        <div className="space-y-4">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-sm ${
                                        msg.type === 'user' 
                                            ? 'bg-violet-600 text-white rounded-tr-sm' 
                                            : 'bg-white text-slate-700 border border-slate-100 rounded-tl-sm'
                                    }`}>
                                        <p>{msg.text}</p>
                                        
                                        {/* Recommendations Carousel */}
                                        {msg.recommendations && (
                                            <div className="mt-3 space-y-2">
                                                {msg.recommendations.slice(0, 3).map(rec => (
                                                    <Link key={rec._id} to={`/campaign/${rec._id}`} className="block bg-slate-50 hover:bg-slate-100 rounded-lg p-2 transition-colors border border-slate-200 group">
                                                        <div className="flex gap-3">
                                                            <img src={rec.image} alt="" className="w-12 h-12 rounded-md object-cover bg-slate-200" />
                                                            <div className="flex-1 min-w-0">
                                                                <p className="font-bold text-slate-900 truncate text-xs">{rec.title}</p>
                                                                <p className="text-xs text-slate-500 truncate">{rec.category}</p>
                                                            </div>
                                                            <div className="flex items-center text-violet-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <ChevronRight size={16} />
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                                <button onClick={handleViewAll} className="block w-full text-center text-xs text-violet-600 font-medium hover:underline mt-2">
                                                    View all
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm p-3 shadow-sm flex gap-1 items-center">
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* Quick Actions / Input */}
                    <div className="p-3 bg-white border-t border-slate-100">
                        {messages.length < 3 ? (
                             <Button 
                                onClick={handleGetRecommendations}
                                className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200 justify-start gap-2 h-auto py-3 px-4"
                                variant="outline"
                             >
                                <Sparkles size={16} className="text-indigo-500" />
                                <div className="text-left">
                                    <span className="block font-semibold text-xs">Get Recommendations</span>
                                    <span className="block text-[10px] text-indigo-400 font-normal">Based on your activity</span>
                                </div>
                             </Button>
                        ) : (
                             <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="Type a message..." 
                                    className="w-full bg-slate-100 rounded-full pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                />
                                <button 
                                    className="absolute right-1 top-1 p-1.5 bg-violet-600 rounded-full text-white disabled:opacity-50" 
                                    onClick={handleSendMessage}
                                    disabled={!inputValue.trim()}
                                >
                                    <Send size={14} />
                                </button>
                             </div>
                        )}
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full shadow-lg shadow-indigo-500/30 flex items-center justify-center text-white hover:scale-105 transition-transform group relative"
            >
                {isOpen ? <X size={24} /> : <Bot size={28} className="group-hover:rotate-12 transition-transform" />}
                {!isOpen && (
                    <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>
                )}
            </button>
        </div>
    );
};

export default AIAssistant;
