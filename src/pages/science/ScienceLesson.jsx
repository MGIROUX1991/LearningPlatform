import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { lessonService } from '../../services/adminService';
import { ArrowLeft, ArrowRight, CheckCircle, FlaskConical, Search, Lightbulb, TestTube, BarChart3, MessageSquare, Sparkles, FileText, Presentation, Image, Video, TrendingUp, Eye, Target } from 'lucide-react';

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
  const [selectedCommunication, setSelectedCommunication] = useState(null);

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
        illustration: '🌱☀️ vs 🌱🌑',
        hasVisualComparison: true,
        comparison: {
          items: [
            {
              label: 'Plante au soleil',
              icon: '🌱',
              bgColor: 'bg-yellow-500/20',
              borderColor: 'border-yellow-400/50',
              description: 'Plante près de la fenêtre'
            },
            {
              label: 'Plante dans le noir',
              icon: '🌱',
              bgColor: 'bg-slate-600/30',
              borderColor: 'border-slate-500/50',
              description: 'Plante dans le placard'
            }
          ],
          observation: 'Les plantes près de la fenêtre sont plus grandes et plus vertes.'
        }
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
        illustration: '❓',
        hasVisualCard: true,
        visualCard: {
          icon: '❓',
          bgColor: 'bg-green-500/20',
          borderColor: 'border-green-400/50',
          question: 'Pourquoi les plantes poussent-elles mieux au soleil?',
          characteristics: [
            'Question claire et précise',
            'Peut être testée par une expérience',
            'Porte sur un phénomène observable'
          ]
        }
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
        illustration: '💡',
        hasVisualCard: true,
        visualCard: {
          icon: '💡',
          bgColor: 'bg-purple-500/20',
          borderColor: 'border-purple-400/50',
          hypothesis: 'Les plantes ont besoin de lumière pour faire la photosynthèse et grandir.',
          explanation: 'Cette hypothèse peut être testée en comparant la croissance de plantes avec et sans lumière.'
        }
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
        illustration: '🔬',
        hasVisualSteps: true,
        visualSteps: {
          icon: '🔬',
          bgColor: 'bg-teal-500/20',
          borderColor: 'border-teal-400/50',
          steps: [
            { number: 1, text: 'Placer deux plantes identiques' },
            { number: 2, text: 'Une au soleil, une dans le noir' },
            { number: 3, text: 'Mesurer leur croissance après 2 semaines' }
          ],
          variables: 'Variable indépendante: lumière | Variable dépendante: croissance'
        }
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
        illustration: '📊',
        hasChart: true,
        chartData: {
          labels: ['Soleil', 'Noir'],
          values: [10, 2],
          colors: ['#10b981', '#3b82f6'],
          unit: 'cm'
        },
        dataPoints: [
          { label: 'Plante au soleil', value: '10 cm' },
          { label: 'Plante dans noir', value: '2 cm' }
        ],
        conclusion: 'Les données confirment l\'hypothèse.'
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
        illustration: '✅',
        hasVisualCard: true,
        visualCard: {
          icon: '✅',
          bgColor: 'bg-red-500/20',
          borderColor: 'border-red-400/50',
          conclusion: 'L\'hypothèse est confirmée: les plantes ont besoin de lumière pour bien pousser.',
          result: 'Les données montrent une différence significative entre les deux conditions.'
        }
      }
    },
  ];

  // Communication scientifique aspects with colors and icons
  const communicationAspects = [
    {
      id: 'formats',
      title: 'Formats de communication',
      description: 'Rapport écrit, présentation orale, affiche, vidéo',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      example: {
        title: 'Exemple de format',
        content: 'Un rapport écrit permet de documenter en détail votre recherche, tandis qu\'une présentation orale est idéale pour partager vos découvertes avec un public.',
        illustration: '📝📊'
      }
    },
    {
      id: 'structure',
      title: 'Structure du rapport',
      description: 'Introduction, méthodologie, résultats, discussion, conclusion',
      icon: Presentation,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      example: {
        title: 'Exemple de structure',
        content: 'Chaque section a un rôle précis: l\'introduction présente le contexte, la méthodologie explique comment vous avez procédé, les résultats montrent vos données, la discussion les interprète, et la conclusion résume vos découvertes.',
        illustration: '📑'
      }
    },
    {
      id: 'visuels',
      title: 'Outils visuels',
      description: 'Graphiques, tableaux, diagrammes pour présenter les données',
      icon: BarChart3,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      example: {
        title: 'Exemple d\'outil visuel',
        content: 'Un graphique en barres peut montrer la croissance des plantes dans différentes conditions. Un bon graphique transmet plus d\'informations qu\'un long texte.',
        illustration: '📈'
      }
    },
    {
      id: 'clarte',
      title: 'Clarté',
      description: 'Langage précis, éviter le jargon, expliquer les termes techniques',
      icon: Eye,
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-500/10',
      borderColor: 'border-teal-500/30',
      example: {
        title: 'Exemple de clarté',
        content: 'Au lieu de dire "les organismes photosynthétiques", dites "les plantes". Utilisez des mots simples et expliquez les concepts complexes.',
        illustration: '💬'
      }
    },
    {
      id: 'objectivite',
      title: 'Objectivité',
      description: 'Présenter les résultats tels qu\'ils sont, sans biais',
      icon: Target,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      example: {
        title: 'Exemple d\'objectivité',
        content: 'Même si vos résultats ne confirment pas votre hypothèse, présentez-les honnêtement. La science progresse grâce à la transparence.',
        illustration: '🎯'
      }
    },
    {
      id: 'public',
      title: 'Adapter au public',
      description: 'Adapter le contenu et le langage selon votre auditoire',
      icon: MessageSquare,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      example: {
        title: 'Exemple d\'adaptation',
        content: 'Pour des élèves de votre âge, utilisez des exemples concrets et un langage accessible. Pour des scientifiques, vous pouvez utiliser plus de termes techniques.',
        illustration: '👥'
      }
    },
  ];

  // Minimal fallback for error cases (all lessons should be in database)
  const fallbackLessonContent = {
    default: {
      title: 'Leçon non trouvée',
      pages: [
        {
          content: 'Cette leçon n\'a pas pu être chargée depuis la base de données. Veuillez contacter un administrateur si le problème persiste.',
        },
      ],
      quiz: {
        questions: [],
      },
    },
  };

  // Mark lesson as visited
  useEffect(() => {
    if (lessonId) {
      const visitedLessons = JSON.parse(localStorage.getItem('visited_lessons') || '{}');
      visitedLessons[`science_${lessonId}`] = true;
      localStorage.setItem('visited_lessons', JSON.stringify(visitedLessons));
    }
  }, [lessonId]);

  // Load lesson from database (same pattern as HistoryLesson)
  useEffect(() => {
    const loadLesson = async () => {
      setLoading(true);
      try {
        // Try to get lesson from database by chapter_id (same as history)
        const lessons = await lessonService.getLessons('science', lessonId);
        if (lessons && lessons.length > 0) {
          const dbLesson = lessons[0]; // Get first lesson for this chapter
          
          // Convert database format to component format (same as history)
          // Split content by double newlines to create pages
          const contentParagraphs = dbLesson.content.split(/\n\n+/).filter(p => p.trim());
          const pages = contentParagraphs.map((paragraph, index) => {
            const page = { content: paragraph.trim() };
            
            // Add fun_fact to first page if it exists
            if (index === 0 && dbLesson.fun_fact) {
              page.funFact = dbLesson.fun_fact;
            }
            
            // Add vocabulary to second page if it exists
            if (index === 1 && dbLesson.vocabulary) {
              page.vocabulary = dbLesson.vocabulary;
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
          // Lesson not found in database - show error message
          console.warn(`Lesson not found in database: ${lessonId}`);
          setLesson(fallbackLessonContent.default);
        }
      } catch (error) {
        console.error('Error loading lesson:', error);
        // Fallback to error message on error
        setLesson(fallbackLessonContent.default);
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
  const isCommunicationLesson = lesson.title === 'Communiquer des résultats scientifiques' || lessonId === 'communiquer-resultats-scientifiques';
  const selectedStepData = selectedStep ? scientificSteps.find(s => s.id === selectedStep) : scientificSteps[0];
  const selectedCommunicationData = selectedCommunication ? communicationAspects.find(c => c.id === selectedCommunication) : communicationAspects[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 font-architects">
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

            {/* Content from database - Show for all pages */}
            {currentPageData.content && (
              <div className="mb-8">
                <p className="text-base md:text-lg text-gray-300 leading-relaxed whitespace-pre-line">
                  {currentPageData.content}
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

            {/* Steps Grid - Full Width - Only show on first page */}
            {currentPage === 0 && isCommunicationLesson ? (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Les aspects de la communication scientifique</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {communicationAspects.map((aspect) => {
                      const Icon = aspect.icon;
                      const isSelected = selectedCommunication === aspect.id || (!selectedCommunication && aspect.id === 'formats');
                      
                      return (
                        <button
                          key={aspect.id}
                          onClick={() => setSelectedCommunication(aspect.id)}
                          className={`text-left p-5 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                            isSelected
                              ? `${aspect.bgColor} ${aspect.borderColor} border-opacity-60 shadow-lg`
                              : 'bg-slate-700/30 border-slate-600/30 hover:border-slate-500/50'
                          }`}
                        >
                          <div className="flex items-start space-x-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${aspect.color} flex-shrink-0`}>
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-bold text-white mb-1">{aspect.title}</h3>
                              <p className="text-sm text-gray-400 leading-relaxed">{aspect.description}</p>
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
                    <MessageSquare className="w-5 h-5" />
                    <span>{selectedCommunicationData.example.title}</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="bg-slate-900/50 rounded-xl p-8 text-center border border-slate-700/50">
                      <div className="text-5xl mb-3">{selectedCommunicationData.example.illustration}</div>
                      <p className="text-sm text-gray-400">Illustration</p>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedCommunicationData.example.content}
                    </p>
                  </div>
                </div>
              </>
            ) : currentPage === 0 ? (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Les étapes de la méthode scientifique</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="mb-8 bg-slate-800/60 backdrop-blur-sm rounded-2xl border-2 border-dashed border-cyan-400/40 p-6 relative">
                  {/* Sparkle icon in bottom right */}
                  <div className="absolute bottom-4 right-4 text-yellow-400/60">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-cyan-300 mb-6 flex items-center space-x-2">
                    <FlaskConical className="w-5 h-5" />
                    <span>{selectedStepData.example.title}</span>
                  </h3>
                  
                  {selectedStepData.example.hasChart ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                      {/* Chart Section */}
                      <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
                        <div className="relative h-64 w-full">
                          <svg 
                            viewBox="0 0 300 250" 
                            className="w-full h-full"
                            preserveAspectRatio="xMidYMid meet"
                          >
                            {/* Grid lines */}
                            <defs>
                              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(148, 163, 184, 0.15)" strokeWidth="1"/>
                              </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                            
                            {/* Y-axis labels */}
                            {[0, 2, 4, 6, 8, 10].map((val) => {
                              const yPos = 200 - (val * 18);
                              return (
                                <g key={val}>
                                  <line
                                    x1="40"
                                    y1={yPos}
                                    x2="260"
                                    y2={yPos}
                                    stroke="rgba(148, 163, 184, 0.2)"
                                    strokeWidth="0.5"
                                    strokeDasharray="2,2"
                                  />
                                  <text
                                    x="35"
                                    y={yPos + 4}
                                    className="text-xs fill-gray-400 font-medium"
                                    textAnchor="end"
                                  >
                                    {val}
                                  </text>
                                </g>
                              );
                            })}
                            
                            {/* Bars */}
                            {selectedStepData.example.chartData.labels.map((label, index) => {
                              const value = selectedStepData.example.chartData.values[index];
                              const color = selectedStepData.example.chartData.colors[index];
                              const maxValue = 10;
                              const barHeight = (value / maxValue) * 180;
                              const barWidth = 50;
                              const spacing = 80;
                              const xPosition = 60 + (index * spacing);
                              const yPosition = 200 - barHeight;
                              
                              return (
                                <g key={label}>
                                  {/* Bar with gradient */}
                                  <defs>
                                    <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" stopColor={color} stopOpacity="0.9" />
                                      <stop offset="100%" stopColor={color} stopOpacity="0.7" />
                                    </linearGradient>
                                  </defs>
                                  <rect
                                    x={xPosition}
                                    y={yPosition}
                                    width={barWidth}
                                    height={barHeight}
                                    fill={`url(#gradient-${index})`}
                                    rx="6"
                                    className="drop-shadow-md"
                                  />
                                  {/* Value label on bar */}
                                  <text
                                    x={xPosition + barWidth / 2}
                                    y={yPosition - 8}
                                    className="text-sm font-bold fill-white"
                                    textAnchor="middle"
                                    style={{ fontSize: '12px' }}
                                  >
                                    {value} {selectedStepData.example.chartData.unit}
                                  </text>
                                  {/* X-axis label */}
                                  <text
                                    x={xPosition + barWidth / 2}
                                    y={220}
                                    className="text-sm fill-gray-300 font-medium"
                                    textAnchor="middle"
                                    style={{ fontSize: '13px' }}
                                  >
                                    {label}
                                  </text>
                                </g>
                              );
                            })}
                            
                            {/* X-axis line */}
                            <line
                              x1="40"
                              y1="200"
                              x2="260"
                              y2="200"
                              stroke="rgba(148, 163, 184, 0.4)"
                              strokeWidth="2"
                            />
                            
                            {/* Y-axis line */}
                            <line
                              x1="40"
                              y1="20"
                              x2="40"
                              y2="200"
                              stroke="rgba(148, 163, 184, 0.4)"
                              strokeWidth="2"
                            />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Data and Conclusion Section */}
                      <div className="space-y-4">
                        {/* Dashed arrow pointing to data */}
                        <div className="flex items-center space-x-2 text-cyan-400/60 mb-2">
                          <div className="flex-1 border-t-2 border-dashed border-cyan-400/40"></div>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-bold text-white mb-3">Données recueillies:</h4>
                          <ul className="space-y-2 mb-4">
                            {selectedStepData.example.dataPoints.map((point, index) => (
                              <li key={index} className="text-gray-300 flex items-center space-x-2">
                                <span className="text-cyan-400">•</span>
                                <span>{point.label}: <span className="font-semibold text-white">[{point.value}]</span></span>
                              </li>
                            ))}
                          </ul>
                          
                          {/* Conclusion box */}
                          <div className="bg-green-500/20 border border-green-500/40 rounded-xl p-4 mt-4">
                            <p className="text-green-300 font-semibold">
                              <span className="text-green-400">Conclusion: </span>
                              {selectedStepData.example.conclusion}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : selectedStepData.example.hasVisualComparison ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                      {/* Visual Comparison Section */}
                      <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
                        <div className="flex items-center justify-center gap-6">
                          {selectedStepData.example.comparison.items.map((item, index) => (
                            <div key={index} className="flex flex-col items-center">
                              <div className={`w-32 h-32 rounded-full ${item.bgColor} border-4 ${item.borderColor} flex items-center justify-center mb-3 shadow-lg`}>
                                <span className="text-6xl">{item.icon}</span>
                              </div>
                              <div className="text-center">
                                <p className="text-white font-semibold text-sm mb-1">{item.label}</p>
                                <p className="text-gray-400 text-xs">{item.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 text-center">
                          <span className="text-gray-400 text-2xl font-bold">VS</span>
                        </div>
                      </div>
                      
                      {/* Observation Text Section */}
                      <div className="space-y-4">
                        {/* Dashed arrow pointing to observation */}
                        <div className="flex items-center space-x-2 text-cyan-400/60 mb-2">
                          <div className="flex-1 border-t-2 border-dashed border-cyan-400/40"></div>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-bold text-white mb-3">Observation:</h4>
                          <p className="text-gray-300 leading-relaxed mb-4">
                            {selectedStepData.example.comparison.observation}
                          </p>
                          
                          {/* Observation box */}
                          <div className="bg-blue-500/20 border border-blue-500/40 rounded-xl p-4 mt-4">
                            <p className="text-blue-300 font-semibold">
                              <span className="text-blue-400">Note: </span>
                              {selectedStepData.example.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : selectedStepData.example.hasVisualCard ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                      {/* Visual Card Section */}
                      <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
                        <div className="flex flex-col items-center justify-center h-full">
                          <div className={`w-40 h-40 rounded-full ${selectedStepData.example.visualCard.bgColor} border-4 ${selectedStepData.example.visualCard.borderColor} flex items-center justify-center mb-4 shadow-lg`}>
                            <span className="text-7xl">{selectedStepData.example.visualCard.icon}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Content Section */}
                      <div className="space-y-4">
                        {/* Dashed arrow pointing to content */}
                        <div className="flex items-center space-x-2 text-cyan-400/60 mb-2">
                          <div className="flex-1 border-t-2 border-dashed border-cyan-400/40"></div>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                        
                        <div>
                          {selectedStepData.example.visualCard.question && (
                            <>
                              <h4 className="text-lg font-bold text-white mb-3">Question:</h4>
                              <p className="text-gray-300 leading-relaxed mb-4 text-lg">
                                {selectedStepData.example.visualCard.question}
                              </p>
                              <ul className="space-y-2 mb-4">
                                {selectedStepData.example.visualCard.characteristics?.map((char, index) => (
                                  <li key={index} className="text-gray-300 flex items-center space-x-2">
                                    <span className="text-cyan-400">•</span>
                                    <span>{char}</span>
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}
                          {selectedStepData.example.visualCard.hypothesis && (
                            <>
                              <h4 className="text-lg font-bold text-white mb-3">Hypothèse:</h4>
                              <p className="text-gray-300 leading-relaxed mb-4">
                                {selectedStepData.example.visualCard.hypothesis}
                              </p>
                              <p className="text-gray-400 text-sm italic">
                                {selectedStepData.example.visualCard.explanation}
                              </p>
                            </>
                          )}
                          {selectedStepData.example.visualCard.conclusion && (
                            <>
                              <h4 className="text-lg font-bold text-white mb-3">Conclusion:</h4>
                              <p className="text-gray-300 leading-relaxed mb-4">
                                {selectedStepData.example.visualCard.conclusion}
                              </p>
                              <p className="text-gray-400 text-sm">
                                {selectedStepData.example.visualCard.result}
                              </p>
                            </>
                          )}
                          
                          {/* Info box */}
                          <div className={`${selectedStepData.example.visualCard.bgColor} border ${selectedStepData.example.visualCard.borderColor} rounded-xl p-4 mt-4`}>
                            <p className="text-white font-semibold">
                              {selectedStepData.example.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : selectedStepData.example.hasVisualSteps ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                      {/* Visual Steps Section */}
                      <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
                        <div className="flex flex-col items-center justify-center h-full">
                          <div className={`w-40 h-40 rounded-full ${selectedStepData.example.visualSteps.bgColor} border-4 ${selectedStepData.example.visualSteps.borderColor} flex items-center justify-center mb-4 shadow-lg`}>
                            <span className="text-7xl">{selectedStepData.example.visualSteps.icon}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Steps Content Section */}
                      <div className="space-y-4">
                        {/* Dashed arrow pointing to steps */}
                        <div className="flex items-center space-x-2 text-cyan-400/60 mb-2">
                          <div className="flex-1 border-t-2 border-dashed border-cyan-400/40"></div>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-bold text-white mb-3">Étapes de l'expérience:</h4>
                          <ul className="space-y-3 mb-4">
                            {selectedStepData.example.visualSteps.steps.map((step, index) => (
                              <li key={index} className="flex items-start space-x-3">
                                <div className={`w-8 h-8 rounded-full ${selectedStepData.example.visualSteps.bgColor} border-2 ${selectedStepData.example.visualSteps.borderColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                  <span className="text-white font-bold text-sm">{step.number}</span>
                                </div>
                                <span className="text-gray-300 flex-1">{step.text}</span>
                              </li>
                            ))}
                          </ul>
                          
                          {/* Variables box */}
                          <div className={`${selectedStepData.example.visualSteps.bgColor} border ${selectedStepData.example.visualSteps.borderColor} rounded-xl p-4 mt-4`}>
                            <p className="text-white font-semibold text-sm">
                              {selectedStepData.example.visualSteps.variables}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      <div className="bg-slate-900/50 rounded-xl p-8 text-center border border-slate-700/50">
                        <div className="text-5xl mb-3">{selectedStepData.example.illustration}</div>
                        <p className="text-sm text-gray-400">Illustration</p>
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                        {selectedStepData.example.content}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}

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
