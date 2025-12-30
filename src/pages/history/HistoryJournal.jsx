import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Ship, Wind, Droplet, Heart, CheckCircle } from 'lucide-react';

const HistoryJournal = () => {
  const navigate = useNavigate();
  const { addXP, updateStreak, completeQuest } = useApp();
  const [day, setDay] = useState(1);
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [stats, setStats] = useState({
    daysAtSea: 0,
    supplies: 100,
    crewHealth: 100,
    morale: 100,
    weather: 'Calme',
  });
  const [currentDecision, setCurrentDecision] = useState(null);
  const [storyBranch, setStoryBranch] = useState('main');

  const weatherEvents = [
    { type: 'Calme', description: 'Mer calme, vent favorable', effect: { morale: 5, supplies: -2 } },
    { type: 'Tempête', description: 'Grosse tempête!', effect: { crewHealth: -10, morale: -15, supplies: -5 } },
    { type: 'Brouillard', description: 'Brouillard épais ralentit la progression', effect: { morale: -5, supplies: -3 } },
    { type: 'Vent favorable', description: 'Excellent vent, bonne progression', effect: { morale: 10, supplies: -1 } },
  ];

  const decisions = [
    {
      id: 1,
      question: 'Une tempête approche. Que faites-vous?',
      options: [
        { text: 'Réduire les voiles et attendre', effect: { crewHealth: -5, supplies: -2 }, branch: 'cautious' },
        { text: 'Continuer à pleine vitesse', effect: { crewHealth: -15, morale: -10, supplies: -5 }, branch: 'bold' },
        { text: 'Chercher un abri côtier', effect: { supplies: -3 }, branch: 'safe' },
      ],
    },
    {
      id: 2,
      question: 'Les rations diminuent. Comment réagissez-vous?',
      options: [
        { text: 'Réduire les rations de moitié', effect: { morale: -10, supplies: 10 }, branch: 'strict' },
        { text: 'Maintenir les rations normales', effect: { supplies: -5 }, branch: 'normal' },
        { text: 'Distribuer des rations supplémentaires', effect: { morale: 15, supplies: -10 }, branch: 'generous' },
      ],
    },
  ];

  const handleAddEntry = () => {
    if (currentEntry.trim()) {
      const newEntry = {
        day,
        date: `Jour ${day} - ${new Date(1608, 3, day).toLocaleDateString('fr-CA')}`,
        content: currentEntry,
        stats: { ...stats },
        decision: currentDecision,
      };
      
      setEntries([...entries, newEntry]);
      setCurrentEntry('');
      setDay(day + 1);
      
      // Update stats based on weather
      const weather = weatherEvents[Math.floor(Math.random() * weatherEvents.length)];
      setStats(prev => ({
        ...prev,
        daysAtSea: prev.daysAtSea + 1,
        supplies: Math.max(0, Math.min(100, prev.supplies + weather.effect.supplies)),
        crewHealth: Math.max(0, Math.min(100, prev.crewHealth + (weather.effect.crewHealth || 0))),
        morale: Math.max(0, Math.min(100, prev.morale + weather.effect.morale)),
        weather: weather.type,
      }));
      
      setCurrentDecision(null);
      
      // Unlock new decision every 3 days
      if (day % 3 === 0 && decisions.length > 0) {
        const decision = decisions[Math.min(Math.floor(day / 3) - 1, decisions.length - 1)];
        setCurrentDecision(decision);
      }
    }
  };

  const handleDecision = (option) => {
    setStats(prev => ({
      ...prev,
      supplies: Math.max(0, Math.min(100, prev.supplies + option.effect.supplies)),
      crewHealth: Math.max(0, Math.min(100, prev.crewHealth + (option.effect.crewHealth || 0))),
      morale: Math.max(0, Math.min(100, prev.morale + (option.effect.morale || 0))),
    }));
    setStoryBranch(option.branch);
    setCurrentDecision(null);
  };

  const handleComplete = () => {
    const xpEarned = entries.length * 30;
    addXP(xpEarned);
    updateStreak();
    completeQuest(1);
    navigate('/history');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/history"
        className="inline-flex items-center space-x-2 text-purple-300 hover:text-purple-200 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Retour à l'Histoire</span>
      </Link>

      <div className="space-y-6">
        {/* Stats Panel */}
        <div className="bg-gradient-to-br from-amber-900/40 to-orange-900/40 backdrop-blur-md rounded-2xl p-6 border-2 border-amber-500/50">
          <h2 className="text-2xl font-bold text-white mb-4">Statistiques du Voyage</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Ship className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300 text-sm">Jours en mer</span>
              </div>
              <div className="text-2xl font-bold text-white">{stats.daysAtSea}</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Droplet className="w-5 h-5 text-cyan-400" />
                <span className="text-gray-300 text-sm">Provisions</span>
              </div>
              <div className="text-2xl font-bold text-white">{stats.supplies}%</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Heart className="w-5 h-5 text-red-400" />
                <span className="text-gray-300 text-sm">Santé équipage</span>
              </div>
              <div className="text-2xl font-bold text-white">{stats.crewHealth}%</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Wind className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-300 text-sm">Moral</span>
              </div>
              <div className="text-2xl font-bold text-white">{stats.morale}%</div>
            </div>
          </div>
          <div className="mt-4 bg-white/10 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Wind className="w-5 h-5 text-amber-400" />
              <span className="text-gray-300">Météo actuelle: </span>
              <span className="text-white font-semibold">{stats.weather}</span>
            </div>
          </div>
        </div>

        {/* Decision Making */}
        {currentDecision && (
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-2xl p-6 border-2 border-purple-500/50">
            <h3 className="text-xl font-bold text-white mb-4">{currentDecision.question}</h3>
            <div className="space-y-3">
              {currentDecision.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleDecision(option)}
                  className="w-full text-left bg-white/10 hover:bg-white/20 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="text-white font-semibold">{option.text}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Journal Entry Form */}
        <div className="parchment-bg scroll-texture rounded-lg border-4 border-amber-800/50 shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-amber-900 mb-4 font-serif">
            Journal de Bord - Jour {day}
          </h2>
          <textarea
            value={currentEntry}
            onChange={(e) => setCurrentEntry(e.target.value)}
            placeholder="Écrivez votre entrée de journal ici... Décrivez les événements de la journée, vos observations, vos pensées..."
            className="w-full h-48 bg-amber-50/50 border-2 border-amber-700/30 rounded-lg p-4 text-amber-900 font-serif text-lg focus:outline-none focus:border-amber-600"
          />
          <button
            onClick={handleAddEntry}
            disabled={!currentEntry.trim()}
            className="mt-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-3 rounded-lg hover:from-amber-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
          >
            Ajouter l'entrée
          </button>
        </div>

        {/* Previous Entries */}
        {entries.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Entrées précédentes</h2>
            {entries.slice().reverse().map((entry, index) => (
              <div
                key={index}
                className="parchment-bg scroll-texture rounded-lg border-4 border-amber-800/50 shadow-xl p-6"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-amber-900 font-serif">{entry.date}</h3>
                  <div className="text-sm text-amber-700">
                    Provisions: {entry.stats.supplies}% | Santé: {entry.stats.crewHealth}% | Moral: {entry.stats.morale}%
                  </div>
                </div>
                <p className="text-amber-900 font-serif leading-relaxed">{entry.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* Complete Button */}
        {entries.length >= 5 && (
          <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-md rounded-2xl p-6 border-2 border-green-500/50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Félicitations!</h3>
                <p className="text-gray-300">
                  Vous avez complété {entries.length} entrées de journal. Vous gagnez {entries.length * 30} XP!
                </p>
              </div>
              <button
                onClick={handleComplete}
                className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all font-semibold"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Terminer</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryJournal;

