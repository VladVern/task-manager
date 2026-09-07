import { Routes, Route, Navigate} from 'react-router'

import './style.css'

import ProjectsPage from '../components/Pages/ProjectsPage/ProjectsPage'

function App() {
    return (
        <>
            <section className='navigation'>
                {/* Logic navigation <- -> */}
                {/* Dark mode */}
            </section>

            <Routes>
                <Route path="/projects" element={<ProjectsPage />} />
                {/* <Route path="/custom name" element={<Project />} /> */}
                <Route path="*" element={<Navigate to="/projects" />} />
            </Routes>
        </>
    )
}

export default App