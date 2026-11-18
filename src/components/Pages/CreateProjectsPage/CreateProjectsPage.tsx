import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './style.css'

import useProjectsState from '../../shared/state/useProjectsState'

import ProjectListItem from './ui/ProjectListItem/ProjectListItem'
import CreateProjectModal from './ui/CreateProjectModal/CreateProjectModal'

function CreateProjectsPage() {
    // State Modal Create Project
    const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState<boolean>(false)

    // Logic navigation to Project page
    const selectProject = useProjectsState(state => state.selectProject)
    const navigate = useNavigate()
    function changePage(id: string) {
        selectProject(id)
        navigate(`/projects/${id}`)
    }

    // Project logic (show, delete)
    const projects = useProjectsState(state => state.projects)
    const deleteProject = useProjectsState(state => state.deleteProject)

    return (
        <section className="projects">
            {/* Create project */}
            <div className="projects-create">
                <div className="projects-create-title">
                    <h1 className="projects-create-title">My projects</h1>
                    <p>Manage your work</p>
                </div>
                
                <button onClick={() => setIsCreateProjectModalOpen(true)} className="projects-create-button">+ New project</button>
            </div>

            {/* List of projects */}
            <div className="projects-list">
                {
                    projects.length ? (
                        projects.map(el => (
                            <ProjectListItem
                                key={el.projectId}
                                id={el.projectId}
                                name={el.projectName}
                                description={el.projectDescription}
                                deleteProject={(id) => deleteProject(id)}
                                openProject={(id) => changePage(id)}
                            />
                        ))
                    ) : (
                        <h1 className='projects-list-empty'>There are no projects</h1>
                    )
                }
            </div>

            {/* Modals (CreateProject) */}
            <CreateProjectModal
                isOpen={isCreateProjectModalOpen}
                closeModal={() => setIsCreateProjectModalOpen(false)}
            />
        </section>
    )
}

export default CreateProjectsPage