import { useState } from 'react';
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { User, Lock, Save, Loader2 } from "lucide-react";

const Settings = () => {
    const { user, updateUser, updateUserPassword } = useAuth();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    
    // Form States
    const [displayName, setDisplayName] = useState(user?.displayName || "");
    const [isEditingProfile, setIsEditingProfile] = useState(false);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await updateUser({ displayName });
            toast({ title: "Profile Updated", description: "Your profile information has been saved." });
            setIsEditingProfile(false);
        } catch (error) {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast({ title: "Passwords match error", description: "Passwords do not match.", variant: "destructive" });
            return;
        }
        if (password.length < 6) {
             toast({ title: "Weak password", description: "Password must be at least 6 characters.", variant: "destructive" });
             return;
        }

        setIsLoading(true);
        try {
            await updateUserPassword(password);
            toast({ title: "Password Updated", description: "Your password has been changed successfully." });
            setPassword("");
            setConfirmPassword("");
            setIsChangingPassword(false);
        } catch (error) {
            toast({ title: "Error", description: error.message || "msg: Requires recent login", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex bg-slate-50 min-h-screen">
            <Sidebar />
            <main className="flex-1 md:ml-56 p-8">
                <div className="max-w-2xl mx-auto space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
                        <p className="text-slate-500 mt-2">Manage your account settings and preferences.</p>
                    </div>

                    {/* Profile Section */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-violet-100 rounded-lg text-violet-600">
                                    <User size={20} />
                                </div>
                                <h2 className="font-semibold text-slate-900">Personal Information</h2>
                            </div>
                            {!isEditingProfile && (
                                <Button variant="outline" size="sm" onClick={() => setIsEditingProfile(true)}>
                                    Edit Details
                                </Button>
                            )}
                        </div>
                        
                        <div className="p-6">
                            <form onSubmit={handleUpdateProfile} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Display Name</label>
                                    <input 
                                        type="text" 
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        disabled={!isEditingProfile}
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:bg-slate-50 disabled:text-slate-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                    <input 
                                        type="email" 
                                        value={user?.email || ""}
                                        disabled
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-slate-50 text-slate-500 cursor-not-allowed"
                                    />
                                    <p className="text-xs text-slate-400 mt-1">Email cannot be changed directly.</p>
                                </div>

                                {isEditingProfile && (
                                    <div className="flex gap-2 pt-2">
                                        <Button type="submit" disabled={isLoading} className="bg-violet-600 text-white hover:bg-violet-700">
                                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Save Changes
                                        </Button>
                                        <Button type="button" variant="ghost" onClick={() => setIsEditingProfile(false)} disabled={isLoading}>
                                            Cancel
                                        </Button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>

                    {/* Password Section */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                                    <Lock size={20} />
                                </div>
                                <h2 className="font-semibold text-slate-900">Security</h2>
                            </div>
                            {!isChangingPassword && (
                                <Button variant="outline" size="sm" onClick={() => setIsChangingPassword(true)}>
                                    Change Password
                                </Button>
                            )}
                        </div>

                        {isChangingPassword && (
                            <div className="p-6 bg-slate-50/50">
                                <form onSubmit={handleChangePassword} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                                        <input 
                                            type="password" 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            placeholder="Min. 6 characters"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                                        <input 
                                            type="password" 
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            placeholder="Re-enter new password"
                                        />
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        <Button type="submit" disabled={isLoading} className="bg-indigo-600 text-white hover:bg-indigo-700">
                                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Update Password
                                        </Button>
                                        <Button type="button" variant="ghost" onClick={() => { setIsChangingPassword(false); setPassword(""); setConfirmPassword(""); }} disabled={isLoading}>
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        )}
                        {!isChangingPassword && (
                             <div className="p-6 text-sm text-slate-500">
                                Password last changed: <span className="font-medium text-slate-700">Unknown (Managed by Firebase)</span>
                             </div>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Settings;
