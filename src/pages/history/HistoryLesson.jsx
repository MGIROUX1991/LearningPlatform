import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

const HistoryLesson = () => {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const { addXP, updateStreak, completeLesson, completeChapter, completeQuest } = useApp();
  const [currentPage, setCurrentPage] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Sample lesson content - in a real app, this would come from a data source
  const lessonContent = {
    chapter1: {
      title: 'Les Grands Explorateurs',
      pages: [
        {
          content: `Au début du XVIe siècle, l'Europe était en pleine expansion. Les royaumes d'Espagne, du Portugal, de France et d'Angleterre cherchaient de nouvelles routes commerciales et de nouvelles terres à explorer.`,
          funFact: 'Le premier explorateur européen à atteindre l\'Amérique du Nord fut probablement Jean Cabot en 1497, naviguant pour le compte de l\'Angleterre.',
        },
        {
          content: `Jacques Cartier, un navigateur français de Saint-Malo, fut chargé par le roi François Ier de trouver une route vers l'Asie et de découvrir des terres riches en or et en épices. En 1534, il entreprit son premier voyage vers le Nouveau Monde.`,
          vocabulary: {
            'Navigateur': 'Personne qui dirige un navire en mer',
            'Nouveau Monde': 'Terme utilisé par les Européens pour désigner les Amériques',
          },
        },
        {
          content: `Lors de son premier voyage, Cartier explora le golfe du Saint-Laurent et rencontra des peuples autochtones, notamment les Mi'kmaq et les Iroquoiens du Saint-Laurent. Il prit possession de la terre au nom du roi de France, plantant une croix à Gaspé.`,
        },
        {
          content: `Cartier effectua trois voyages au total (1534, 1535-1536, et 1541-1542). Lors de son deuxième voyage, il remonta le fleuve Saint-Laurent jusqu'à Hochelaga (aujourd'hui Montréal), où il fut accueilli par les habitants iroquoiens.`,
        },
      ],
      quiz: {
        questions: [
          {
            id: 1,
            question: 'Qui fut le premier explorateur français à naviguer vers le Nouveau Monde?',
            options: ['Jean Cabot', 'Jacques Cartier', 'Samuel de Champlain', 'Henry Hudson'],
            correct: 1,
          },
          {
            id: 2,
            question: 'En quelle année Jacques Cartier effectua-t-il son premier voyage?',
            options: ['1497', '1534', '1608', '1663'],
            correct: 1,
          },
          {
            id: 3,
            question: 'Jusqu\'où Cartier remonta-t-il le fleuve Saint-Laurent lors de son deuxième voyage?',
            options: ['Québec', 'Trois-Rivières', 'Hochelaga (Montréal)', 'Gaspé'],
            correct: 2,
          },
        ],
      },
    },
  };

  const lesson = lessonContent[chapterId] || lessonContent.chapter1;
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
      completeQuest(1); // Complete lesson quest
    }
  };

  const handleComplete = () => {
    completeLesson('history', `${chapterId}-lesson`);
    completeChapter('history', chapterId);
    addXP(100);
    completeQuest(3); // Complete "Explorer l'histoire" quest
    navigate('/history');
  };

  const currentPageData = lesson.pages[currentPage];

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/history"
        className="inline-flex items-center space-x-2 text-blue-300 hover:text-blue-200 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Retour à l'Histoire</span>
      </Link>

      {!showQuiz ? (
        <div className="relative">
          {/* Wooden Rod Top */}
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-b from-amber-800 to-amber-900 h-8 w-full max-w-2xl rounded-t-lg border-2 border-amber-700 shadow-lg">
              <div className="flex justify-center items-center h-full">
                <div className="w-16 h-3 bg-amber-700 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Parchment Scroll */}
          <div className="parchment-bg scroll-texture rounded-lg border-4 border-amber-800/50 shadow-2xl p-12 relative">
            {/* Decorative Corners */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-amber-700/50"></div>
            <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-amber-700/50"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-amber-700/50"></div>
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-amber-700/50"></div>

            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold text-amber-900 mb-8 text-center font-serif">
                {lesson.title}
              </h1>

              {/* Drop Cap for first paragraph */}
              {currentPage === 0 && (
                <div className="mb-6">
                  <span className="float-left text-8xl font-bold text-amber-800 leading-none mr-2 mt-2 font-serif">
                    A
                  </span>
                  <p className="text-lg text-amber-900 leading-relaxed font-serif">
                    {currentPageData.content}
                  </p>
                </div>
              )}

              {currentPage > 0 && (
                <p className="text-lg text-amber-900 leading-relaxed mb-6 font-serif">
                  {currentPageData.content}
                </p>
              )}

              {/* Fun Fact Callout */}
              {currentPageData.funFact && (
                <div className="bg-amber-200/60 border-l-4 border-amber-600 p-4 my-6 rounded-r-lg">
                  <div className="font-bold text-amber-900 mb-2">💡 Le saviez-vous?</div>
                  <p className="text-amber-800 font-serif">{currentPageData.funFact}</p>
                </div>
              )}

              {/* Vocabulary Callout */}
              {currentPageData.vocabulary && (
                <div className="bg-blue-100/60 border-l-4 border-blue-600 p-4 my-6 rounded-r-lg">
                  <div className="font-bold text-blue-900 mb-2">📚 Vocabulaire</div>
                  <div className="space-y-2">
                    {Object.entries(currentPageData.vocabulary).map(([term, definition]) => (
                      <div key={term}>
                        <span className="font-semibold text-blue-900">{term}:</span>{' '}
                        <span className="text-blue-800 font-serif">{definition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Page Indicator */}
              <div className="text-center mt-8 text-amber-700 font-serif">
                Page {currentPage + 1} sur {totalPages}
              </div>
            </div>
          </div>

          {/* Wooden Rod Bottom */}
          <div className="flex justify-center mt-4">
            <div className="bg-gradient-to-b from-amber-800 to-amber-900 h-8 w-full max-w-2xl rounded-b-lg border-2 border-amber-700 shadow-lg">
              <div className="flex justify-center items-center h-full">
                <div className="w-16 h-3 bg-amber-700 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
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
              className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all"
            >
              <span>{isLastPage ? 'Quiz' : 'Suivant'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-8 border border-blue-500/20">
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
                          <div className="flex items-center justify-between">
                            <span className="text-white">{option}</span>
                            {showCorrect && <CheckCircle className="w-5 h-5 text-green-400" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={handlePrevious}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour</span>
            </button>

            {!quizCompleted ? (
              <button
                onClick={handleCompleteQuiz}
                disabled={!lesson.quiz.questions.every(q => quizAnswers[q.id] !== undefined)}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
              >
                Soumettre les réponses
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all font-semibold flex items-center space-x-2"
              >
                <span>Terminer le chapitre</span>
                <CheckCircle className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryLesson;

