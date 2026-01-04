import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Home, BookOpen, Calculator, Trophy, User, LogOut, Settings, Shield, Menu, X, ChevronDown, Layers, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useSupabase } from '../context/SupabaseContext';
import { useAdmin } from '../context/AdminContext';
import { favoritesService } from '../services/favoritesService';

const Layout = ({ children }) => {
  const location = useLocation();
  const { user } = useApp();
  const { signOut } = useSupabase();
  const { isAdmin } = useAdmin();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modulesMenuOpen, setModulesMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const modulesMenuRef = useRef(null);
  const userMenuRef = useRef(null);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Close dropdown menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modulesMenuRef.current && !modulesMenuRef.current.contains(event.target)) {
        setModulesMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    if (modulesMenuOpen || userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modulesMenuOpen, userMenuOpen]);

  const moduleItems = [
    { path: '/history', icon: BookOpen, label: 'Histoire' },
    { path: '/math', icon: Calculator, label: 'Mathématiques' },
  ];

  const isModuleActive = moduleItems.some(item => 
    location.pathname === item.path || 
    (item.path !== '/curriculum' && location.pathname.startsWith(item.path))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Top Navigation */}
      <nav className="bg-black/30 backdrop-blur-md border-b border-blue-500/20 relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 md:space-x-6">
              {/* Logo only */}
              <Link to="/dashboard" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
              </Link>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                {/* Dashboard */}
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                    location.pathname === '/dashboard'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                  title="Tableau de bord"
                >
                  <Home className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden lg:inline whitespace-nowrap">Tableau de bord</span>
                </Link>

                {/* Modules Dropdown */}
                <div className="relative z-[100]" ref={modulesMenuRef}>
                  <button
                    onClick={() => setModulesMenuOpen(!modulesMenuOpen)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                      isModuleActive
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Layers className="w-4 h-4" />
                    <span>Modules</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${modulesMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {modulesMenuOpen && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-slate-800/95 backdrop-blur-md rounded-lg border border-blue-500/20 shadow-xl z-[9999] py-2">
                      {/* Default Modules */}
                      {moduleItems.length > 0 && (
                        <>
                          {moduleItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path || 
                              location.pathname.startsWith(item.path);
                            return (
                              <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setModulesMenuOpen(false)}
                                className={`flex items-center space-x-2 px-4 py-2 transition-all ${
                                  isActive
                                    ? 'bg-blue-500/20 text-blue-300'
                                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                                <span>{item.label}</span>
                              </Link>
                            );
                          })}
                          {favorites.filter(fav => fav.item_type === 'subject').length > 0 && (
                            <div className="border-t border-white/10 my-2"></div>
                          )}
                        </>
                      )}
                      
                      {/* Favorites */}
                      {favorites
                        .filter(fav => fav.item_type === 'subject')
                        .map((fav) => {
                          const isActive = location.pathname === fav.item_path || 
                            location.pathname.startsWith(fav.item_path);
                          return (
                            <Link
                              key={fav.id}
                              to={fav.item_path}
                              onClick={() => setModulesMenuOpen(false)}
                              className={`flex items-center space-x-2 px-4 py-2 transition-all ${
                                isActive
                                  ? 'bg-blue-500/20 text-blue-300'
                                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
                              }`}
                            >
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              <span className="flex-1">{fav.item_name}</span>
                            </Link>
                          );
                        })}
                      
                      {favorites.filter(fav => fav.item_type === 'subject').length === 0 && moduleItems.length === 0 && (
                        <div className="px-4 py-2 text-gray-400 text-sm">
                          Aucun module disponible
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Curriculum */}
                <Link
                  to="/curriculum"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                    location.pathname === '/curriculum'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Curriculum</span>
                </Link>

                {/* Teaching (Admin) */}
                {isAdmin && (
                  <Link
                    to="/admin"
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                      location.pathname.startsWith('/admin')
                        ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Shield className="w-4 h-4" />
                    <span>Teaching</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Desktop User Menu */}
            {user && (
              <div className="hidden md:flex items-center space-x-3">
                {/* XP and Level on single line */}
                <div className="flex items-center space-x-3 bg-white/10 px-3 py-2 rounded-lg">
                  <div className="flex items-center space-x-1.5">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span className="text-blue-300 font-semibold">{user.xp || 0} XP</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span className="text-white font-semibold">Niveau {user.level || 1}</span>
                  </div>
                </div>
                
                {/* User Dropdown */}
                <div className="relative z-[100]" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-all text-gray-300 hover:text-white"
                  >
                    <User className="w-4 h-4 text-blue-400" />
                    <span className="text-white">{user.name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute top-full right-0 mt-1 w-48 bg-slate-800/95 backdrop-blur-md rounded-lg border border-blue-500/20 shadow-xl z-[9999] py-2">
                      <Link
                        to="/settings"
                        onClick={() => setUserMenuOpen(false)}
                        className={`flex items-center space-x-2 px-4 py-2 transition-all ${
                          location.pathname === '/settings'
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'text-gray-300 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Paramètres</span>
                      </Link>
                      
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          handleSignOut();
                        }}
                        className="w-full flex items-center space-x-2 px-4 py-2 transition-all text-gray-300 hover:bg-white/10 hover:text-white"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Déconnexion</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-white/10 py-4 space-y-2">
              {/* Dashboard */}
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  location.pathname === '/dashboard'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Home className="w-5 h-5" />
                <span>Tableau de bord</span>
              </Link>

              {/* Modules Section */}
              <div className="space-y-1">
                <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Modules
                </div>
                {moduleItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path || 
                    location.pathname.startsWith(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                
                {/* Favorites in Mobile Menu */}
                {favorites.filter(fav => fav.item_type === 'subject').length > 0 && (
                  <>
                    {moduleItems.length > 0 && (
                      <div className="border-t border-white/10 my-2"></div>
                    )}
                    {favorites
                      .filter(fav => fav.item_type === 'subject')
                      .map((fav) => {
                        const isActive = location.pathname === fav.item_path || 
                          location.pathname.startsWith(fav.item_path);
                        return (
                          <Link
                            key={fav.id}
                            to={fav.item_path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                              isActive
                                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                                : 'text-gray-300 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            <span>{fav.item_name}</span>
                          </Link>
                        );
                      })}
                  </>
                )}
              </div>

              {/* Curriculum */}
              <Link
                to="/curriculum"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  location.pathname === '/curriculum'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <BookOpen className="w-5 h-5" />
                <span>Curriculum</span>
              </Link>

              {/* Teaching (Admin) */}
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    location.pathname.startsWith('/admin')
                      ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Shield className="w-5 h-5" />
                  <span>Teaching</span>
                </Link>
              )}
              
              {user && (
                <>
                  <div className="border-t border-white/10 pt-4 mt-4 space-y-2">
                    {/* XP and Level on single line */}
                    <div className="flex items-center justify-between bg-white/10 px-4 py-3 rounded-lg">
                      <div className="flex items-center space-x-1.5">
                        <Trophy className="w-5 h-5 text-yellow-400" />
                        <span className="text-blue-300 font-semibold">{user.xp || 0} XP</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Trophy className="w-5 h-5 text-yellow-400" />
                        <span className="text-white font-semibold">Niveau {user.level || 1}</span>
                      </div>
                    </div>
                    
                    {/* User Section */}
                    <div className="space-y-1">
                      <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        {user.name}
                      </div>
                      <Link
                        to="/settings"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                          location.pathname === '/settings'
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                            : 'bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white'
                        }`}
                      >
                        <Settings className="w-5 h-5" />
                        <span>Paramètres</span>
                      </Link>
                      
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          handleSignOut();
                        }}
                        className="w-full flex items-center space-x-3 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-lg transition-all text-gray-300 hover:text-white"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Déconnexion</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
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

