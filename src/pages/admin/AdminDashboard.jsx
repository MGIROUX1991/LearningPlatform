import { Link } from 'react-router-dom';
import { BookOpen, Settings, Users, FileText, BarChart3, FileText as FileTextIcon } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const AdminDashboard = () => {
  const { isAdmin, loading } = useAdmin();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-md w-full bg-gradient-to-br from-red-900/40 to-orange-900/40 backdrop-blur-md rounded-2xl p-8 border border-red-500/20 shadow-2xl text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Accès refusé</h1>
          <p className="text-gray-300">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          </p>
        </div>
      </div>
    );
  }

  const adminModules = [
    {
      id: 'lessons',
      name: 'Gestion des leçons',
      description: 'Créer, modifier et supprimer des leçons',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-600',
      path: '/admin/lessons',
    },
    {
      id: 'context-pages',
      name: 'Pages de contexte',
      description: 'Gérer les pages wiki (personnages, lieux, événements)',
      icon: FileTextIcon,
      color: 'from-purple-500 to-pink-600',
      path: '/admin/context-pages',
    },
    {
      id: 'users',
      name: 'Gestion des utilisateurs',
      description: 'Voir et gérer les utilisateurs',
      icon: Users,
      color: 'from-green-500 to-emerald-600',
      path: '/admin/users',
    },
    {
      id: 'analytics',
      name: 'Analytiques',
      description: 'Statistiques et rapports',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-600',
      path: '/admin/analytics',
    },
    {
      id: 'settings',
      name: 'Paramètres',
      description: 'Configuration de la plateforme',
      icon: Settings,
      color: 'from-amber-500 to-orange-600',
      path: '/admin/settings',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Tableau de bord administrateur</h1>
        <p className="text-gray-400">Gérez le contenu et les utilisateurs de la plateforme</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {adminModules.map((module) => {
          const Icon = module.icon;
          return (
            <Link
              key={module.id}
              to={module.path}
              className="block group"
            >
              <div className={`bg-gradient-to-br ${module.color} rounded-2xl p-6 border-2 border-transparent hover:border-white/20 transition-all group-hover:scale-105`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{module.name}</h3>
                <p className="text-white/80 text-sm">{module.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;

