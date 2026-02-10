import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LearningView from './pages/LearningView';
import StatsPage from './pages/StatsPage';
import './App.css';

// ルーティング設定
function App() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/step/:stepId" element={<LearningView />} />
            <Route path="/stats" element={<StatsPage />} />
        </Routes>
    );
}

export default App;
