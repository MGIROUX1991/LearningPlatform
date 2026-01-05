import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, CheckCircle, Clock, Star } from 'lucide-react';
import { QUEBEC_CURRICULUM, getMandatorySubjects } from '../data/quebecCurriculum';
import { favoritesService } from '../services/favoritesService';
import { useSupabase } from '../context/SupabaseContext';
import { getFrenchYears, getFrenchYearName, getEnglishYearName } from '../utils/yearTranslations';

const CurriculumOverview = () => {
  const { user } = useSupabase();
  const [selectedYear, setSelectedYear] = useState('Secondaire I');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [favoriteStatus, setFavoriteStatus] = useState({});

  const years = getFrenchYears();
  // Convert French year to English for getMandatorySubjects function
  const mandatorySubjects = getMandatorySubjects(getEnglishYearName(selectedYear));

  // Load favorites
  useEffect(() => {
    const loadFavorites = async () => {
      if (user) {
        const favs = await favoritesService.getUserFavorites();
        setFavorites(favs);
        const status = {};
        favs.forEach(fav => {
          status[`${fav.item_type}-${fav.item_id}`] = true;
        });
        setFavoriteStatus(status);
      }
    };
    loadFavorites();
  }, [user]);

  const handleToggleFavorite = async (subject) => {
    if (!user) return;
    
    const itemType = 'subject';
    const itemId = subject.id;
    const itemName = subject.name;
    const itemPath = getSubjectPath(subject.id);
    const itemIcon = getSubjectIconName(subject.category);

    try {
      await favoritesService.toggleFavorite(itemType, itemId, itemName, itemPath, itemIcon);
      
      // Update local state
      const key = `${itemType}-${itemId}`;
      const isFav = favoriteStatus[key];
      setFavoriteStatus({
        ...favoriteStatus,
        [key]: !isFav,
      });
      
      // Reload favorites
      const favs = await favoritesService.getUserFavorites();
      setFavorites(favs);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const getSubjectPath = (subjectId) => {
    const paths = {
      history: '/history',
      math: '/math',
      french: '/french',
      english: '/english',
      science: '/science',
      geography: '/geography',
      arts: '/arts',
      physicalEducation: '/physical-education',
    };
    return paths[subjectId] || '#';
  };

  const getSubjectIconName = (category) => {
    const icons = {
      language: '📚',
      stem: '🔬',
      social: '🌍',
      arts: '🎨',
      health: '💪',
      practical: '💰',
    };
    return icons[category] || '📖';
  };

  const getSubjectIcon = (category) => {
    switch (category) {
      case 'language':
        return '📚';
      case 'stem':
        return '🔬';
      case 'social':
        return '🌍';
      case 'arts':
        return '🎨';
      case 'health':
        return '💪';
      case 'practical':
        return '💰';
      default:
        return '📖';
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 px-4 md:px-0">
      <div className="text-center mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 mb-4">
          <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Programme de Formation Québécois
          </h1>
        </div>
        <p className="text-sm sm:text-base text-gray-300 px-2">
          Curriculum officiel du Ministère de l'Éducation du Québec
        </p>
      </div>

      {/* Year Selector */}
      <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-blue-500/20">
        <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Sélectionner une année</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
          {years.map((year) => {
            const isCycleOne = ['Secondaire I', 'Secondaire II'].includes(year);
            return (
              <button
                key={year}
                onClick={() => {
                  setSelectedYear(year);
                  setSelectedSubject(null);
                }}
                className={`p-3 sm:p-4 rounded-lg border-2 transition-all ${
                  selectedYear === year
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 border-blue-400 text-white'
                    : isCycleOne
                    ? 'bg-blue-600/20 border-blue-500/50 text-white hover:bg-blue-600/30'
                    : 'bg-green-600/20 border-green-500/50 text-white hover:bg-green-600/30'
                }`}
              >
                <div className="font-semibold text-sm sm:text-base">{year}</div>
                <div className="text-xs mt-1 opacity-80">
                  {isCycleOne ? 'Cycle 1' : 'Cycle 2'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mandatory Subjects */}
      <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-blue-500/20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Matières obligatoires - {selectedYear}
          </h2>
          <div className="flex items-center space-x-2 text-sm sm:text-base text-gray-300">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="whitespace-nowrap">{mandatorySubjects.reduce((sum, s) => {
              return sum + (s.yearData?.hours || 0);
            }, 0)} heures totales</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {mandatorySubjects.map((subject) => {
            const yearData = subject.yearData;
            const isGraduationReq = QUEBEC_CURRICULUM.graduationRequirements.mandatoryCourses.some(
              req => req.subject === subject.id && req.level === selectedYear
            );

            const subjectPath = getSubjectPath(subject.id);
            const isFavorited = favoriteStatus[`subject-${subject.id}`];
            const hasModule = ['history', 'math', 'science'].includes(subject.id);

            return (
              <div
                key={subject.id}
                className={`bg-white/5 hover:bg-white/10 rounded-xl p-4 sm:p-6 border-2 transition-all ${
                  selectedSubject?.id === subject.id
                    ? 'border-blue-400 bg-blue-500/20'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between mb-4 gap-2">
                  <div 
                    className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0 cursor-pointer"
                    onClick={() => setSelectedSubject(selectedSubject?.id === subject.id ? null : subject)}
                  >
                    <span className="text-2xl sm:text-3xl flex-shrink-0">{getSubjectIcon(subject.category)}</span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-white truncate">{subject.name}</h3>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    {isGraduationReq && (
                      <div className="bg-yellow-500/20 px-2 py-1 rounded text-xs text-yellow-300">
                        Diplôme
                      </div>
                    )}
                    {user && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFavorite(subject);
                        }}
                        className={`p-2 rounded-lg transition-all ${
                          isFavorited
                            ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                            : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-yellow-400'
                        }`}
                        title={isFavorited ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                      >
                        <Star className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                      </button>
                    )}
                    {hasModule && (
                      <Link
                        to={subjectPath}
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-all"
                        title="Accéder au module"
                      >
                        <BookOpen className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>

                {yearData && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-gray-300">Heures:</span>
                      <span className="text-white font-semibold">{yearData.hours || yearData.hours} h</span>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-gray-300">Crédits:</span>
                      <span className="text-white font-semibold">{yearData.credits || yearData.credits} crédits</span>
                    </div>
                  </div>
                )}

                {selectedSubject?.id === subject.id && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">Compétences:</h4>
                    <div className="space-y-2">
                      {subject.competencies.map((comp) => (
                        <div key={comp.id} className="bg-white/5 rounded p-2 sm:p-3">
                          <div className="text-white font-medium text-xs sm:text-sm break-words">{comp.name}</div>
                          <div className="mt-2 space-y-1">
                            {comp.skills.map((skill, idx) => (
                              <div key={idx} className="text-xs text-gray-500 flex items-start space-x-1">
                                <CheckCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                                <span className="break-words">{skill}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Graduation Requirements */}
      <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-md rounded-2xl p-4 sm:p-6 border-2 border-green-500/50">
        <div className="flex items-center space-x-2 mb-4">
          <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0" />
          <h2 className="text-xl sm:text-2xl font-bold text-white">Exigences de Diplôme</h2>
        </div>
        <div className="bg-white/10 rounded-lg p-3 sm:p-4 mb-4">
          <p className="text-sm sm:text-base text-gray-300 mb-2">
            Pour obtenir un diplôme d'études secondaires, les étudiants doivent:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-white">
            <li>Obtenir au moins <strong>54 crédits</strong> en Secondaire IV et V</li>
            <li>Dont au moins <strong>20 crédits</strong> doivent être au niveau Secondaire V</li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="text-white font-semibold text-sm sm:text-base">Cours obligatoires pour le diplôme:</h3>
          {QUEBEC_CURRICULUM.graduationRequirements.mandatoryCourses.map((req, idx) => {
            const subject = QUEBEC_CURRICULUM.subjects[req.subject];
            return (
              <div key={idx} className="bg-white/5 rounded p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                <div className="flex items-start sm:items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5 sm:mt-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-white font-medium text-sm sm:text-base break-words">
                      {subject?.name || req.subject} - {req.level}
                    </div>
                    {req.note && (
                      <div className="text-gray-400 text-xs sm:text-sm break-words">{req.note}</div>
                    )}
                  </div>
                </div>
                <div className="text-green-300 font-semibold text-sm sm:text-base flex-shrink-0 sm:ml-4">{req.credits} crédits</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CurriculumOverview;

