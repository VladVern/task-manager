import { useState } from 'react'

import './style.css'

import useProjectsState from '../../state/useProjectsState'
import ProjectItem from '../../UI/ProjectItem/ProjectItem'
import CreateProjectModal from '../../UI/CreateProjectModal/CreateProjectModal'

function ProjectsPage() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    
    const projects = useProjectsState(state => state.projects)

    
    const deleteProject = useProjectsState(state => state.deleteProject)

    return (
        <section className="projects">
            <div className="projects-create">
                <h1 className="projects-create-title">My projects</h1>
                <button onClick={() => setIsModalOpen(state => !state)} className="projects-create-button">+ New project</button>
                {/* Modal window */}
            </div>

            <div className="projects-list">
                {
                    projects.length ? (
                        projects.map((el, index) => (
                            <ProjectItem
                                key={index}
                                id={el.projectId}
                                name={el.projectName}
                                description={el.projectDescription}
                                deleteProject={(id) => deleteProject(id)}
                                // openProject={}
                            />
                        ))
                    ) : (
                        <h1 className='projects-list-empty'>There are no projects</h1>
                    )
                }
            </div>

            <CreateProjectModal isOpen={isModalOpen}></CreateProjectModal>
        </section>
    )
}

export default ProjectsPage