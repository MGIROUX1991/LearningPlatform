import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { lessonService } from '../../services/adminService';
import { QUEBEC_CURRICULUM } from '../../data/quebecCurriculum';
import { Plus, Edit, Trash2, BookOpen, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';

const LessonManager = () => {
  const { isAdmin, loading: adminLoading } = useAdmin();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState('history');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);

  useEffect(() => {
    if (isAdmin && selectedSubject) {
      loadLessons();
    }
  }, [isAdmin, selectedSubject, selectedChapter]);

  const loadLessons = async () => {
    setLoading(true);
    try {
      const data = await lessonService.getLessons(selectedSubject, selectedChapter || null);
      setLessons(data);
    } catch (error) {
      console.error('Error loading lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (lessonId) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette leçon?')) return;

    try {
      await lessonService.deleteLesson(lessonId);
      loadLessons();
    } catch (error) {
      alert('Erreur lors de la suppression: ' + error.message);
    }
  };

  if (adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-md w-full bg-gradient-to-br from-red-900/40 to-orange-900/40 backdrop-blur-md rounded-2xl p-8 border border-red-500/20 shadow-2xl text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Accès refusé</h1>
          <p className="text-gray-300">Vous n'avez pas les permissions nécessaires.</p>
        </div>
      </div>
    );
  }

  const subjects = Object.values(QUEBEC_CURRICULUM.subjects).filter(s => 
    ['history', 'math', 'french', 'english', 'science'].includes(s.id)
  );

  const historyChapters = [
    { id: 'chapter1', name: 'Les Grands Explorateurs' },
    { id: 'chapter2', name: 'La Traversée' },
    { id: 'chapter3', name: 'Fondation de Québec' },
    { id: 'chapter4', name: 'La Vie Quotidienne' },
    { id: 'chapter5', name: 'Relations avec les Autochtones' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Link
            to="/admin"
            className="inline-flex items-center space-x-2 text-blue-300 hover:text-blue-200 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour au tableau de bord</span>
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Gestion des leçons</h1>
          <p className="text-gray-400">Créez et gérez le contenu des leçons</p>
        </div>
        <button
          onClick={() => {
            setEditingLesson(null);
            setShowForm(true);
          }}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all font-semibold"
        >
          <Plus className="w-5 h-5" />
          <span>Nouvelle leçon</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Matière</label>
            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setSelectedChapter('');
              }}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
          {selectedSubject === 'history' && (
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Chapitre</label>
              <select
                value={selectedChapter}
                onChange={(e) => setSelectedChapter(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="">Tous les chapitres</option>
                {historyChapters.map((chapter) => (
                  <option key={chapter.id} value={chapter.id}>
                    {chapter.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Lessons List */}
      {showForm ? (
        <LessonEditor
          lesson={editingLesson}
          subjectId={selectedSubject}
          chapterId={selectedChapter}
          onSave={() => {
            setShowForm(false);
            setEditingLesson(null);
            loadLessons();
          }}
          onCancel={() => {
            setShowForm(false);
            setEditingLesson(null);
          }}
        />
      ) : (
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20">
          {loading ? (
            <div className="text-center text-gray-400 py-8">Chargement...</div>
          ) : lessons.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">Aucune leçon trouvée</p>
              <button
                onClick={() => setShowForm(true)}
                className="text-blue-400 hover:text-blue-300"
              >
                Créer la première leçon
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{lesson.title}</h3>
                        <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                          Leçon {lesson.lesson_number}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">
                        {lesson.subject_id} • {lesson.chapter_id}
                      </p>
                      <p className="text-gray-300 line-clamp-2">{lesson.content.substring(0, 150)}...</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => {
                          setEditingLesson(lesson);
                          setShowForm(true);
                        }}
                        className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-all"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(lesson.id)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Lesson Editor Component
const LessonEditor = ({ lesson, subjectId, chapterId, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    subject_id: subjectId || 'history',
    chapter_id: chapterId || 'chapter1',
    lesson_number: lesson?.lesson_number || 1,
    title: lesson?.title || '',
    content: lesson?.content || '',
    fun_fact: lesson?.fun_fact || '',
    vocabulary: lesson?.vocabulary || {},
    quiz: lesson?.quiz || { questions: [] },
    xp_reward: lesson?.xp_reward || 100,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const historyChapters = [
    { id: 'chapter1', name: 'Les Grands Explorateurs' },
    { id: 'chapter2', name: 'La Traversée' },
    { id: 'chapter3', name: 'Fondation de Québec' },
    { id: 'chapter4', name: 'La Vie Quotidienne' },
    { id: 'chapter5', name: 'Relations avec les Autochtones' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (lesson) {
        await lessonService.updateLesson(lesson.id, formData);
      } else {
        await lessonService.createLesson(formData);
      }
      onSave();
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setSaving(false);
    }
  };

  const addVocabularyTerm = () => {
    const term = prompt('Terme:');
    const definition = prompt('Définition:');
    if (term && definition) {
      setFormData({
        ...formData,
        vocabulary: {
          ...formData.vocabulary,
          [term]: definition,
        },
      });
    }
  };

  const addQuizQuestion = () => {
    const question = prompt('Question:');
    if (question) {
      const options = [];
      for (let i = 0; i < 4; i++) {
        const option = prompt(`Option ${i + 1}:`);
        if (option) options.push(option);
      }
      const correct = parseInt(prompt('Index de la bonne réponse (0-3):')) || 0;

      setFormData({
        ...formData,
        quiz: {
          ...formData.quiz,
          questions: [
            ...(formData.quiz.questions || []),
            {
              id: Date.now(),
              question,
              options,
              correct,
            },
          ],
        },
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20">
      <h2 className="text-2xl font-bold text-white mb-6">
        {lesson ? 'Modifier la leçon' : 'Nouvelle leçon'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Matière</label>
            <select
              value={formData.subject_id}
              onChange={(e) => setFormData({ ...formData, subject_id: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
              required
            >
              <option value="history">Histoire</option>
              <option value="math">Mathématiques</option>
              <option value="french">Français</option>
              <option value="english">English</option>
              <option value="science">Sciences</option>
            </select>
          </div>

          {formData.subject_id === 'history' && (
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Chapitre</label>
              <select
                value={formData.chapter_id}
                onChange={(e) => setFormData({ ...formData, chapter_id: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              >
                {historyChapters.map((chapter) => (
                  <option key={chapter.id} value={chapter.id}>
                    {chapter.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Numéro de leçon</label>
            <input
              type="number"
              value={formData.lesson_number}
              onChange={(e) => setFormData({ ...formData, lesson_number: parseInt(e.target.value) })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
              required
              min="1"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">XP Récompense</label>
            <input
              type="number"
              value={formData.xp_reward}
              onChange={(e) => setFormData({ ...formData, xp_reward: parseInt(e.target.value) })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
              required
              min="0"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Titre</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
            required
            placeholder="Titre de la leçon"
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Contenu</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 min-h-[200px]"
            required
            placeholder="Contenu de la leçon..."
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-gray-300 text-sm font-medium">Fait amusant (optionnel)</label>
          </div>
          <textarea
            value={formData.fun_fact}
            onChange={(e) => setFormData({ ...formData, fun_fact: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 min-h-[80px]"
            placeholder="Fait amusant à afficher..."
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-gray-300 text-sm font-medium">Vocabulaire</label>
            <button
              type="button"
              onClick={addVocabularyTerm}
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              + Ajouter un terme
            </button>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10 min-h-[100px]">
            {Object.keys(formData.vocabulary || {}).length === 0 ? (
              <p className="text-gray-500 text-sm">Aucun terme de vocabulaire</p>
            ) : (
              <div className="space-y-2">
                {Object.entries(formData.vocabulary || {}).map(([term, definition]) => (
                  <div key={term} className="flex items-start justify-between">
                    <div>
                      <span className="text-white font-semibold">{term}:</span>
                      <span className="text-gray-300 ml-2">{definition}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newVocab = { ...formData.vocabulary };
                        delete newVocab[term];
                        setFormData({ ...formData, vocabulary: newVocab });
                      }}
                      className="text-red-400 hover:text-red-300"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-gray-300 text-sm font-medium">Quiz</label>
            <button
              type="button"
              onClick={addQuizQuestion}
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              + Ajouter une question
            </button>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10 space-y-4">
            {(!formData.quiz.questions || formData.quiz.questions.length === 0) ? (
              <p className="text-gray-500 text-sm">Aucune question de quiz</p>
            ) : (
              formData.quiz.questions.map((q, idx) => (
                <div key={q.id || idx} className="bg-white/5 rounded p-4">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-white font-semibold">Question {idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          quiz: {
                            ...formData.quiz,
                            questions: formData.quiz.questions.filter((_, i) => i !== idx),
                          },
                        });
                      }}
                      className="text-red-400 hover:text-red-300"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-gray-300 mb-2">{q.question}</p>
                  <div className="space-y-1">
                    {q.options?.map((opt, optIdx) => (
                      <div key={optIdx} className="text-sm">
                        <span className={optIdx === q.correct ? 'text-green-400' : 'text-gray-400'}>
                          {optIdx === q.correct ? '✓' : '○'} {opt}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-300 text-sm">
            {error}
          </div>
        )}

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
          >
            {saving ? 'Enregistrement...' : lesson ? 'Mettre à jour' : 'Créer la leçon'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default LessonManager;

