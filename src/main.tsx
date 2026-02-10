import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { StatsProvider } from './context/StatsContext'
import { AchievementProvider } from './context/AchievementContext'
import { PtProvider } from './context/PtContext'
import { MascotProvider } from './context/MascotContext'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <StatsProvider>
                <AchievementProvider>
                    <PtProvider>
                        <MascotProvider>
                            <App />
                        </MascotProvider>
                    </PtProvider>
                </AchievementProvider>
            </StatsProvider>
        </BrowserRouter>
    </StrictMode>,
)
