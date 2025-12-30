import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SupabaseProvider, useSupabase } from './context/SupabaseContext';
import { AppProvider } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import HistoryOverview from './pages/history/HistoryOverview';
import HistoryLesson from './pages/history/HistoryLesson';
import HistoryJournal from './pages/history/HistoryJournal';
import MathOverview from './pages/math/MathOverview';
import MathSkillTree from './pages/math/MathSkillTree';
import MathProblemSolver from './pages/math/MathProblemSolver';
import CurriculumOverview from './components/CurriculumOverview';
import Auth from './components/Auth';
import Landing from './pages/Landing';
import Layout from './components/Layout';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSupabase();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  return user ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <SupabaseProvider>
      <AppProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <Layout>
                    <HistoryOverview />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/history/lesson/:chapterId"
              element={
                <ProtectedRoute>
                  <Layout>
                    <HistoryLesson />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/history/journal"
              element={
                <ProtectedRoute>
                  <Layout>
                    <HistoryJournal />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/math"
              element={
                <ProtectedRoute>
                  <Layout>
                    <MathOverview />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/math/skills"
              element={
                <ProtectedRoute>
                  <Layout>
                    <MathSkillTree />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/math/practice/:skillId"
              element={
                <ProtectedRoute>
                  <Layout>
                    <MathProblemSolver />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/curriculum"
              element={
                <ProtectedRoute>
                  <Layout>
                    <CurriculumOverview />
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AppProvider>
    </SupabaseProvider>
  );
}

export default App;

