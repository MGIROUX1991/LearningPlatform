import { useState } from 'react';
import { useSupabase } from '../context/SupabaseContext';
import ChangePassword from '../components/ChangePassword';
import AdminDebug from '../components/AdminDebug';
import { User, Lock, Mail } from 'lucide-react';

const Settings = () => {
  const { user, profile, updateProfile } = useSupabase();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [name, setName] = useState(profile?.name || '');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);

  const handleSaveName = async () => {
    if (!name.trim()) return;
    
    setSaving(true);
    setSaveMessage(null);
    
    try {
      await updateProfile({ name: name.trim() });
      setSaveMessage('Nom mis à jour avec succès!');
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      setSaveMessage('Erreur lors de la mise à jour');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Paramètres</h1>
        <p className="text-gray-400">Gérez votre compte et vos préférences</p>
      </div>

      {/* Profile Information */}
      <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20">
        <div className="flex items-center space-x-2 mb-6">
          <User className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl font-bold text-white">Informations du profil</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-400 cursor-not-allowed"
              />
            </div>
            <p className="text-gray-500 text-xs mt-1">L'email ne peut pas être modifié</p>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Nom
            </label>
            <div className="flex space-x-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                placeholder="Votre nom"
              />
              <button
                onClick={handleSaveName}
                disabled={saving || !name.trim() || name === profile?.name}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {saving ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
            {saveMessage && (
              <p className={`text-sm mt-2 ${saveMessage.includes('succès') ? 'text-green-400' : 'text-red-400'}`}>
                {saveMessage}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Password Section */}
      <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Lock className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Sécurité</h2>
          </div>
          {!showChangePassword && (
            <button
              onClick={() => setShowChangePassword(true)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-sm"
            >
              Changer le mot de passe
            </button>
          )}
        </div>

        {showChangePassword ? (
          <ChangePassword
            onSuccess={() => {
              setShowChangePassword(false);
            }}
            onCancel={() => setShowChangePassword(false)}
          />
        ) : (
          <div className="text-gray-400 text-sm">
            Cliquez sur "Changer le mot de passe" pour modifier votre mot de passe.
          </div>
        )}
      </div>

      {/* Admin Debug Section */}
      <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20">
        <h2 className="text-2xl font-bold text-white mb-4">Debug Admin Status</h2>
        <AdminDebug />
      </div>
    </div>
  );
};

export default Settings;

