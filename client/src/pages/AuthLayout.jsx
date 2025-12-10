import { Outlet, Link } from "react-router-dom";
import { Zap } from "lucide-react";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-mint-500 to-purple-600 flex items-center justify-center text-white">
             <Zap size={24} />
          </div>
          <span className="text-2xl font-bold text-slate-900">FundFlow</span>
        </Link>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-slate-100">
           <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
