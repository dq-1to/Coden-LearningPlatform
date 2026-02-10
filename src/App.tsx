import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LearningView from './pages/LearningView';
import StatsPage from './pages/StatsPage';
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
            <Route path="/stats" element={
                <ProtectedRoute>
                    <StatsPage />
                </ProtectedRoute>
            } />
        </Routes>
    );
}

export default App;
