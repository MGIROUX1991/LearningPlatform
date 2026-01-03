import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { contextPageService } from '../services/contextPageService';
import { ArrowLeft, Image as ImageIcon, ExternalLink, Calendar, MapPin, Tag } from 'lucide-react';

const ContextPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(null);
  const [relatedPages, setRelatedPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPage();
  }, [slug]);

  const loadPage = async () => {
    setLoading(true);
    setError(null);
    try {
      const pageData = await contextPageService.getBySlug(slug);
      if (!pageData) {
        setError('Page non trouvée');
        setLoading(false);
        return;
      }

      setPage(pageData);

      // Load related pages
      if (pageData.related_pages && pageData.related_pages.length > 0) {
        const related = await contextPageService.getRelated(pageData.id);
        setRelatedPages(related);
      }
    } catch (err) {
      console.error('Error loading context page:', err);
      setError('Erreur lors du chargement de la page');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryLabel = (category) => {
    const labels = {
      person: 'Personnage historique',
      place: 'Lieu',
      event: 'Événement',
      battle: 'Bataille',
      war: 'Guerre',
      object: 'Objet',
      concept: 'Concept',
    };
    return labels[category] || category;
  };

  const getCategoryColor = (category) => {
    const colors = {
      person: 'from-blue-500 to-cyan-500',
      place: 'from-green-500 to-emerald-500',
      event: 'from-purple-500 to-pink-500',
      battle: 'from-red-500 to-orange-500',
      war: 'from-red-600 to-red-800',
      object: 'from-amber-500 to-orange-500',
      concept: 'from-indigo-500 to-purple-500',
    };
    return colors[category] || 'from-gray-500 to-slate-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-md w-full bg-gradient-to-br from-red-900/40 to-orange-900/40 backdrop-blur-md rounded-2xl p-8 border border-red-500/20 shadow-2xl text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Page non trouvée</h1>
          <p className="text-gray-300 mb-6">{error || 'Cette page de contexte n\'existe pas.'}</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </button>
        </div>
      </div>
    );
  }

  const images = Array.isArray(page.images) ? page.images : [];
  const metadata = page.metadata || {};
  const tags = Array.isArray(page.tags) ? page.tags : [];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Back Button */}
      <Link
        to={-1}
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
        className="inline-flex items-center space-x-2 text-blue-300 hover:text-blue-200"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Retour</span>
      </Link>

      {/* Header */}
      <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-8 border border-blue-500/20">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${getCategoryColor(page.category)} text-white`}>
                {getCategoryLabel(page.category)}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">{page.title}</h1>
            {page.summary && (
              <p className="text-xl text-gray-300 leading-relaxed">{page.summary}</p>
            )}
          </div>
        </div>

        {/* Metadata */}
        {(metadata.date || metadata.location || tags.length > 0) && (
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
            {metadata.date && (
              <div className="flex items-center space-x-2 text-gray-300">
                <Calendar className="w-4 h-4" />
                <span>{metadata.date}</span>
              </div>
            )}
            {metadata.location && (
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>{metadata.location}</span>
              </div>
            )}
            {tags.length > 0 && (
              <div className="flex items-center space-x-2 flex-wrap">
                <Tag className="w-4 h-4 text-gray-400" />
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-white/10 rounded text-sm text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Images Gallery */}
      {images.length > 0 && (
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
            <ImageIcon className="w-6 h-6" />
            <span>Images</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {images.map((image, idx) => {
              const imageUrl = typeof image === 'string' ? image : image.url || image.src;
              const imageCaption = typeof image === 'object' ? image.caption || image.alt : null;
              return (
                <div key={idx} className="relative group">
                  <img
                    src={imageUrl}
                    alt={imageCaption || page.title}
                    className="w-full h-64 object-cover rounded-lg border border-white/10"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  {imageCaption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-2 rounded-b-lg">
                      <p className="text-white text-sm">{imageCaption}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-8 border border-blue-500/20">
        <div className="prose prose-invert max-w-none">
          <div
            className="text-gray-300 leading-relaxed whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </div>

      {/* Related Pages */}
      {relatedPages.length > 0 && (
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
            <ExternalLink className="w-6 h-6" />
            <span>Pages connexes</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedPages.map((related) => (
              <Link
                key={related.id}
                to={`/context/${related.slug}`}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 border border-white/10 hover:border-blue-500/50 transition-all"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold bg-gradient-to-r ${getCategoryColor(related.category)} text-white`}>
                    {getCategoryLabel(related.category)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{related.title}</h3>
                {related.summary && (
                  <p className="text-gray-400 text-sm line-clamp-2">{related.summary}</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContextPage;

