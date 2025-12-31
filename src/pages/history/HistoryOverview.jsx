import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Lock, Unlock, CheckCircle, Clock } from 'lucide-react';

const HistoryOverview = () => {
  const { progress } = useApp();

  const chapters = [
    {
      id: 'chapter1',
      title: 'Les Grands Explorateurs',
      description: 'Découvrez les premiers explorateurs européens qui ont navigué vers le Nouveau Monde',
      year: '1497-1534',
      unlocked: true, // First chapter is always unlocked
    },
    {
      id: 'chapter2',
      title: 'La Traversée',
      description: 'Vivez l\'expérience de la traversée de l\'Atlantique',
      year: '1534-1608',
      unlocked: progress.history?.unlockedChapters?.includes('chapter2') || progress.history?.completedChapters?.includes('chapter1'),
    },
    {
      id: 'chapter3',
      title: 'Fondation de Québec',
      description: 'Suivez la création de la première colonie permanente',
      year: '1608',
      unlocked: progress.history?.unlockedChapters?.includes('chapter3') || progress.history?.completedChapters?.includes('chapter2'),
    },
    {
      id: 'chapter4',
      title: 'La Vie Quotidienne',
      description: 'Explorez la vie des colons en Nouvelle-France',
      year: '1608-1663',
      unlocked: progress.history?.unlockedChapters?.includes('chapter4') || progress.history?.completedChapters?.includes('chapter3'),
    },
    {
      id: 'chapter5',
      title: 'Relations avec les Autochtones',
      description: 'Comprenez les interactions entre colons et peuples autochtones',
      year: '1608-1760',
      unlocked: progress.history?.unlockedChapters?.includes('chapter5') || progress.history?.completedChapters?.includes('chapter4'),
    },
  ];

  const completedChapters = progress.history?.completedChapters || [];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
          Nouvelle-France
        </h1>
        <p className="text-gray-300 text-lg">
          Explorez l'histoire fascinante de la colonisation française en Amérique du Nord
        </p>
      </div>

      {/* Timeline Visualization */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-600 via-orange-500 to-amber-600" style={{ height: 'calc(100% - 2rem)' }} />

        <div className="space-y-12">
          {chapters.map((chapter, index) => {
            const isCompleted = completedChapters.includes(chapter.id);
            const isUnlocked = chapter.unlocked;

            return (
              <div
                key={chapter.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div
                    className={`w-12 h-12 rounded-full border-4 flex items-center justify-center ${
                      isCompleted
                        ? 'bg-green-500 border-green-300'
                        : isUnlocked
                        ? 'bg-amber-500 border-amber-300'
                        : 'bg-gray-600 border-gray-400'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : isUnlocked ? (
                      <Unlock className="w-6 h-6 text-white" />
                    ) : (
                      <Lock className="w-6 h-6 text-white" />
                    )}
                  </div>
                </div>

                {/* Chapter Card */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                  <div
                    className={`bg-gradient-to-br from-amber-900/40 to-orange-900/40 backdrop-blur-md rounded-2xl p-6 border-2 transition-all ${
                      isUnlocked
                        ? 'border-amber-500/50 hover:border-amber-400 cursor-pointer hover:scale-105'
                        : 'border-gray-600/50 opacity-60'
                    }`}
                  >
                    <div className={`flex items-center space-x-2 mb-2 ${index % 2 === 0 ? 'justify-end' : ''}`}>
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span className="text-amber-400 text-sm font-semibold">{chapter.year}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{chapter.title}</h3>
                    <p className="text-gray-300 mb-4">{chapter.description}</p>
                    
                    {isUnlocked ? (
                      <Link
                        to={`/history/lesson/${chapter.id}`}
                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all"
                      >
                        <span>Commencer</span>
                        <span>→</span>
                      </Link>
                    ) : (
                      <div className="inline-flex items-center space-x-2 bg-gray-600 text-gray-400 px-6 py-2 rounded-lg cursor-not-allowed">
                        <Lock className="w-4 h-4" />
                        <span>Verrouillé</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Access to Journal */}
      <div className="mt-12 bg-gradient-to-br from-amber-900/40 to-orange-900/40 backdrop-blur-md rounded-2xl p-8 border-2 border-amber-500/50">
        <h2 className="text-3xl font-bold text-white mb-4">Journal de Bord</h2>
        <p className="text-gray-300 mb-6">
          Tenez votre propre journal de bord comme si vous étiez à bord d'un navire traversant l'Atlantique.
          Faites des choix qui affectent votre voyage et débloquez différentes branches de l'histoire.
        </p>
        <Link
          to="/history/journal"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all text-lg font-semibold"
        >
          <span>Ouvrir le Journal</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
};

export default HistoryOverview;

