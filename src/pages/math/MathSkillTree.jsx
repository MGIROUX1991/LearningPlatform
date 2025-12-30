import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Lock, Unlock, CheckCircle, Target, ArrowRight } from 'lucide-react';

const MathSkillTree = () => {
  const { progress } = useApp();

  const mathProgress = progress.math || {};
  const completedSkills = mathProgress.completedSkills || [];
  const unlockedSkills = mathProgress.unlockedSkills || ['algebra-basics'];

  const skillTree = [
    {
      id: 'algebra-basics',
      title: 'Bases de l\'Algèbre',
      description: 'Équations linéaires, expressions algébriques',
      level: 1,
      xp: 100,
      prerequisites: [],
      problems: 10,
    },
    {
      id: 'quadratic-functions',
      title: 'Fonctions Quadratiques',
      description: 'Paraboles, équations du second degré',
      level: 2,
      xp: 150,
      prerequisites: ['algebra-basics'],
      problems: 12,
    },
    {
      id: 'trigonometry',
      title: 'Trigonométrie',
      description: 'Triangles rectangles, fonctions trigonométriques',
      level: 3,
      xp: 200,
      prerequisites: ['quadratic-functions'],
      problems: 15,
    },
    {
      id: 'exponentials',
      title: 'Fonctions Exponentielles',
      description: 'Croissance exponentielle, logarithmes',
      level: 4,
      xp: 250,
      prerequisites: ['trigonometry'],
      problems: 15,
    },
  ];

  const isUnlocked = (skill) => {
    if (unlockedSkills.includes(skill.id)) return true;
    return skill.prerequisites.every(prereq => completedSkills.includes(prereq));
  };

  const isCompleted = (skill) => completedSkills.includes(skill.id);

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
          Arbre de Compétences
        </h1>
        <p className="text-gray-300 text-lg">
          Progressez à travers les compétences mathématiques
        </p>
      </div>

      <div className="chalkboard-bg rounded-2xl p-8 border-4 border-amber-800 shadow-2xl">
        <div className="space-y-8">
          {skillTree.map((skill, index) => {
            const unlocked = isUnlocked(skill);
            const completed = isCompleted(skill);
            const canUnlock = !unlocked && skill.prerequisites.every(prereq => completedSkills.includes(prereq));

            return (
              <div key={skill.id} className="relative">
                {/* Connection Line */}
                {index < skillTree.length - 1 && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-12 bg-amber-600/50" style={{ top: '100%' }} />
                )}

                <div className="flex items-center justify-center">
                  <div
                    className={`w-full max-w-md rounded-xl p-6 border-4 transition-all ${
                      completed
                        ? 'bg-green-600/20 border-green-400 shadow-lg shadow-green-500/20'
                        : unlocked
                        ? 'bg-blue-600/20 border-blue-400 shadow-lg shadow-blue-500/20 hover:scale-105'
                        : canUnlock
                        ? 'bg-yellow-600/20 border-yellow-400 shadow-lg shadow-yellow-500/20'
                        : 'bg-gray-700/20 border-gray-500 opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {completed ? (
                            <CheckCircle className="w-6 h-6 text-green-400" />
                          ) : unlocked ? (
                            <Unlock className="w-6 h-6 text-blue-400" />
                          ) : (
                            <Lock className="w-6 h-6 text-gray-400" />
                          )}
                          <span className="text-white font-bold text-lg">{skill.title}</span>
                        </div>
                        <p className="text-gray-300 text-sm mb-3">{skill.description}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-amber-300">Niveau {skill.level}</span>
                          <span className="text-blue-300">+{skill.xp} XP</span>
                          <span className="text-green-300">{skill.problems} problèmes</span>
                        </div>
                      </div>
                    </div>

                    {unlocked && !completed && (
                      <Link
                        to={`/math/practice/${skill.id}`}
                        className="block w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-center py-3 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all font-semibold flex items-center justify-center space-x-2"
                      >
                        <span>Commencer</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}

                    {completed && (
                      <div className="w-full bg-green-500/20 text-green-300 text-center py-3 rounded-lg font-semibold flex items-center justify-center space-x-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>Complété</span>
                      </div>
                    )}

                    {!unlocked && canUnlock && (
                      <div className="text-yellow-300 text-sm text-center py-2">
                        Prêt à débloquer! Complétez les prérequis.
                      </div>
                    )}

                    {!unlocked && !canUnlock && (
                      <div className="text-gray-400 text-sm text-center py-2">
                        Prérequis: {skill.prerequisites.map(p => {
                          const prereqSkill = skillTree.find(s => s.id === p);
                          return prereqSkill?.title;
                        }).join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Boss Battle Info */}
      <div className="bg-gradient-to-br from-red-600/20 to-orange-600/20 backdrop-blur-md rounded-2xl p-6 border-2 border-red-500/50">
        <div className="flex items-center space-x-2 mb-4">
          <Target className="w-6 h-6 text-red-400" />
          <h2 className="text-2xl font-bold text-white">Batailles de Boss</h2>
        </div>
        <p className="text-gray-300">
          Après avoir complété tous les problèmes d'une compétence, vous devrez passer une évaluation complète
          (bataille de boss) pour débloquer la compétence suivante. Les batailles de boss valent des bonus XP!
        </p>
      </div>
    </div>
  );
};

export default MathSkillTree;

