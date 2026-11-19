import { Routes, Route, Navigate } from 'react-router'

import useProjectsState from '../components/shared/state/useProjectsState'

import CreateProjectsPage from '../components/Pages/CreateProjectsPage/CreateProjectsPage'
import ProjectPage from '../components/Pages/ProjectPage/ProjectPage'
import ErrorMessage from '../components/shared/ui/ErrorMessage/ErrorMessage'
import NavigationMenu from './ui/NavigationMenu/NavigationMenu'

function App() {
    // Error
    const errorMessage = useProjectsState(state => state.errorMessage.errorMessage)
    const errorMessageIsActive = useProjectsState(state => state.errorMessage.isActive)

    return (
        <>
            {/* Navigation menu + change theme */}
            <header className='navigation'>
                <NavigationMenu />
            </header>

            {/* Rouute Pages */}
            <main>
                <Routes>
                    <Route path="/projects" element={<CreateProjectsPage />} />
                    <Route path="/projects/:projectName" element={<ProjectPage />} />
                    <Route path="*" element={<Navigate to="/projects/" />} />
                </Routes>
            </main>

            {/* Error message */}
            <ErrorMessage title={errorMessage} isActive={errorMessageIsActive} />
        </>
    )
}

export default App