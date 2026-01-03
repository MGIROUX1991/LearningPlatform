import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { contextPageService } from '../../services/contextPageService';
import { Plus, Edit, Trash2, BookOpen, ArrowLeft, XCircle, Image as ImageIcon, Tag, Calendar, MapPin } from 'lucide-react';

const ContextPageManager = () => {
  const { isAdmin, loading: adminLoading } = useAdmin();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingPage, setEditingPage] = useState(null);

  const categories = ['person', 'place', 'event', 'battle', 'war', 'object', 'concept'];

  useEffect(() => {
    if (isAdmin) {
      loadPages();
    }
  }, [isAdmin, selectedCategory]);

  const loadPages = async () => {
    setLoading(true);
    try {
      const filters = selectedCategory ? { category: selectedCategory } : {};
      const data = await contextPageService.getAll(filters);
      setPages(data);
    } catch (error) {
      console.error('Error loading context pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (pageId) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette page de contexte?')) return;

    try {
      await contextPageService.delete(pageId);
      loadPages();
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
          <h1 className="text-4xl font-bold text-white mb-2">Gestion des pages de contexte</h1>
          <p className="text-gray-400">Créez et gérez les pages wiki (personnages, lieux, événements, etc.)</p>
        </div>
        <button
          onClick={() => {
            setEditingPage(null);
            setShowForm(true);
          }}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all font-semibold"
        >
          <Plus className="w-5 h-5" />
          <span>Nouvelle page</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20">
        <label className="block text-gray-300 text-sm font-medium mb-2">Catégorie</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-64 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
          style={{ color: '#ffffff' }}
        >
          <option value="" style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>Toutes les catégories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat} style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
              {cat === 'person' ? 'Personnage' : cat === 'place' ? 'Lieu' : cat === 'event' ? 'Événement' : cat === 'battle' ? 'Bataille' : cat === 'war' ? 'Guerre' : cat === 'object' ? 'Objet' : 'Concept'}
            </option>
          ))}
        </select>
      </div>

      {/* Pages List */}
      {showForm ? (
        <ContextPageEditor
          page={editingPage}
          onSave={() => {
            setShowForm(false);
            setEditingPage(null);
            loadPages();
          }}
          onCancel={() => {
            setShowForm(false);
            setEditingPage(null);
          }}
        />
      ) : (
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20">
          {loading ? (
            <div className="text-center text-gray-400 py-8">Chargement...</div>
          ) : pages.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">Aucune page de contexte trouvée</p>
              <button
                onClick={() => setShowForm(true)}
                className="text-blue-400 hover:text-blue-300"
              >
                Créer la première page
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {pages.map((page) => (
                <div
                  key={page.id}
                  className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{page.title}</h3>
                        <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                          {page.category}
                        </span>
                        {page.subject_id && (
                          <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                            {page.subject_id}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm mb-2">
                        Slug: <code className="text-blue-300">/{page.slug}</code>
                      </p>
                      {page.summary && (
                        <p className="text-gray-300 line-clamp-2">{page.summary}</p>
                      )}
                      <div className="flex items-center space-x-4 mt-3 text-sm text-gray-400">
                        {page.tags && page.tags.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <Tag className="w-4 h-4" />
                            <span>{page.tags.length} tags</span>
                          </div>
                        )}
                        {page.images && Array.isArray(page.images) && page.images.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <ImageIcon className="w-4 h-4" />
                            <span>{page.images.length} images</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Link
                        to={`/context/${page.slug}`}
                        target="_blank"
                        className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-all"
                        title="Voir la page"
                      >
                        <BookOpen className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => {
                          setEditingPage(page);
                          setShowForm(true);
                        }}
                        className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-all"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(page.id)}
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

// Context Page Editor Component
const ContextPageEditor = ({ page, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: page?.title || '',
    slug: page?.slug || '',
    category: page?.category || 'person',
    subject_id: page?.subject_id || 'history',
    content: page?.content || '',
    summary: page?.summary || '',
    images: page?.images || [],
    metadata: page?.metadata || {},
    tags: page?.tags || [],
    related_pages: page?.related_pages || [],
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageCaption, setNewImageCaption] = useState('');
  const [newTag, setNewTag] = useState('');

  const categories = ['person', 'place', 'event', 'battle', 'war', 'object', 'concept'];
  const subjects = ['history', 'math', 'french', 'english', 'science'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // Generate slug from title if not provided
      if (!formData.slug && formData.title) {
        formData.slug = formData.title
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
      }

      if (page) {
        await contextPageService.update(page.id, formData);
      } else {
        await contextPageService.create(formData);
      }
      onSave();
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setSaving(false);
    }
  };

  const addImage = () => {
    if (newImageUrl) {
      setFormData({
        ...formData,
        images: [
          ...formData.images,
          { url: newImageUrl, caption: newImageCaption || null },
        ],
      });
      setNewImageUrl('');
      setNewImageCaption('');
    }
  };

  const removeImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const addTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag],
      });
      setNewTag('');
    }
  };

  const removeTag = (tag) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20">
      <h2 className="text-2xl font-bold text-white mb-6">
        {page ? 'Modifier la page' : 'Nouvelle page de contexte'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Titre *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
              required
              placeholder="Ex: Jacques Cartier"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Slug *</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
              required
              placeholder="Ex: jacques-cartier (auto-généré si vide)"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Catégorie *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
              style={{ color: '#ffffff' }}
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
                  {cat === 'person' ? 'Personnage' : cat === 'place' ? 'Lieu' : cat === 'event' ? 'Événement' : cat === 'battle' ? 'Bataille' : cat === 'war' ? 'Guerre' : cat === 'object' ? 'Objet' : 'Concept'}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Matière</label>
            <select
              value={formData.subject_id}
              onChange={(e) => setFormData({ ...formData, subject_id: e.target.value || null })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
              style={{ color: '#ffffff' }}
            >
              <option value="" style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>Toutes</option>
              {subjects.map((subj) => (
                <option key={subj} value={subj} style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
                  {subj}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Résumé</label>
          <textarea
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 min-h-[80px]"
            placeholder="Courte description de la page..."
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Contenu *</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 min-h-[300px] font-mono text-sm"
            required
            placeholder="Contenu de la page (HTML ou texte)..."
          />
          <p className="text-gray-400 text-xs mt-2">Vous pouvez utiliser du HTML pour formater le contenu</p>
        </div>

        {/* Images */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Images</label>
          <div className="space-y-2 mb-4">
            {formData.images.map((img, idx) => (
              <div key={idx} className="flex items-center space-x-2 bg-white/5 rounded p-2">
                <img src={typeof img === 'string' ? img : img.url} alt="" className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <p className="text-white text-sm">{typeof img === 'string' ? img : img.url}</p>
                  {typeof img === 'object' && img.caption && (
                    <p className="text-gray-400 text-xs">{img.caption}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="text-red-400 hover:text-red-300"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
              placeholder="URL de l'image"
            />
            <input
              type="text"
              value={newImageCaption}
              onChange={(e) => setNewImageCaption(e.target.value)}
              className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
              placeholder="Légende (optionnel)"
            />
            <button
              type="button"
              onClick={addImage}
              className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg"
            >
              Ajouter
            </button>
          </div>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Date (métadonnées)</label>
            <input
              type="text"
              value={formData.metadata.date || ''}
              onChange={(e) => setFormData({ ...formData, metadata: { ...formData.metadata, date: e.target.value } })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
              placeholder="Ex: 1534-1542"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Lieu (métadonnées)</label>
            <input
              type="text"
              value={formData.metadata.location || ''}
              onChange={(e) => setFormData({ ...formData, metadata: { ...formData.metadata, location: e.target.value } })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
              placeholder="Ex: Nouvelle-France"
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Tags</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:text-red-300"
                >
                  <XCircle className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
              placeholder="Nouveau tag (Entrée pour ajouter)"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg"
            >
              Ajouter
            </button>
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
            {saving ? 'Enregistrement...' : page ? 'Mettre à jour' : 'Créer la page'}
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

export default ContextPageManager;

