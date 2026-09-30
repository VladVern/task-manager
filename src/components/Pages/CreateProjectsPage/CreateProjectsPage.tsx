import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './style.css'

import useProjectsState from '../../state/useProjectsState'
import ProjectListItem from '../../UI/ProjectListItem/ProjectListItem'
import CreateProjectModal from '../../UI/CreateProjectModal/CreateProjectModal'

function CreateProjectsPage() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const navigate = useNavigate()

    const selectProject = useProjectsState(state => state.selectProject)
    const projects = useProjectsState(state => state.projects)
    const deleteProject = useProjectsState(state => state.deleteProject)

    function changePage(id: string) {
        selectProject(id)
        navigate(`/projects/${id}`)
    }

    return (
        <section className="projects">
            <div className="projects-create">
                <h1 className="projects-create-title">My projects</h1>
                <button onClick={() => setIsModalOpen(true)} className="projects-create-button">+ New project</button>
            </div>

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

            <CreateProjectModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}></CreateProjectModal>
        </section>
    )
}

export default CreateProjectsPage