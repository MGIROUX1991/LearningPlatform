import { Link } from 'react-router-dom';
import { Calculator, BookOpen, Target, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const MathOverview = () => {
  const { progress, user } = useApp();

  const mathProgress = progress.math || {};
  const completedSkills = mathProgress.completedSkills || [];
  const unlockedSkills = mathProgress.unlockedSkills || ['algebra-basics'];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
          Mathématiques
        </h1>
        <p className="text-gray-300 text-lg">
          Maîtrisez les concepts mathématiques du programme québécois
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Quick Stats */}
        <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 backdrop-blur-md rounded-2xl p-6 border-2 border-blue-500/50">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Vos Statistiques</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-gray-300 text-sm mb-1">Compétences complétées</div>
              <div className="text-3xl font-bold text-white">{completedSkills.length}</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-gray-300 text-sm mb-1">Problèmes résolus</div>
              <div className="text-3xl font-bold text-white">
                {Object.keys(mathProgress.practiceProblems || {}).length}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 backdrop-blur-md rounded-2xl p-6 border-2 border-blue-500/50">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Actions Rapides</h2>
          </div>
          <div className="space-y-4">
            <Link
              to="/math/skills"
              className="block bg-white/10 hover:bg-white/20 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex items-center space-x-3">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <span className="text-white font-semibold">Voir l'arbre de compétences</span>
              </div>
            </Link>
            {unlockedSkills.length > 0 && (
              <Link
                to={`/math/practice/${unlockedSkills[0]}`}
                className="block bg-white/10 hover:bg-white/20 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-center space-x-3">
                  <Calculator className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-semibold">Pratiquer maintenant</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Curriculum Info */}
      <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20">
        <h2 className="text-2xl font-bold text-white mb-4">Programme Québécois</h2>
        <p className="text-gray-300 mb-6">
          Ce module couvre les concepts mathématiques du programme de formation de l'école québécoise
          pour les niveaux Secondaire 1 à 5 (7e à 11e année).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-blue-400 font-semibold mb-2">Algèbre</div>
            <div className="text-gray-300 text-sm">Équations, fonctions, graphiques</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-blue-400 font-semibold mb-2">Géométrie</div>
            <div className="text-gray-300 text-sm">Formes, angles, transformations</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-blue-400 font-semibold mb-2">Trigonométrie</div>
            <div className="text-gray-300 text-sm">Triangles, cercles, fonctions</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-blue-400 font-semibold mb-2">Probabilités</div>
            <div className="text-gray-300 text-sm">Statistiques, analyse de données</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathOverview;

