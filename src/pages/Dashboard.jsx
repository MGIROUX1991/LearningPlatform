import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QUEBEC_CURRICULUM } from '../data/quebecCurriculum';
import { BookOpen, Calculator, Flame, Trophy, Target, TrendingUp, Award, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

const Dashboard = () => {
  const { user, dailyQuests, progress, XP_PER_LEVEL, loading } = useApp();
  
  // Show loading state only if we're truly loading and don't have user data yet
  // Don't show loading if we have user data but are just refreshing in background
  if (!user) {
    // No user at all - show loading
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }
  
  // If we have user data, show the dashboard even if loading (background refresh)
  // Only show loading overlay if we're in initial load state
  if (loading && (!progress || Object.keys(progress).length === 0) && dailyQuests.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }
  
  // Safe calculations after null check
  const userXP = user?.xp || 0;
  const userLevel = user?.level || 1;
  const xpToNextLevel = XP_PER_LEVEL - (userXP % XP_PER_LEVEL);
  const xpProgress = ((userXP % XP_PER_LEVEL) / XP_PER_LEVEL) * 100;

  const getSubjectProgress = (subjectId) => {
    switch (subjectId) {
      case 'history':
        return Math.round(
          ((progress.history?.completedChapters?.length || 0) / 5) * 100
        );
      case 'math':
        return Math.round(
          ((progress.math?.completedSkills?.length || 0) / 4) * 100
        );
      default:
        return 0;
    }
  };

  const getSubjectPath = (subjectId) => {
    switch (subjectId) {
      case 'history':
        return '/history';
      case 'math':
        return '/math';
      default:
        return '#';
    }
  };

  const getSubjectIcon = (subjectId) => {
    switch (subjectId) {
      case 'math':
        return Calculator;
      default:
        return BookOpen;
    }
  };

  const getSubjectColor = (category) => {
    switch (category) {
      case 'language':
        return 'from-green-500 to-emerald-600';
      case 'stem':
        return 'from-blue-500 to-cyan-600';
      case 'social':
        return 'from-amber-500 to-orange-600';
      case 'arts':
        return 'from-pink-500 to-rose-600';
      case 'health':
        return 'from-red-500 to-orange-600';
      case 'practical':
        return 'from-blue-500 to-cyan-600';
      default:
        return 'from-gray-500 to-slate-600';
    }
  };

  // Get main subjects from curriculum
  const mainSubjects = [
    QUEBEC_CURRICULUM.subjects.history,
    QUEBEC_CURRICULUM.subjects.mathematics,
    QUEBEC_CURRICULUM.subjects.french,
    QUEBEC_CURRICULUM.subjects.english,
    QUEBEC_CURRICULUM.subjects.science,
  ].map(subject => ({
    id: subject.id,
    name: subject.name,
    icon: getSubjectIcon(subject.id),
    color: getSubjectColor(subject.category),
    progress: getSubjectProgress(subject.id),
    path: getSubjectPath(subject.id),
    category: subject.category,
  }));

  const recentAchievements = (user?.achievements || []).slice(-3).reverse();

  // Competency checklist state
  const [expandedSubjects, setExpandedSubjects] = useState({});

  const toggleSubject = (subjectId) => {
    setExpandedSubjects(prev => ({
      ...prev,
      [subjectId]: !prev[subjectId],
    }));
  };

  // Get all subjects with competencies
  const subjectsWithCompetencies = mainSubjects.map(subject => {
    const curriculumSubject = QUEBEC_CURRICULUM.subjects[subject.id];
    return {
      ...subject,
      competencies: curriculumSubject?.competencies || [],
    };
  }).filter(subject => subject.competencies.length > 0);

  return (
    <div className="space-y-8">
      {/* Hero Stats Section */}
      <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-md rounded-2xl p-8 border border-blue-500/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-300 text-sm">Niveau actuel</span>
              <Trophy className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="text-4xl font-bold text-white mb-2">{userLevel}</div>
            <div className="text-sm text-gray-400">
              {xpToNextLevel} XP jusqu'au niveau {userLevel + 1}
            </div>
            <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-300 text-sm">Points d'expérience</span>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-4xl font-bold text-white mb-2">{userXP}</div>
            <div className="text-sm text-gray-400">Total accumulé</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-300 text-sm">Série quotidienne</span>
              <Flame className="w-5 h-5 text-orange-400" />
            </div>
            <div className="text-4xl font-bold text-white mb-2">{user?.streak || 0}</div>
            <div className="text-sm text-gray-400">jours consécutifs</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Daily Quests */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20">
            <div className="flex items-center space-x-2 mb-6">
              <Target className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Quêtes quotidiennes</h2>
            </div>
            <div className="space-y-4">
              {dailyQuests.map((quest) => (
                <div
                  key={quest.id}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                    quest.completed
                      ? 'bg-green-500/20 border-green-500/50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        quest.completed
                          ? 'bg-green-500'
                          : 'border-2 border-gray-400'
                      }`}
                    >
                      {quest.completed && (
                        <span className="text-white text-xs">✓</span>
                      )}
                    </div>
                    <div>
                      <div className="text-white font-semibold">{quest.title}</div>
                      <div className="text-gray-400 text-sm">{quest.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 font-semibold">+{quest.xp} XP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Challenge */}
          <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-md rounded-2xl p-6 border border-blue-500/30">
            <div className="flex items-center space-x-2 mb-4">
              <Award className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">Défi hebdomadaire</h2>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-2">
                Maître de l'Histoire
              </h3>
              <p className="text-gray-300 mb-4">
                Complétez 3 chapitres d'histoire cette semaine pour débloquer un badge spécial!
              </p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  Progrès: {progress.history?.completedChapters?.length || 0} / 3
                </div>
                <div className="h-2 bg-white/10 rounded-full flex-1 mx-4">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                    style={{
                      width: `${Math.min(
                        ((progress.history?.completedChapters?.length || 0) / 3) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
                <div className="text-yellow-400 font-semibold">+200 XP</div>
              </div>
            </div>
          </div>

          {/* Competency Checklist */}
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20">
            <div className="flex items-center space-x-2 mb-6">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white">Compétences par matière</h2>
            </div>
            <div className="space-y-4">
              {subjectsWithCompetencies.map((subject) => {
                const Icon = subject.icon;
                const isExpanded = expandedSubjects[subject.id];
                const completedCount = 0; // TODO: Track completed competencies
                const totalCount = subject.competencies.length;

                return (
                  <div
                    key={subject.id}
                    className="bg-white/5 rounded-xl border border-white/10 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleSubject(subject.id)}
                      className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-all"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${subject.color} flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                          <div className="text-white font-semibold">{subject.name}</div>
                          <div className="text-gray-400 text-sm">
                            {completedCount} / {totalCount} compétences
                          </div>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 space-y-3">
                        {subject.competencies.map((competency, idx) => (
                          <div
                            key={competency.id}
                            className="bg-white/5 rounded-lg p-4 border border-white/10"
                          >
                            <div className="flex items-start space-x-3">
                              <div className="mt-1">
                                <div className="w-5 h-5 rounded border-2 border-gray-400 flex items-center justify-center flex-shrink-0">
                                  {/* Checkbox - can be made interactive later */}
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="text-white font-semibold mb-1">
                                  {competency.name}
                                </div>
                                {competency.skills && competency.skills.length > 0 && (
                                  <div className="mt-3 space-y-1">
                                    <div className="text-xs text-gray-500 font-semibold uppercase mb-2">
                                      Habiletés:
                                    </div>
                                    <ul className="space-y-1">
                                      {competency.skills.map((skill, skillIdx) => (
                                        <li key={skillIdx} className="text-xs text-gray-400 flex items-start space-x-2">
                                          <span className="text-blue-400 mt-1">•</span>
                                          <span>{skill}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Subject Progress Cards */}
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20">
            <h2 className="text-2xl font-bold text-white mb-6">Matières</h2>
            <div className="space-y-4">
              {mainSubjects.map((subject) => {
                const Icon = subject.icon;
                return (
                  <Link
                    key={subject.id}
                    to={subject.path}
                    className="block group"
                  >
                    <div className="bg-white/5 hover:bg-white/10 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${subject.color} flex items-center justify-center`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-white font-semibold">{subject.name}</span>
                        </div>
                        <span className="text-gray-400 text-sm">{subject.progress}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${subject.color} transition-all duration-500`}
                          style={{ width: `${subject.progress}%` }}
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Recent Achievements */}
          {recentAchievements.length > 0 && (
            <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20">
              <h2 className="text-2xl font-bold text-white mb-6">Réalisations récentes</h2>
              <div className="space-y-3">
                {recentAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center space-x-3"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-semibold text-sm">
                        {achievement.name}
                      </div>
                      <div className="text-gray-400 text-xs">
                        {achievement.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

