import { useState } from 'react'

import './style.css'

import type { Task } from '../../type/ProjectState'

import useProjectsState from '../../state/useProjectsState'
import CreateTaskModal from '../../UI/CreateTaskModal/CreateTaskModal'

function ProjectPage() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const [board, setBoard] = useState<object>([
        {},
        {},
        {}
    ])
    
    const selectedProject = useProjectsState(state =>
        state.projects.find(el => el.projectId === state.selectedProject.projectId)
    )
    const tasksList = useProjectsState(state =>
        state.projects.find(el => el.projectId === state.selectedProject.projectId)?.projectTasks
    )
    const createTask = useProjectsState(state => state.createTask)

    function createTaskFunction(task: Omit<Task, 'taskId'>): void {
        if (selectedProject?.projectId) {
            createTask(selectedProject?.projectId, task)
        }
    }


    return (
        <section className="project">
            {selectedProject ? (
                <>
                    <div className="project-settings">
                        <h1>{selectedProject.projectName}</h1>
                        <p>{selectedProject.projectDescription}</p>
                        <button onClick={() => setIsModalOpen(true)}><img src="create task button" alt="create task" /></button>
                        <button><img src="settings button" alt="settings" /></button>
                    </div>

                    <div className="project-tasks">
                        <div className="project-tasks-to-do">
                            {tasksList?.map(el => {
                                return <div key={el.taskId}><h1>{el.title}</h1><h1>{el.description}</h1><h1>{el.type}</h1><h1>{el.priority}</h1></div>
                            })}
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

            <CreateTaskModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} createTask={task => createTaskFunction(task)}></CreateTaskModal>
        </section>
    )
}

export default ProjectPage