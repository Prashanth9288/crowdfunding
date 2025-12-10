import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Zap, LayoutDashboard, FolderOpen, Heart, Settings, LogOut, User, Menu, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

const Sidebar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);

    // Close sidebar on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const handleLogout = async () => {
        try {
            await logout();
            toast({
                title: "Logged out",
                description: "You've been successfully logged out.",
            });
            navigate("/");
        } catch (error) {
            toast({ title: "Error logging out", variant: "destructive" });
        }
    };

    const isActive = (path) => location.pathname === path;

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-8 p-6 pb-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-mint-500 to-purple-600 flex items-center justify-center text-white">
                    <Zap className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold text-slate-900">FundFlow</span>
            </div>

            <nav className="flex-1 space-y-2 px-6">
                <Link to="/dashboard">
                    <Button 
                        variant="ghost" 
                        className={`w-full justify-start gap-3 ${isActive('/dashboard') ? 'bg-purple-50 text-purple-600' : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'}`}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </Button>
                </Link>
                <Link to="/my-campaigns">
                    <Button 
                        variant="ghost" 
                        className={`w-full justify-start gap-3 ${isActive('/my-campaigns') ? 'bg-purple-50 text-purple-600' : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'}`}
                    >
                        <FolderOpen className="w-5 h-5" />
                        My Campaigns
                    </Button>
                </Link>
                <Link to="/backed-projects">
                    <Button 
                        variant="ghost" 
                        className={`w-full justify-start gap-3 ${isActive('/backed-projects') ? 'bg-purple-50 text-purple-600' : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'}`}
                    >
                        <Heart className="w-5 h-5" />
                        Backed Projects
                    </Button>
                </Link>
                <Link to="/settings">
                    <Button 
                        variant="ghost" 
                        className={`w-full justify-start gap-3 ${isActive('/settings') ? 'bg-purple-50 text-purple-600' : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'}`}
                    >
                        <Settings className="w-5 h-5" />
                        Settings
                    </Button>
                </Link>
            </nav>

            <div className="p-6 pt-4 border-t border-slate-200 mt-auto">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-mint-500 to-purple-600 flex items-center justify-center text-white overflow-hidden">
                        {user?.photoURL ? <img src={user.photoURL} alt="avatar" className="w-full h-full object-cover" /> : <User className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate text-slate-900">
                            {user?.displayName || "User"}
                        </p>
                        <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                    </div>
                </div>
                <Button variant="ghost" className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={handleLogout}>
                    <LogOut className="w-5 h-5" />
                    Log Out
                </Button>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Menu Button */}
            <button 
                onClick={() => setIsOpen(true)}
                className="md:hidden fixed top-4 right-4 z-40 p-2 bg-white rounded-lg shadow-sm border border-slate-200"
            >
                <Menu className="w-6 h-6 text-slate-700" />
            </button>

            {/* Mobile Actions Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <aside className={`
                fixed top-0 left-0 z-50 h-full w-56 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0 md:static md:block
            `}>
                <div className="h-full relative">
                    {/* Mobile Close Button */}
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="md:hidden absolute top-4 right-4 p-1 rounded-md hover:bg-slate-100 text-slate-500"
                    >
                        <X size={20} />
                    </button>
                    
                    <SidebarContent />
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
