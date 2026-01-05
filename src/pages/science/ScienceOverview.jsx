import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FlaskConical, BookOpen, GraduationCap, Star } from 'lucide-react';
import { lessonService } from '../../services/adminService';
import { QUEBEC_CURRICULUM } from '../../data/quebecCurriculum';
import { getFrenchYears, getFrenchYearName, getEnglishYearName } from '../../utils/yearTranslations';

const ScienceOverview = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('Secondaire I');

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
              <h2 className="text-2xl font-bold text-white mb-4 capitalize">
                {chapterId.replace(/-/g, ' ')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chapterLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-white">{lesson.title}</h3>
                      {lesson.school_year && (
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                          {getFrenchYearName(lesson.school_year)}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {lesson.content.substring(0, 100)}...
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
                        to={`/science/lesson/${lesson.id || lesson.chapter_id || 'introduction-methode-scientifique'}`}
                        className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-all text-sm"
                      >
                        Commencer
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScienceOverview;

