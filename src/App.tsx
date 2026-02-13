import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LearningView from './pages/LearningView';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

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
            <Route path="/profile" element={
                <ProtectedRoute>
                    <ProfilePage />
                </ProtectedRoute>
            } />
        </Routes>
    );
}

export default App;
