import { Link, Navigate } from 'react-router-dom';
import { useSupabase } from '../context/SupabaseContext';
import { 
  BookOpen, 
  Calculator, 
  Trophy, 
  Target, 
  Zap, 
  Users, 
  Award,
  ArrowRight,
  CheckCircle,
  Flame,
  TrendingUp,
  Globe
} from 'lucide-react';

const Landing = () => {
  const { user, loading } = useSupabase();

  // Redirect to dashboard if already logged in
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  const features = [
    {
      icon: BookOpen,
      title: 'Curriculum Québécois',
      description: 'Aligned with the official Quebec Education Program for Secondary 1-5',
      color: 'from-amber-500 to-orange-600',
    },
    {
      icon: Trophy,
      title: 'Gamification',
      description: 'Earn XP, level up, and unlock achievements as you learn',
      color: 'from-yellow-500 to-amber-600',
    },
    {
      icon: Target,
      title: 'Daily Quests',
      description: 'Complete daily challenges to maintain your learning streak',
      color: 'from-purple-500 to-pink-600',
    },
    {
      icon: Zap,
      title: 'Interactive Learning',
      description: 'Engaging lessons with immersive activities and quizzes',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: Users,
      title: 'For Homeschoolers',
      description: 'Designed specifically for Quebec homeschool students',
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: Award,
      title: 'Progress Tracking',
      description: 'Monitor your progress across all subjects and competencies',
      color: 'from-red-500 to-rose-600',
    },
  ];

  const subjects = [
    {
      name: 'Histoire',
      description: 'Explore Nouvelle-France with immersive scroll-based lessons',
      icon: BookOpen,
      color: 'from-amber-500 to-orange-600',
    },
    {
      name: 'Mathématiques',
      description: 'Master skills through interactive problem-solving',
      icon: Calculator,
      color: 'from-blue-500 to-cyan-600',
    },
    {
      name: 'Français',
      description: 'Develop reading, writing, and communication skills',
      icon: BookOpen,
      color: 'from-green-500 to-emerald-600',
    },
    {
      name: 'Sciences',
      description: 'Explore scientific concepts through hands-on activities',
      icon: Globe,
      color: 'from-purple-500 to-violet-600',
    },
  ];

  const stats = [
    { icon: BookOpen, value: '5', label: 'Matières principales' },
    { icon: Target, value: 'Secondary 1-5', label: 'Niveaux couverts' },
    { icon: Trophy, value: '100%', label: 'Curriculum québécois' },
    { icon: Users, value: 'Gratuit', label: 'Pour commencer' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-black/30 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-lg">Québec Apprentissage</span>
            </div>
            <Link
              to="/auth"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-semibold"
            >
              Commencer
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Apprenez avec
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> style</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Plateforme d'apprentissage gamifiée pour les élèves à la maison
              <br />
              <span className="text-purple-300">Secondaire 1-5 • Programme Québécois</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/auth"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-semibold text-lg flex items-center space-x-2 shadow-lg shadow-purple-500/50"
              >
                <span>Créer un compte gratuit</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/auth"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg transition-all font-semibold text-lg border border-white/20"
              >
                Se connecter
              </Link>
            </div>
            <div className="mt-12 flex items-center justify-center space-x-8 text-gray-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Gratuit</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Sans publicité</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Curriculum officiel</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center">
                      <Icon className="w-8 h-8 text-purple-400" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Pourquoi choisir Québec Apprentissage?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Une expérience d'apprentissage moderne, engageante et alignée avec le programme québécois
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Matières disponibles
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explorez nos modules interactifs couvrant le programme québécois
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subjects.map((subject, index) => {
              const Icon = subject.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${subject.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{subject.name}</h3>
                      <p className="text-gray-300">{subject.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Comment ça fonctionne?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Créez votre compte</h3>
              <p className="text-gray-300">
                Inscription gratuite et rapide. Commencez en moins d'une minute.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Explorez les matières</h3>
              <p className="text-gray-300">
                Choisissez une matière et commencez votre parcours d'apprentissage.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Gagnez des XP</h3>
              <p className="text-gray-300">
                Complétez des leçons, terminez des quêtes et montez de niveau!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Prêt à commencer votre parcours?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Rejoignez des étudiants qui apprennent avec plaisir et efficacité
          </p>
          <Link
            to="/auth"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-semibold text-lg shadow-lg shadow-purple-500/50"
          >
            <span>Créer un compte gratuit</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 border-t border-purple-500/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold">Québec Apprentissage</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 Québec Apprentissage. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

