import { Link } from 'react-router-dom';
import { Calculator, BookOpen, Target, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const MathOverview = () => {
  const { progress, user } = useApp();

  const mathProgress = progress.math || {};
  const completedSkills = mathProgress.completedSkills || [];
  const unlockedSkills = mathProgress.unlockedSkills || ['algebra-basics'];

  return (
    <div className="space-y-6 md:space-y-8 px-4 md:px-0">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
          Mathématiques
        </h1>
        <p className="text-gray-300 text-sm sm:text-base md:text-lg px-2">
          Maîtrisez les concepts mathématiques du programme québécois
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {/* Quick Stats */}
        <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 backdrop-blur-md rounded-2xl p-4 sm:p-6 border-2 border-blue-500/50">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 flex-shrink-0" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">Vos Statistiques</h2>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-white/10 rounded-lg p-3 sm:p-4">
              <div className="text-gray-300 text-xs sm:text-sm mb-1">Compétences complétées</div>
              <div className="text-2xl sm:text-3xl font-bold text-white">{completedSkills.length}</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 sm:p-4">
              <div className="text-gray-300 text-xs sm:text-sm mb-1">Problèmes résolus</div>
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {Object.keys(mathProgress.practiceProblems || {}).length}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 backdrop-blur-md rounded-2xl p-4 sm:p-6 border-2 border-blue-500/50">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 flex-shrink-0" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">Actions Rapides</h2>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <Link
              to="/math/skills"
              className="block bg-white/10 hover:bg-white/20 rounded-lg p-3 sm:p-4 border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex items-center space-x-3">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
                <span className="text-white font-semibold text-sm sm:text-base">Voir l'arbre de compétences</span>
              </div>
            </Link>
            {unlockedSkills.length > 0 && (
              <Link
                to={`/math/practice/${unlockedSkills[0]}`}
                className="block bg-white/10 hover:bg-white/20 rounded-lg p-3 sm:p-4 border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-center space-x-3">
                  <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
                  <span className="text-white font-semibold text-sm sm:text-base">Pratiquer maintenant</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Curriculum Info */}
      <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 border border-blue-500/20">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Programme Québécois</h2>
        <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
          Ce module couvre les concepts mathématiques du programme de formation de l'école québécoise
          pour les niveaux Secondaire 1 à 5 (7e à 11e année).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white/5 rounded-lg p-3 sm:p-4">
            <div className="text-blue-400 font-semibold mb-2 text-sm sm:text-base">Algèbre</div>
            <div className="text-gray-300 text-xs sm:text-sm">Équations, fonctions, graphiques</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 sm:p-4">
            <div className="text-blue-400 font-semibold mb-2 text-sm sm:text-base">Géométrie</div>
            <div className="text-gray-300 text-xs sm:text-sm">Formes, angles, transformations</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 sm:p-4">
            <div className="text-blue-400 font-semibold mb-2 text-sm sm:text-base">Trigonométrie</div>
            <div className="text-gray-300 text-xs sm:text-sm">Triangles, cercles, fonctions</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 sm:p-4">
            <div className="text-blue-400 font-semibold mb-2 text-sm sm:text-base">Probabilités</div>
            <div className="text-gray-300 text-xs sm:text-sm">Statistiques, analyse de données</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathOverview;

