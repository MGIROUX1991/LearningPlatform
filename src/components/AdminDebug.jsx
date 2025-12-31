import { useState } from 'react';
import { useSupabase } from '../context/SupabaseContext';
import { useAdmin } from '../context/AdminContext';
import { adminService } from '../services/adminService';
import { RefreshCw, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const AdminDebug = () => {
  const { user } = useSupabase();
  const { isAdmin, loading, refreshAdminStatus } = useAdmin();
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState(null);

  const manualCheck = async () => {
    if (!user) return;
    setChecking(true);
    setResult(null);
    try {
      const status = await adminService.checkIsAdmin(user.id);
      setResult({
        success: true,
        isAdmin: status,
        message: status ? 'You are an admin!' : 'You are not an admin',
      });
    } catch (error) {
      setResult({
        success: false,
        isAdmin: false,
        message: error.message || 'Error checking admin status',
      });
    } finally {
      setChecking(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4 text-yellow-300 text-sm">
        <AlertCircle className="w-5 h-5 inline mr-2" />
        Not logged in
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20">
      <h3 className="text-xl font-bold text-white mb-4">Admin Status Debug</h3>
      
      <div className="space-y-4">
        <div>
          <p className="text-gray-300 text-sm mb-1">User ID:</p>
          <p className="text-white font-mono text-xs bg-white/5 p-2 rounded">{user.id}</p>
        </div>
        
        <div>
          <p className="text-gray-300 text-sm mb-1">Email:</p>
          <p className="text-white">{user.email}</p>
        </div>

        <div>
          <p className="text-gray-300 text-sm mb-1">Admin Status (from context):</p>
          <div className="flex items-center space-x-2">
            {loading ? (
              <span className="text-gray-400">Loading...</span>
            ) : isAdmin ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-semibold">Admin</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-semibold">Not Admin</span>
              </>
            )}
          </div>
        </div>

        {result && (
          <div className={`p-4 rounded-lg ${
            result.success && result.isAdmin
              ? 'bg-green-500/20 border border-green-500/50'
              : result.success
              ? 'bg-yellow-500/20 border border-yellow-500/50'
              : 'bg-red-500/20 border border-red-500/50'
          }`}>
            <p className={`text-sm ${
              result.success && result.isAdmin
                ? 'text-green-300'
                : result.success
                ? 'text-yellow-300'
                : 'text-red-300'
            }`}>
              {result.message}
            </p>
          </div>
        )}

        <div className="flex space-x-2">
          <button
            onClick={manualCheck}
            disabled={checking}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg disabled:opacity-50 transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${checking ? 'animate-spin' : ''}`} />
            <span>Manual Check</span>
          </button>
          <button
            onClick={refreshAdminStatus}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg disabled:opacity-50 transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Context</span>
          </button>
        </div>

        <div className="text-xs text-gray-400 mt-4">
          <p>If you just added yourself as admin in Supabase:</p>
          <ol className="list-decimal list-inside space-y-1 mt-2">
            <li>Click "Manual Check" to verify the database</li>
            <li>Click "Refresh Context" to update the UI</li>
            <li>If still not working, check browser console for errors</li>
            <li>Verify the admin_users table exists and has your user ID</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AdminDebug;

