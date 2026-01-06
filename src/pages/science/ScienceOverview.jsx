import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FlaskConical, BookOpen, GraduationCap, Star, CheckCircle2, Circle, Clock } from 'lucide-react';
import { lessonService } from '../../services/adminService';
import { QUEBEC_CURRICULUM } from '../../data/quebecCurriculum';
import { getFrenchYears, getFrenchYearName, getEnglishYearName } from '../../utils/yearTranslations';
import { useApp } from '../../context/AppContext';

// French chapter name mapping
const CHAPTER_NAMES = {
  'living-things': 'Les êtres vivants',
  'material-world': 'Le monde matériel',
  'earth-space': 'La Terre et l\'espace',
  'technological-world': 'Le monde technologique',
  'introduction-methode-scientifique': 'Introduction à la méthode scientifique',
};

// Brief lesson summaries (not from lesson content)
const LESSON_SUMMARIES = {
  'Introduction à la méthode scientifique': 'Découvrez le processus systématique utilisé par les scientifiques pour explorer et comprendre le monde qui nous entoure.',
  'Propriétés et changements de la matière': 'Explorez les différentes propriétés de la matière et apprenez à distinguer les changements physiques des changements chimiques.',
  'Le système solaire et notre planète': 'Découvrez notre système solaire, les planètes qui le composent et les caractéristiques uniques de la Terre.',
  'Les machines simples': 'Apprenez comment les machines simples facilitent le travail et découvrez les six types de machines simples.',
  'Classification des êtres vivants': 'Explorez comment les scientifiques organisent et classifient les êtres vivants pour mieux les comprendre.',
  'Les états de la matière': 'Découvrez les trois états principaux de la matière et comment ils changent sous l\'effet de la température et de la pression.',
  'Le cycle de l\'eau': 'Comprenez le processus continu par lequel l\'eau se déplace sur, au-dessus et sous la surface de la Terre.',
  'L\'énergie et le travail': 'Explorez les différentes formes d\'énergie et apprenez comment l\'énergie peut être transformée d\'une forme à une autre.',
  'Communiquer des résultats scientifiques': 'Apprenez à présenter vos découvertes scientifiques de manière claire et efficace à l\'aide de graphiques, tableaux et rapports.',
  'Mesures et unités scientifiques': 'Découvrez le Système international d\'unités et apprenez à mesurer avec précision en science.',
  'Représenter la Terre': 'Explorez les différents types de cartes et de projections utilisés pour représenter notre planète.',
  'Sécurité et éthique en science': 'Apprenez les règles de sécurité essentielles en laboratoire et les principes éthiques qui guident la recherche scientifique.',
  'Communiquer à l\'aide des langages scientifiques': 'Maîtrisez les techniques de communication scientifique, de la rédaction de rapports à la présentation orale.',
};

const ScienceOverview = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('Secondaire I');
  const { progress } = useApp();

  // Get lesson status helper function
  const getLessonStatus = (lesson) => {
    const lessonId = lesson.id || lesson.chapter_id || 'introduction-methode-scientifique';
    const completedLessons = progress?.science?.completedLessons || {};
    const isCompleted = completedLessons[lessonId] === true;
    
    // Check if lesson was visited (in progress) using localStorage
    const visitedLessons = JSON.parse(localStorage.getItem('visited_lessons') || '{}');
    const isVisited = visitedLessons[`science_${lessonId}`] === true;
    
    if (isCompleted) {
      return 'completed';
    } else if (isVisited) {
      return 'in-progress';
    } else {
      return 'not-started';
    }
  };

  // Mark lesson as visited when component mounts
  useEffect(() => {
    const markVisited = (lessonId) => {
      const visitedLessons = JSON.parse(localStorage.getItem('visited_lessons') || '{}');
      visitedLessons[`science_${lessonId}`] = true;
      localStorage.setItem('visited_lessons', JSON.stringify(visitedLessons));
    };

    // Check if we're coming from a lesson page
    const urlParams = new URLSearchParams(window.location.search);
    const fromLesson = urlParams.get('from');
    if (fromLesson) {
      markVisited(fromLesson);
    }
  }, []);

  useEffect(() => {
      const loadLessons = async () => {
        setLoading(true);
        try {
          // Convert French year name to English for API call
          const englishYear = getEnglishYearName(selectedYear);
          const data = await lessonService.getLessons('science', null, {
            school_year: englishYear,
          });
          setLessons(data);
        } catch (error) {
          console.error('Error loading science lessons:', error);
        } finally {
          setLoading(false);
        }
      };
    loadLessons();
  }, [selectedYear]);

  const scienceSubject = QUEBEC_CURRICULUM.subjects.science;
  const years = getFrenchYears();

  // Group lessons by chapter
  const lessonsByChapter = lessons.reduce((acc, lesson) => {
    if (!acc[lesson.chapter_id]) {
      acc[lesson.chapter_id] = [];
    }
    acc[lesson.chapter_id].push(lesson);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <FlaskConical className="w-8 h-8 text-blue-400" />
          <h1 className="text-4xl font-bold text-white">
            {scienceSubject.name}
          </h1>
        </div>
      </div>

      {/* Year Selector */}
      <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20">
        <h2 className="text-xl font-bold text-white mb-4">Sélectionner une année</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedYear === year
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 border-blue-400 text-white'
                  : 'bg-blue-600/20 border-blue-500/50 text-white hover:bg-blue-600/30'
              }`}
            >
              <div className="font-semibold">{year}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Competencies */}
      <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20">
        <h2 className="text-xl font-bold text-white mb-4">Compétences</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scienceSubject.competencies.map((comp) => (
            <div key={comp.id} className="bg-white/5 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-2">{comp.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Lessons by Chapter */}
      {loading ? (
        <div className="text-center text-gray-400 py-8">Chargement des leçons...</div>
      ) : Object.keys(lessonsByChapter).length === 0 ? (
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-8 border border-blue-500/20 text-center">
          <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">
            Aucune leçon disponible pour {selectedYear}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(lessonsByChapter).map(([chapterId, chapterLessons]) => (
            <div
              key={chapterId}
              className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                {CHAPTER_NAMES[chapterId] || chapterId.replace(/-/g, ' ')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chapterLessons.map((lesson) => {
                  const lessonId = lesson.id || lesson.chapter_id || 'introduction-methode-scientifique';
                  const status = getLessonStatus(lesson);
                  
                  return (
                  <div
                    key={lesson.id}
                    className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all relative"
                  >
                    {/* Status Indicator */}
                    <div className="absolute top-4 right-4">
                      {status === 'completed' && (
                        <CheckCircle2 className="w-6 h-6 text-green-500" title="Leçon complétée" />
                      )}
                      {status === 'in-progress' && (
                        <Clock className="w-6 h-6 text-yellow-500" title="Leçon en cours" />
                      )}
                      {status === 'not-started' && (
                        <Circle className="w-6 h-6 text-gray-500" title="Leçon non commencée" />
                      )}
                    </div>
                    
                    <div className="flex items-start justify-between mb-2 pr-8">
                      <h3 className="text-lg font-bold text-white">{lesson.title}</h3>
                      {lesson.school_year && (
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs whitespace-nowrap">
                          {getFrenchYearName(lesson.school_year)}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mb-3">
                      {LESSON_SUMMARIES[lesson.title] || 'Découvrez ce sujet fascinant de science et technologie.'}
                    </p>
                    {lesson.competencies && lesson.competencies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {lesson.competencies.map((compId) => {
                          const comp = scienceSubject.competencies.find(c => c.id === compId);
                          return comp ? (
                            <span
                              key={compId}
                              className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs whitespace-nowrap"
                            >
                              {comp.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-yellow-400 text-sm font-semibold">
                        {lesson.xp_reward} XP
                      </span>
                      <Link
                        to={`/science/lesson/${lesson.chapter_id || lesson.id}`}
                        onClick={() => {
                          // Mark lesson as visited when clicking
                          const visitedLessons = JSON.parse(localStorage.getItem('visited_lessons') || '{}');
                          visitedLessons[`science_${lessonId}`] = true;
                          localStorage.setItem('visited_lessons', JSON.stringify(visitedLessons));
                        }}
                        className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-all text-sm"
                      >
                        {status === 'completed' ? 'Revoir' : status === 'in-progress' ? 'Continuer' : 'Commencer'}
                      </Link>
                    </div>
                  </div>
                )})}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScienceOverview;

