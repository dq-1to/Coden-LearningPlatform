import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LearningView from './pages/LearningView';
import ProfilePage from './pages/ProfilePage'; // Changed from StatsPage
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

// ルーティング設定
function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            } />
            <Route path="/step/:stepId" element={
                <ProtectedRoute>
                    <LearningView />
                </ProtectedRoute>
            } />
            <Route path="/profile" element={ /* Changed from /stats */
                <ProtectedRoute>
                    <ProfilePage />
                </ProtectedRoute>
            } />
            {/* Backward compatibility or redirect if needed, but for now just replacing */}
        </Routes>
    );
}

export default App;
