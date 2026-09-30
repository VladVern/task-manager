import { Routes, Route, Navigate} from 'react-router'

import useProjectsState from '../components/state/useProjectsState'
import CreateProjectsPage from '../components/Pages/CreateProjectsPage/CreateProjectsPage'
import ProjectPage from '../components/Pages/ProjectPage/ProjectPage'
import ErrorMessage from '../components/UI/ErrorMessage/ErrorMessage'

function App() {
    const errorMessage = useProjectsState(state => state.errorMessage.errorMessage)
    const errorMessageIsActive = useProjectsState(state => state.errorMessage.isActive)

    return (
        <>
            <section className='navigation'>
                {/* Logic navigation <- -> */}
                {/* Dark mode */}
            </section>

            <Routes>
                <Route path="/projects" element={<CreateProjectsPage />} />
                <Route path="/projects/:projectId" element={<ProjectPage />} />
                <Route path="*" element={<Navigate to="/projects" />} />
            </Routes>

            <ErrorMessage title={errorMessage} isActive={errorMessageIsActive}></ErrorMessage>
        </>
    )
}

export default App