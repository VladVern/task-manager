import { Routes, Route, Navigate} from 'react-router'

import './style.css'

import ProjectsPage from '../components/Pages/ProjectsPage/ProjectsPage'
import ProjectPage from '../components/Pages/ProjectPage/ProjectPage'

function App() {
    
    return (
        <>
            <section className='navigation'>
                {/* Logic navigation <- -> */}
                {/* Dark mode */}
            </section>

            <Routes>
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:projectId" element={<ProjectPage />} />
                <Route path="*" element={<Navigate to="/projects" />} />
            </Routes>
        </>
    )
}

export default App