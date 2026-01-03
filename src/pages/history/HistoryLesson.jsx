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

  // Lesson content for all history chapters
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
    chapter2: {
      title: 'La Traversée',
      pages: [
        {
          content: `La traversée de l'Atlantique était une épreuve redoutable pour les explorateurs et les colons du XVIe et XVIIe siècles. Les navires de l'époque étaient petits, fragiles et entièrement dépendants des vents et des courants marins.`,
          funFact: 'La traversée moyenne durait entre 6 et 12 semaines, selon les conditions météorologiques. Beaucoup de passagers souffraient du mal de mer et de maladies comme le scorbut.',
        },
        {
          content: `Les navires utilisés pour la traversée étaient principalement des voiliers à trois mâts, comme les caravelles et les navires de commerce. Ces embarcations transportaient non seulement des passagers, mais aussi des provisions, des outils, des animaux et des marchandises.`,
          vocabulary: {
            'Caravelle': 'Type de navire à voiles utilisé pour les voyages transatlantiques',
            'Scorbut': 'Maladie causée par une carence en vitamine C, fréquente lors des longues traversées',
          },
        },
        {
          content: `Les conditions à bord étaient extrêmement difficiles. Les passagers vivaient dans des espaces confinés, souvent dans l'obscurité et l'humidité. La nourriture se détériorait rapidement, et l'eau douce était précieuse. Les maladies se propageaient facilement dans ces conditions.`,
        },
        {
          content: `Malgré ces difficultés, des milliers de personnes ont bravé l'océan Atlantique pour rejoindre le Nouveau Monde. Ils étaient motivés par l'espoir d'une vie meilleure, la recherche de richesses, ou simplement l'esprit d'aventure.`,
        },
        {
          content: `La traversée était aussi un moment de grande incertitude. Les navigateurs devaient s'orienter sans instruments modernes, en se fiant aux étoiles, au soleil et à leur expérience. Les tempêtes pouvaient durer des jours, mettant en danger la vie de tous à bord.`,
        },
      ],
      quiz: {
        questions: [
          {
            id: 1,
            question: 'Combien de temps durait généralement une traversée de l\'Atlantique au XVIe siècle?',
            options: ['2-3 semaines', '6-12 semaines', '3-4 mois', '6 mois'],
            correct: 1,
          },
          {
            id: 2,
            question: 'Quelle maladie était fréquente lors des longues traversées?',
            options: ['La grippe', 'Le scorbut', 'La variole', 'La peste'],
            correct: 1,
          },
          {
            id: 3,
            question: 'Comment les navigateurs s\'orientaient-ils lors de la traversée?',
            options: ['Avec des GPS', 'En se fiant aux étoiles et au soleil', 'En suivant les oiseaux', 'En utilisant des boussoles modernes'],
            correct: 1,
          },
        ],
      },
    },
    chapter3: {
      title: 'Fondation de Québec',
      pages: [
        {
          content: `En 1608, Samuel de Champlain, considéré comme le "Père de la Nouvelle-France", fonda la ville de Québec. Cette fondation marqua le début de la première colonie permanente française en Amérique du Nord.`,
          funFact: 'Québec fut la première ville permanente fondée par les Français en Amérique du Nord. Le nom "Québec" vient du mot algonquin "kébec", qui signifie "là où le fleuve se rétrécit".',
        },
        {
          content: `Champlain choisit l'emplacement de Québec pour sa position stratégique. Situé sur un promontoire surplombant le fleuve Saint-Laurent, le site offrait une défense naturelle et un contrôle sur la navigation fluviale.`,
          vocabulary: {
            'Colonie permanente': 'Établissement destiné à durer, contrairement aux postes de traite temporaires',
            'Promontoire': 'Éminence rocheuse qui s\'avance dans la mer ou un fleuve',
          },
        },
        {
          content: `La première habitation de Québec était un fort en bois, entouré de palissades. À l'intérieur, on trouvait des logements, un entrepôt, une forge et une chapelle. Les premiers colons vivaient dans des conditions difficiles, face aux rigueurs de l'hiver canadien.`,
        },
        {
          content: `Malgré les défis, Québec devint rapidement un centre important pour la traite des fourrures. Les Français établirent des relations commerciales avec les peuples autochtones, échangeant des objets européens contre des peaux de castor et d'autres fourrures.`,
        },
        {
          content: `La fondation de Québec ouvrit la voie à l'expansion française en Amérique du Nord. Au cours des décennies suivantes, d'autres établissements furent créés, formant le réseau de la Nouvelle-France qui s'étendit jusqu'à la Louisiane.`,
        },
      ],
      quiz: {
        questions: [
          {
            id: 1,
            question: 'Qui fonda la ville de Québec en 1608?',
            options: ['Jacques Cartier', 'Samuel de Champlain', 'Jean Talon', 'Louis XIV'],
            correct: 1,
          },
          {
            id: 2,
            question: 'Que signifie le mot "Québec" en algonquin?',
            options: ['Grande ville', 'Là où le fleuve se rétrécit', 'Montagne', 'Fort'],
            correct: 1,
          },
          {
            id: 3,
            question: 'Pourquoi Champlain choisit-il l\'emplacement de Québec?',
            options: ['Pour l\'or', 'Pour sa position stratégique et sa défense naturelle', 'Pour le climat', 'Pour les animaux'],
            correct: 1,
          },
        ],
      },
    },
    chapter4: {
      title: 'La Vie Quotidienne',
      pages: [
        {
          content: `La vie quotidienne en Nouvelle-France était marquée par le travail acharné, l'adaptation à un nouveau climat et la construction d'une société dans un environnement souvent hostile. Les colons devaient être autonomes et résilients.`,
          funFact: 'Les hivers québécois étaient si rigoureux que les colons devaient adapter leurs techniques agricoles et leurs habitudes de vie. Beaucoup apprirent des peuples autochtones comment survivre dans ce climat.',
        },
        {
          content: `L'agriculture était au cœur de la vie quotidienne. Les colons cultivaient principalement du blé, des légumes et élevaient des animaux. Les terres étaient défrichées à la main, un travail long et épuisant. Chaque famille avait son lopin de terre à cultiver.`,
          vocabulary: {
            'Seigneurie': 'Système de propriété terrienne où un seigneur accordait des terres à des censitaires',
            'Censitaires': 'Colons qui recevaient des terres d\'un seigneur en échange de redevances',
          },
        },
        {
          content: `Le système seigneurial organisait la distribution des terres. Le roi accordait de grandes terres à des seigneurs, qui les divisaient ensuite en lots pour les colons. Ces derniers devaient payer des redevances et travailler quelques jours par an pour le seigneur.`,
        },
        {
          content: `L'artisanat était également important. Les colons fabriquaient leurs propres outils, meubles et vêtements. Les forgerons, charpentiers, cordonniers et autres artisans étaient essentiels à la communauté. Les femmes s'occupaient du foyer, du jardin et de l'éducation des enfants.`,
        },
        {
          content: `La religion jouait un rôle central dans la vie quotidienne. Les colons assistaient régulièrement à la messe, et les fêtes religieuses rythmaient l'année. Les missionnaires, notamment les Jésuites, étaient présents pour convertir les peuples autochtones et servir la communauté.`,
        },
        {
          content: `Malgré les difficultés, la vie en Nouvelle-France offrait aussi des moments de joie : les fêtes de village, les mariages, les récoltes abondantes. Les colons développèrent une culture unique, mélangeant les traditions françaises et les adaptations nécessaires à la vie en Amérique.`,
        },
      ],
      quiz: {
        questions: [
          {
            id: 1,
            question: 'Quel système organisait la distribution des terres en Nouvelle-France?',
            options: ['Le système féodal', 'Le système seigneurial', 'Le système démocratique', 'Le système communautaire'],
            correct: 1,
          },
          {
            id: 2,
            question: 'Qu\'est-ce qu\'un censitaire?',
            options: ['Un seigneur', 'Un colon qui reçoit des terres d\'un seigneur', 'Un missionnaire', 'Un artisan'],
            correct: 1,
          },
          {
            id: 3,
            question: 'Quel rôle jouait la religion dans la vie quotidienne?',
            options: ['Aucun', 'Un rôle central, rythmant l\'année', 'Seulement pour les fêtes', 'Uniquement pour les autochtones'],
            correct: 1,
          },
        ],
      },
    },
    chapter5: {
      title: 'Relations avec les Autochtones',
      pages: [
        {
          content: `Les relations entre les colons français et les peuples autochtones de la Nouvelle-France étaient complexes et variées. Contrairement à d'autres puissances coloniales, les Français adoptèrent souvent une approche plus collaborative avec les peuples autochtones.`,
          funFact: 'Les Français apprirent beaucoup des peuples autochtones, notamment sur la chasse, la pêche, la survie en hiver et l\'utilisation de plantes médicinales. En retour, ils introduisirent des outils en métal, des armes à feu et des textiles.',
        },
        {
          content: `La traite des fourrures fut le principal moteur des relations commerciales. Les Français échangeaient des objets européens (couteaux, haches, couvertures, perles) contre des fourrures, particulièrement des peaux de castor très prisées en Europe.`,
          vocabulary: {
            'Coureur des bois': 'Trappeur français qui vivait parmi les peuples autochtones',
            'Alliance': 'Accord de coopération entre les Français et les peuples autochtones',
          },
        },
        {
          content: `Les alliances militaires étaient également importantes. Les Français s'alliaient avec certaines nations autochtones, notamment les Hurons-Wendat et les Algonquins, contre leurs ennemis communs, comme les Iroquois. Ces alliances étaient cruciales pour la sécurité de la colonie.`,
        },
        {
          content: `Les missionnaires, particulièrement les Jésuites, jouèrent un rôle important dans les relations. Ils cherchaient à convertir les peuples autochtones au christianisme, mais certains apprirent aussi les langues et les cultures autochtones, créant des ponts entre les deux mondes.`,
        },
        {
          content: `Cependant, les relations n'étaient pas toujours harmonieuses. Les conflits éclataient parfois, notamment avec les Iroquois qui s'opposaient à l'expansion française. Les maladies européennes introduites par les colons décimèrent également de nombreuses communautés autochtones.`,
        },
        {
          content: `Malgré les défis, les relations franco-autochtones en Nouvelle-France furent généralement plus positives que dans d'autres colonies. Les mariages entre Français et Autochtones étaient relativement acceptés, et de nombreux métis jouèrent un rôle important dans le développement de la colonie.`,
        },
      ],
      quiz: {
        questions: [
          {
            id: 1,
            question: 'Quel était le principal moteur des relations commerciales entre Français et Autochtones?',
            options: ['L\'agriculture', 'La traite des fourrures', 'L\'exploitation minière', 'La pêche'],
            correct: 1,
          },
          {
            id: 2,
            question: 'Avec quels peuples autochtones les Français s\'allièrent-ils principalement?',
            options: ['Les Iroquois', 'Les Hurons-Wendat et les Algonquins', 'Les Sioux', 'Les Apaches'],
            correct: 1,
          },
          {
            id: 3,
            question: 'Qu\'est-ce qu\'un "coureur des bois"?',
            options: ['Un soldat', 'Un trappeur français qui vivait parmi les peuples autochtones', 'Un missionnaire', 'Un marchand'],
            correct: 1,
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

  const handleComplete = async () => {
    await completeLesson('history', `${chapterId}-lesson`);
    await completeChapter('history', chapterId);
    addXP(100);
    completeQuest(3); // Complete "Explorer l'histoire" quest
    // Small delay to ensure state updates before navigation
    setTimeout(() => {
      navigate('/history');
    }, 100);
  };

  const currentPageData = lesson.pages[currentPage];

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-0">
      <Link
        to="/history"
        className="inline-flex items-center space-x-2 text-blue-300 hover:text-blue-200 mb-4 sm:mb-6 text-sm sm:text-base"
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
          <div className="parchment-bg scroll-texture rounded-lg border-4 border-amber-800/50 shadow-2xl p-4 sm:p-6 md:p-12 relative">
            {/* Decorative Corners - Smaller on mobile */}
            <div className="absolute top-2 left-2 sm:top-4 sm:left-4 w-8 h-8 sm:w-12 sm:h-12 border-t-2 sm:border-t-4 border-l-2 sm:border-l-4 border-amber-700/50"></div>
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-12 sm:h-12 border-t-2 sm:border-t-4 border-r-2 sm:border-r-4 border-amber-700/50"></div>
            <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-8 h-8 sm:w-12 sm:h-12 border-b-2 sm:border-b-4 border-l-2 sm:border-l-4 border-amber-700/50"></div>
            <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-8 h-8 sm:w-12 sm:h-12 border-b-2 sm:border-b-4 border-r-2 sm:border-r-4 border-amber-700/50"></div>

            <div className="max-w-3xl mx-auto">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900 mb-4 sm:mb-6 md:mb-8 text-center font-serif">
                {lesson.title}
              </h1>

              {/* Drop Cap for first paragraph */}
              {currentPage === 0 && (
                <div className="mb-4 sm:mb-6">
                  <span className="float-left text-5xl sm:text-6xl md:text-8xl font-bold text-amber-800 leading-none mr-2 mt-1 sm:mt-2 font-serif">
                    A
                  </span>
                  <p className="text-sm sm:text-base md:text-lg text-amber-900 leading-relaxed font-serif">
                    {currentPageData.content}
                  </p>
                </div>
              )}

              {currentPage > 0 && (
                <p className="text-sm sm:text-base md:text-lg text-amber-900 leading-relaxed mb-4 sm:mb-6 font-serif">
                  {currentPageData.content}
                </p>
              )}

              {/* Fun Fact Callout */}
              {currentPageData.funFact && (
                <div className="bg-amber-200/60 border-l-4 border-amber-600 p-3 sm:p-4 my-4 sm:my-6 rounded-r-lg">
                  <div className="font-bold text-amber-900 mb-2 text-sm sm:text-base">💡 Le saviez-vous?</div>
                  <p className="text-xs sm:text-sm md:text-base text-amber-800 font-serif break-words">{currentPageData.funFact}</p>
                </div>
              )}

              {/* Vocabulary Callout */}
              {currentPageData.vocabulary && (
                <div className="bg-blue-100/60 border-l-4 border-blue-600 p-3 sm:p-4 my-4 sm:my-6 rounded-r-lg">
                  <div className="font-bold text-blue-900 mb-2 text-sm sm:text-base">📚 Vocabulaire</div>
                  <div className="space-y-2">
                    {Object.entries(currentPageData.vocabulary).map(([term, definition]) => (
                      <div key={term} className="break-words">
                        <span className="font-semibold text-blue-900 text-sm sm:text-base">{term}:</span>{' '}
                        <span className="text-blue-800 font-serif text-xs sm:text-sm md:text-base">{definition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Page Indicator */}
              <div className="text-center mt-4 sm:mt-6 md:mt-8 text-amber-700 font-serif text-sm sm:text-base">
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
          <div className="flex justify-between items-center mt-4 sm:mt-6 md:mt-8 gap-2">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 0}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Précédent</span>
              <span className="sm:hidden">Préc.</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all text-sm sm:text-base"
            >
              <span>{isLastPage ? 'Quiz' : 'Suivant'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 border border-blue-500/20">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 md:mb-8 text-center">Quiz de révision</h2>
          
          <div className="space-y-4 sm:space-y-6">
            {lesson.quiz.questions.map((question) => {
              const userAnswer = quizAnswers[question.id];
              const isCorrect = userAnswer === question.correct;
              
              return (
                <div
                  key={question.id}
                  className="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10"
                >
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-3 sm:mb-4 break-words">{question.question}</h3>
                  <div className="space-y-2">
                    {question.options.map((option, index) => {
                      const isSelected = userAnswer === index;
                      const showCorrect = quizCompleted && index === question.correct;
                      
                      return (
                        <button
                          key={index}
                          onClick={() => !quizCompleted && handleQuizAnswer(question.id, index)}
                          disabled={quizCompleted}
                          className={`w-full text-left p-3 sm:p-4 rounded-lg border-2 transition-all ${
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
                            <span className="text-white text-sm sm:text-base break-words">{option}</span>
                            {showCorrect && <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
            <button
              onClick={handlePrevious}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all text-sm sm:text-base w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour</span>
            </button>

            {!quizCompleted ? (
              <button
                onClick={handleCompleteQuiz}
                disabled={!lesson.quiz.questions.every(q => quizAnswers[q.id] !== undefined)}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold text-sm sm:text-base w-full sm:w-auto"
              >
                Soumettre les réponses
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all font-semibold flex items-center justify-center space-x-2 text-sm sm:text-base w-full sm:w-auto"
              >
                <span>Terminer le chapitre</span>
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryLesson;

