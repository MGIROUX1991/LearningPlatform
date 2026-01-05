import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { lessonService } from '../../services/adminService';
import { ArrowLeft, ArrowRight, CheckCircle, FlaskConical, Search, Lightbulb, TestTube, BarChart3, MessageSquare, Sparkles } from 'lucide-react';

const ScienceLesson = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { addXP, updateStreak, completeLesson } = useApp();
  const [currentPage, setCurrentPage] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStep, setSelectedStep] = useState(null);

  // Scientific method steps with colors and icons
  const scientificSteps = [
    {
      id: 'observation',
      title: 'Observation',
      description: 'Examiner attentivement un phénomène naturel',
      icon: Search,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      example: {
        title: 'Exemple d\'observation',
        content: 'Vous remarquez que les plantes près de la fenêtre poussent mieux que celles dans le placard.',
        illustration: '🌱☀️ vs 🌱🌑'
      }
    },
    {
      id: 'question',
      title: 'Question',
      description: 'Formuler une question claire et vérifiable',
      icon: MessageSquare,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      example: {
        title: 'Exemple de question',
        content: 'Pourquoi les plantes poussent-elles mieux au soleil?',
        illustration: '❓'
      }
    },
    {
      id: 'hypothese',
      title: 'Hypothèse',
      description: 'Proposer une explication testable',
      icon: Lightbulb,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      example: {
        title: 'Exemple d\'hypothèse',
        content: 'Les plantes ont besoin de lumière pour faire la photosynthèse et grandir.',
        illustration: '💡'
      }
    },
    {
      id: 'experimentation',
      title: 'Expérimentation',
      description: 'Tester l\'hypothèse avec une expérience contrôlée',
      icon: TestTube,
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-500/10',
      borderColor: 'border-teal-500/30',
      example: {
        title: 'Exemple d\'expérience',
        content: 'Placer deux plantes identiques: une au soleil, une dans le noir. Mesurer leur croissance après 2 semaines.',
        illustration: '🔬'
      }
    },
    {
      id: 'analyse',
      title: 'Analyse',
      description: 'Examiner et interpréter les données recueillies',
      icon: BarChart3,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      example: {
        title: 'Exemple d\'analyse',
        content: 'La plante au soleil a grandi de 10 cm, celle dans le noir de 2 cm. Les données confirment l\'hypothèse.',
        illustration: '📊'
      }
    },
    {
      id: 'conclusion',
      title: 'Conclusion',
      description: 'Déterminer si l\'hypothèse est validée ou non',
      icon: CheckCircle,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      example: {
        title: 'Exemple de conclusion',
        content: 'L\'hypothèse est confirmée: les plantes ont besoin de lumière pour bien pousser.',
        illustration: '✅'
      }
    },
  ];

  // Fallback lesson content for "Introduction à la méthode scientifique"
  const fallbackLessonContent = {
    'introduction-methode-scientifique': {
      title: 'Introduction à la méthode scientifique',
      pages: [
        {
          content: `La méthode scientifique est le processus que les scientifiques utilisent pour comprendre le monde qui nous entoure. C'est une approche systématique et logique qui permet de répondre à des questions, de résoudre des problèmes et de découvrir de nouvelles connaissances.`,
          funFact: 'La méthode scientifique moderne a été développée au XVIIe siècle par des scientifiques comme Galilée et Francis Bacon. Elle a révolutionné notre façon de comprendre le monde!',
        },
      ],
      quiz: {
        questions: [
          {
            id: 1,
            question: 'Quelle est la première étape de la méthode scientifique?',
            options: ['L\'hypothèse', 'L\'observation', 'L\'expérience', 'La conclusion'],
            correct: 1,
          },
          {
            id: 2,
            question: 'Qu\'est-ce qu\'une hypothèse?',
            options: ['Une observation', 'Une proposition explicative provisoire que l\'on cherche à vérifier', 'Une conclusion', 'Une expérience'],
            correct: 1,
          },
          {
            id: 3,
            question: 'Pourquoi est-il important de faire plusieurs essais lors d\'une expérience?',
            options: ['Pour perdre du temps', 'Pour s\'assurer que les résultats sont fiables', 'Pour compliquer les choses', 'Pour utiliser plus de matériel'],
            correct: 1,
          },
          {
            id: 4,
            question: 'Que fait-on si les résultats de l\'expérience ne confirment pas l\'hypothèse?',
            options: ['On abandonne', 'On propose une nouvelle hypothèse et on recommence', 'On change les résultats', 'On ignore les résultats'],
            correct: 1,
          },
          {
            id: 5,
            question: 'Qu\'est-ce qu\'une variable dans une expérience?',
            options: ['Une constante', 'Un facteur qui peut changer', 'Un résultat', 'Une hypothèse'],
            correct: 1,
          },
        ],
      },
    },
  };

  // Load lesson from database
  useEffect(() => {
    const loadLesson = async () => {
      setLoading(true);
      try {
        const lessons = await lessonService.getLessons('science', null, {});
        const dbLesson = lessons.find(l => l.id === lessonId || l.chapter_id === lessonId);
        
        if (dbLesson) {
          const contentParagraphs = dbLesson.content.split(/\n\n+/).filter(p => p.trim());
          const pages = contentParagraphs.map((paragraph, index) => {
            const page = { content: paragraph.trim() };
            
            if (index === 0 && dbLesson.fun_fact) {
              page.funFact = dbLesson.fun_fact;
            }
            
            return page;
          });
          
          const convertedLesson = {
            title: dbLesson.title,
            pages: pages,
            quiz: dbLesson.quiz || { questions: [] },
          };
          
          setLesson(convertedLesson);
        } else {
          const fallbackLesson = fallbackLessonContent[lessonId] || fallbackLessonContent['introduction-methode-scientifique'];
          setLesson(fallbackLesson);
        }
      } catch (error) {
        console.error('Error loading lesson:', error);
        const fallbackLesson = fallbackLessonContent[lessonId] || fallbackLessonContent['introduction-methode-scientifique'];
        setLesson(fallbackLesson);
      } finally {
        setLoading(false);
      }
    };
    
    loadLesson();
  }, [lessonId]);

  if (loading || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-white text-xl">Chargement de la leçon...</div>
      </div>
    );
  }

  const totalPages = lesson.pages.length;
  const isLastPage = currentPage === totalPages - 1;

  const handleNext = () => {
    if (isLastPage && !showQuiz) {
      setShowQuiz(true);
    } else if (showQuiz && quizCompleted) {
      handleComplete();
    } else if (!isLastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (showQuiz) {
      setShowQuiz(false);
    } else if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: answerIndex });
  };

  const handleCompleteQuiz = () => {
    const allAnswered = lesson.quiz.questions.every(q => quizAnswers[q.id] !== undefined);
    if (allAnswered) {
      setQuizCompleted(true);
      const correctAnswers = lesson.quiz.questions.filter(
        q => quizAnswers[q.id] === q.correct
      ).length;
      const xpEarned = correctAnswers * 25;
      addXP(xpEarned);
      updateStreak();
    }
  };

  const handleComplete = async () => {
    await completeLesson('science', lessonId);
    addXP(100);
    setTimeout(() => {
      navigate('/science');
    }, 100);
  };

  const currentPageData = lesson.pages[currentPage];
  const selectedStepData = selectedStep ? scientificSteps.find(s => s.id === selectedStep) : scientificSteps[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/science"
          className="inline-flex items-center space-x-2 text-blue-300 hover:text-blue-200 mb-6 text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à la Science</span>
        </Link>

        {!showQuiz ? (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 md:p-8 lg:p-10 shadow-2xl">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                  {lesson.title}
                </h1>
              </div>
              <div className="ml-4 p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-400/30">
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
              </div>
            </div>

            {/* Intro Text */}
            {currentPage === 0 && (
              <div className="mb-8">
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  La science est une façon d'explorer et de comprendre le monde qui nous entoure. Les scientifiques utilisent une méthode systématique appelée "méthode scientifique" pour répondre à des questions et résoudre des problèmes.
                </p>
              </div>
            )}

            {/* Fun Fact - Full Width */}
            {currentPageData.funFact && (
              <div className="mb-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl border border-purple-400/30 p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white text-lg mb-2">Le saviez-vous?</div>
                    <p className="text-gray-200 leading-relaxed">{currentPageData.funFact}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Steps Grid - Full Width */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Les étapes de la méthode scientifique</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {scientificSteps.map((step) => {
                  const Icon = step.icon;
                  const isSelected = selectedStep === step.id || (!selectedStep && step.id === 'observation');
                  
                  return (
                    <button
                      key={step.id}
                      onClick={() => setSelectedStep(step.id)}
                      className={`text-left p-5 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                        isSelected
                          ? `${step.bgColor} ${step.borderColor} border-opacity-60 shadow-lg`
                          : 'bg-slate-700/30 border-slate-600/30 hover:border-slate-500/50'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${step.color} flex-shrink-0`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                          <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Example Box - Separate Section */}
            <div className="mb-8 bg-slate-800/60 backdrop-blur-sm rounded-2xl border-2 border-dashed border-cyan-400/40 p-6">
              <h3 className="text-xl font-bold text-cyan-300 mb-4 flex items-center space-x-2">
                <FlaskConical className="w-5 h-5" />
                <span>{selectedStepData.example.title}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="bg-slate-900/50 rounded-xl p-8 text-center border border-slate-700/50">
                  <div className="text-5xl mb-3">{selectedStepData.example.illustration}</div>
                  <p className="text-sm text-gray-400">Illustration</p>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {selectedStepData.example.content}
                </p>
              </div>
            </div>

            {/* Footer Navigation */}
            <div className="mt-12 pt-8 border-t border-slate-700/50">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-gray-400 text-sm">
                  Page {currentPage + 1} sur {totalPages}
                </div>
                
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <button
                    onClick={handlePrevious}
                    disabled={currentPage === 0}
                    className="px-6 py-3 bg-transparent border border-slate-600 text-gray-300 rounded-lg hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                  >
                    Précédent
                  </button>
                  
                  <button
                    onClick={handleNext}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all font-semibold shadow-lg hover:shadow-xl"
                  >
                    {isLastPage ? 'Quiz' : 'Suivant'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 md:p-8 lg:p-10 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Quiz de révision</h2>
            
            <div className="space-y-6 max-w-3xl mx-auto">
              {lesson.quiz.questions.map((question) => {
                const userAnswer = quizAnswers[question.id];
                const isCorrect = userAnswer === question.correct;
                
                return (
                  <div
                    key={question.id}
                    className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/30"
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">{question.question}</h3>
                    <div className="space-y-2">
                      {question.options.map((option, index) => {
                        const isSelected = userAnswer === index;
                        const showCorrect = quizCompleted && index === question.correct;
                        
                        return (
                          <button
                            key={index}
                            onClick={() => !quizCompleted && handleQuizAnswer(question.id, index)}
                            disabled={quizCompleted}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                              showCorrect
                                ? 'bg-green-500/20 border-green-500'
                                : isSelected && !quizCompleted
                                ? 'bg-blue-500/20 border-blue-500'
                                : isSelected && quizCompleted && !isCorrect
                                ? 'bg-red-500/20 border-red-500'
                                : 'bg-slate-700/30 border-slate-600/30 hover:border-slate-500/50'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-white">{option}</span>
                              {showCorrect && <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 max-w-3xl mx-auto">
              <button
                onClick={handlePrevious}
                className="flex items-center space-x-2 bg-transparent border border-slate-600 text-gray-300 px-6 py-3 rounded-lg hover:bg-slate-700/50 transition-all w-full sm:w-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Retour</span>
              </button>

              {!quizCompleted ? (
                <button
                  onClick={handleCompleteQuiz}
                  disabled={!lesson.quiz.questions.every(q => quizAnswers[q.id] !== undefined)}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold w-full sm:w-auto"
                >
                  Soumettre les réponses
                </button>
              ) : (
                <button
                  onClick={handleComplete}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all font-semibold flex items-center justify-center space-x-2 w-full sm:w-auto"
                >
                  <span>Terminer la leçon</span>
                  <CheckCircle className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScienceLesson;
