import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Calculator, Trophy, User, LogOut, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useSupabase } from '../context/SupabaseContext';

const Layout = ({ children }) => {
  const location = useLocation();
  const { user } = useApp();
  const { signOut } = useSupabase();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Tableau de bord' },
    { path: '/history', icon: BookOpen, label: 'Histoire' },
    { path: '/math', icon: Calculator, label: 'Mathématiques' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Top Navigation */}
      <nav className="bg-black/30 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-bold text-lg">Québec Apprentissage</span>
              </Link>
              
              <div className="hidden md:flex space-x-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path || 
                    (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                <Link
                  to="/curriculum"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    location.pathname === '/curriculum'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Curriculum</span>
                </Link>
              </div>
            </div>

            {user && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <span className="text-white font-semibold">Niveau {user.level}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-purple-300">{user.xp} XP</span>
                </div>
                
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg">
                  <User className="w-4 h-4 text-blue-400" />
                  <span className="text-white">{user.name}</span>
                </div>

                <Link
                  to="/settings"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    location.pathname === '/settings'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Paramètres</span>
                </Link>
                
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all text-gray-300 hover:text-white"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Déconnexion</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;

