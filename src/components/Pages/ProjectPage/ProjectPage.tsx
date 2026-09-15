import './style.css'

import useProjectsState from '../../state/useProjectsState'

function ProjectPage() {
    const selectedProject = useProjectsState(state =>
        state.projects.find(el => el.projectId === state.selectedProject.projectId)
    )


    return (
        <section className="project">
            {selectedProject ? (
                <>
                    <div className="project-settings">
                        <h1>{selectedProject.projectName}</h1>
                        <p>{selectedProject.projectDescription}</p>
                        <button><img src="create task button" alt="create task" /></button>
                        <button><img src="settings button" alt="settings" /></button>
                    </div>

                    <div className="project-tasks">
                        <div className="project-tasks-to-do">

                        </div>

                        <div className="project-tasks-in-progress">

                        </div>

                        <div className="project-tasks-done">

                        </div>
                    </div>
                </>)
                : (
                    <h1>Select project</h1>)
            }
        </section>
    )
}

export default ProjectPage