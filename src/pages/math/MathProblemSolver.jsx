import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, ArrowRight, Lightbulb, CheckCircle, XCircle, Target } from 'lucide-react';

const MathProblemSolver = () => {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const { addXP, updateStreak, unlockSkill, completeQuest, progress } = useApp();
  const [currentProblem, setCurrentProblem] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [score, setScore] = useState(0);
  const [problemsCompleted, setProblemsCompleted] = useState(
    progress.math?.practiceProblems?.[skillId] || []
  );

  // Sample problems - in a real app, this would come from a database
  const problemsBySkill = {
    'algebra-basics': [
      {
        id: 1,
        question: 'Résolvez: 3x + 7 = 22',
        answer: '5',
        hint: 'Soustrayez 7 des deux côtés, puis divisez par 3',
        solution: '3x + 7 = 22\n3x = 22 - 7\n3x = 15\nx = 15 / 3\nx = 5',
        xp: 25,
      },
      {
        id: 2,
        question: 'Simplifiez: 2(3x - 4) + 5x',
        answer: '11x - 8',
        hint: 'Distribuez le 2, puis combinez les termes similaires',
        solution: '2(3x - 4) + 5x\n= 6x - 8 + 5x\n= 11x - 8',
        xp: 30,
      },
      {
        id: 3,
        question: 'Résolvez: 5x - 3 = 2x + 9',
        answer: '4',
        hint: 'Rassemblez les termes avec x d\'un côté et les constantes de l\'autre',
        solution: '5x - 3 = 2x + 9\n5x - 2x = 9 + 3\n3x = 12\nx = 4',
        xp: 30,
      },
    ],
    'quadratic-functions': [
      {
        id: 1,
        question: 'Trouvez les racines de: x² - 5x + 6 = 0',
        answer: '2, 3',
        hint: 'Factorisez ou utilisez la formule quadratique',
        solution: 'x² - 5x + 6 = 0\n(x - 2)(x - 3) = 0\nx = 2 ou x = 3',
        xp: 40,
      },
    ],
  };

  const problems = problemsBySkill[skillId] || problemsBySkill['algebra-basics'];
  const problem = problems[currentProblem];
  const isLastProblem = currentProblem === problems.length - 1;
  const allCompleted = problemsCompleted.length === problems.length;

  const handleSubmit = () => {
    const isCorrect = userAnswer.trim().toLowerCase() === problem.answer.toLowerCase();
    
    if (isCorrect) {
      if (!problemsCompleted.includes(problem.id)) {
        setProblemsCompleted([...problemsCompleted, problem.id]);
        const xpEarned = hintUsed ? problem.xp - 10 : problem.xp;
        addXP(xpEarned);
        setScore(score + 1);
        updateStreak();
        completeQuest(1);
      }
    }
    
    setShowSolution(true);
  };

  const handleNext = () => {
    if (isLastProblem && allCompleted) {
      // Unlock next skill or complete
      const skillTree = ['algebra-basics', 'quadratic-functions', 'trigonometry', 'exponentials'];
      const currentIndex = skillTree.indexOf(skillId);
      if (currentIndex < skillTree.length - 1) {
        unlockSkill('math', skillTree[currentIndex + 1]);
      }
      navigate('/math/skills');
    } else if (!isLastProblem) {
      setCurrentProblem(currentProblem + 1);
      setUserAnswer('');
      setShowHint(false);
      setHintUsed(false);
      setShowSolution(false);
    }
  };

  const handleUseHint = () => {
    if (!hintUsed) {
      setShowHint(true);
      setHintUsed(true);
      addXP(-10); // Cost of hint
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/math/skills"
        className="inline-flex items-center space-x-2 text-blue-300 hover:text-blue-200 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Retour aux compétences</span>
      </Link>

      {/* Progress Bar */}
      <div className="bg-white/10 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white font-semibold">
            Problème {currentProblem + 1} sur {problems.length}
          </span>
          <span className="text-blue-300 font-semibold">
            Score: {score} / {problems.length}
          </span>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500"
            style={{ width: `${((currentProblem + 1) / problems.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Problem Card */}
      <div className="chalkboard-bg rounded-2xl p-8 border-4 border-amber-800 shadow-2xl mb-6">
        <div className="bg-white/5 rounded-lg p-6 border-2 border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6 font-mono">
            {problem.question}
          </h2>

          {/* Answer Input */}
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Votre réponse:</label>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !showSolution && handleSubmit()}
              disabled={showSolution}
              className="w-full bg-white/10 border-2 border-white/20 rounded-lg px-4 py-3 text-white text-lg font-mono focus:outline-none focus:border-blue-400 disabled:opacity-50"
              placeholder="Entrez votre réponse..."
            />
          </div>

          {/* Hint Section */}
          {showHint && (
            <div className="bg-yellow-500/20 border-l-4 border-yellow-400 p-4 rounded-lg mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-300 font-semibold">Indice</span>
              </div>
              <p className="text-yellow-200">{problem.hint}</p>
            </div>
          )}

          {/* Solution Section */}
          {showSolution && (
            <div
              className={`border-l-4 p-4 rounded-lg mb-6 ${
                userAnswer.trim().toLowerCase() === problem.answer.toLowerCase()
                  ? 'bg-green-500/20 border-green-400'
                  : 'bg-red-500/20 border-red-400'
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                {userAnswer.trim().toLowerCase() === problem.answer.toLowerCase() ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-green-300 font-semibold">Correct!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-400" />
                    <span className="text-red-300 font-semibold">Incorrect</span>
                  </>
                )}
              </div>
              <div className="text-white font-mono text-sm whitespace-pre-line">
                {problem.solution}
              </div>
              <div className="mt-2 text-gray-300 text-sm">
                Réponse correcte: <span className="font-semibold text-white">{problem.answer}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleUseHint}
              disabled={hintUsed || showSolution}
              className="flex items-center space-x-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-yellow-500/30"
            >
              <Lightbulb className="w-4 h-4" />
              <span>{hintUsed ? 'Indice utilisé (-10 XP)' : 'Utiliser un indice (-10 XP)'}</span>
            </button>

            {!showSolution ? (
              <button
                onClick={handleSubmit}
                disabled={!userAnswer.trim()}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
              >
                Soumettre
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all font-semibold flex items-center space-x-2"
              >
                <span>{isLastProblem && allCompleted ? 'Terminer' : 'Problème suivant'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Scratch Work Area */}
      <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700">
        <h3 className="text-white font-semibold mb-4">Zone de travail (brouillon)</h3>
        <div className="bg-white rounded p-4 min-h-[200px] font-mono text-sm text-gray-800">
          <div className="grid grid-cols-4 gap-1 opacity-20">
            {Array.from({ length: 200 }).map((_, i) => (
              <div key={i} className="border border-gray-300 h-4"></div>
            ))}
          </div>
          <div className="mt-4 text-gray-600">
            Utilisez cet espace pour vos calculs et notes...
          </div>
        </div>
      </div>

      {/* Completion Message */}
      {allCompleted && isLastProblem && (
        <div className="mt-6 bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-md rounded-2xl p-6 border-2 border-green-500/50">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="w-6 h-6 text-green-400" />
            <h3 className="text-2xl font-bold text-white">Félicitations!</h3>
          </div>
          <p className="text-gray-300 mb-4">
            Vous avez complété tous les problèmes de cette compétence. Vous pouvez maintenant
            passer à la compétence suivante!
          </p>
        </div>
      )}
    </div>
  );
};

export default MathProblemSolver;

