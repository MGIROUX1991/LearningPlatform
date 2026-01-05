import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { lessonService } from '../../services/adminService';
import { ArrowLeft, ArrowRight, CheckCircle, FlaskConical } from 'lucide-react';

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

  // Fallback lesson content for "Introduction à la méthode scientifique"
  const fallbackLessonContent = {
    'introduction-methode-scientifique': {
      title: 'Introduction à la méthode scientifique',
      pages: [
        {
          content: `La méthode scientifique est le processus que les scientifiques utilisent pour comprendre le monde qui nous entoure. C'est une approche systématique et logique qui permet de répondre à des questions, de résoudre des problèmes et de découvrir de nouvelles connaissances.`,
          funFact: 'La méthode scientifique moderne a été développée au XVIIe siècle par des scientifiques comme Galilée et Francis Bacon. Elle a révolutionné notre façon de comprendre le monde!',
        },
        {
          content: `La méthode scientifique suit généralement ces étapes : observation, question, hypothèse, expérience, analyse des résultats et conclusion. Chaque étape est importante et doit être suivie avec soin pour obtenir des résultats fiables.`,
          vocabulary: {
            'Observation': 'Action d\'examiner attentivement un phénomène ou un objet',
            'Hypothèse': 'Proposition explicative provisoire que l\'on cherche à vérifier',
            'Expérience': 'Test contrôlé conçu pour vérifier une hypothèse',
          },
        },
        {
          content: `L'observation est le point de départ de toute recherche scientifique. Elle consiste à examiner attentivement un phénomène naturel, à noter ce que l'on voit, entend, sent ou mesure. Une bonne observation doit être précise, objective et détaillée.`,
        },
        {
          content: `Après avoir observé, on se pose une question. Cette question doit être claire, précise et vérifiable. Par exemple, "Pourquoi les plantes poussent-elles mieux au soleil?" est une bonne question scientifique, car on peut la tester.`,
        },
        {
          content: `L'hypothèse est une explication possible à notre question. C'est une prédiction que l'on peut tester. Une bonne hypothèse doit être testable et falsifiable, c'est-à-dire qu'on doit pouvoir prouver qu'elle est fausse si elle l'est vraiment.`,
        },
        {
          content: `L'expérience permet de tester notre hypothèse. On doit concevoir une expérience où on contrôle les variables (les facteurs qui peuvent changer) et où on mesure les résultats. Il est important de faire plusieurs essais pour s'assurer que les résultats sont fiables.`,
        },
        {
          content: `L'analyse des résultats consiste à examiner les données recueillies lors de l'expérience. On peut utiliser des tableaux, des graphiques ou des calculs pour mieux comprendre ce qui s'est passé.`,
        },
        {
          content: `Enfin, la conclusion permet de déterminer si notre hypothèse était correcte ou non. Si les résultats confirment l'hypothèse, on peut la considérer comme valide. Sinon, on doit proposer une nouvelle hypothèse et recommencer le processus.`,
        },
        {
          content: `La méthode scientifique est un processus cyclique : les conclusions d'une expérience peuvent mener à de nouvelles observations et de nouvelles questions. C'est ainsi que la science progresse et que notre compréhension du monde s'améliore constamment!`,
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
        ],
      },
    },
  };

  // Load lesson from database
  useEffect(() => {
    const loadLesson = async () => {
      setLoading(true);
      try {
        // Try to get lesson from database by ID
        const lessons = await lessonService.getLessons('science', null, {});
        const dbLesson = lessons.find(l => l.id === lessonId || l.chapter_id === lessonId);
        
        if (dbLesson) {
          // Convert database format to component format
          const contentParagraphs = dbLesson.content.split(/\n\n+/).filter(p => p.trim());
          const pages = contentParagraphs.map((paragraph, index) => {
            const page = { content: paragraph.trim() };
            
            if (index === 0 && dbLesson.fun_fact) {
              page.funFact = dbLesson.fun_fact;
            }
            
            if (index === 1 && dbLesson.vocabulary) {
              page.vocabulary = typeof dbLesson.vocabulary === 'string' 
                ? JSON.parse(dbLesson.vocabulary) 
                : dbLesson.vocabulary;
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
          // Fallback to hardcoded content
          const fallbackLesson = fallbackLessonContent[lessonId] || fallbackLessonContent['introduction-methode-scientifique'];
          setLesson(fallbackLesson);
        }
      } catch (error) {
        console.error('Error loading lesson:', error);
        // Fallback to hardcoded content on error
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

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-0">
      <Link
        to="/science"
        className="inline-flex items-center space-x-2 text-blue-300 hover:text-blue-200 mb-4 sm:mb-6 text-sm sm:text-base"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Retour à la Science</span>
      </Link>

      {!showQuiz ? (
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-blue-500/20 shadow-2xl">
          {/* Header with icon */}
          <div className="flex items-center justify-center space-x-3 mb-6">
            <FlaskConical className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
              {lesson.title}
            </h1>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Drop Cap for first paragraph */}
            {currentPage === 0 && (
              <div className="mb-6">
                <span className="float-left text-6xl md:text-8xl font-bold text-blue-400 leading-none mr-3 mt-2">
                  L
                </span>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  {currentPageData.content}
                </p>
              </div>
            )}

            {currentPage > 0 && (
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                {currentPageData.content}
              </p>
            )}

            {/* Fun Fact Callout */}
            {currentPageData.funFact && (
              <div className="bg-blue-500/20 border-l-4 border-blue-400 p-4 my-6 rounded-r-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <FlaskConical className="w-5 h-5 text-blue-300" />
                  <div className="font-bold text-blue-300 text-base">Le saviez-vous?</div>
                </div>
                <p className="text-blue-200 text-sm md:text-base">{currentPageData.funFact}</p>
              </div>
            )}

            {/* Vocabulary Callout */}
            {currentPageData.vocabulary && (
              <div className="bg-cyan-500/20 border-l-4 border-cyan-400 p-4 my-6 rounded-r-lg">
                <div className="font-bold text-cyan-300 mb-3 text-base">📚 Vocabulaire scientifique</div>
                <div className="space-y-2">
                  {Object.entries(currentPageData.vocabulary).map(([term, definition]) => (
                    <div key={term}>
                      <span className="font-semibold text-cyan-200">{term}:</span>{' '}
                      <span className="text-cyan-100 text-sm md:text-base">{definition}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Page Indicator */}
            <div className="text-center mt-8 text-gray-400 text-sm">
              Page {currentPage + 1} sur {totalPages}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 0}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Précédent</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all font-semibold"
            >
              <span>{isLastPage ? 'Quiz' : 'Suivant'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-blue-500/20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Quiz de révision</h2>
          
          <div className="space-y-6">
            {lesson.quiz.questions.map((question) => {
              const userAnswer = quizAnswers[question.id];
              const isCorrect = userAnswer === question.correct;
              
              return (
                <div
                  key={question.id}
                  className="bg-white/5 rounded-xl p-6 border border-white/10"
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
                              : 'bg-white/5 border-white/10 hover:border-white/20'
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

          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <button
              onClick={handlePrevious}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-all w-full sm:w-auto"
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
  );
};

export default ScienceLesson;
