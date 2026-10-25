import { useState } from 'react'

import './style.css'

import CreateTaskImg from '../../../assets/img/plus.svg'

import type { Task } from '../../shared/type/ProjectState'

import useProjectsState from '../../shared/state/useProjectsState'
import CreateTaskModal from './ui/CreateTaskModal/CreateTaskModal'
import ProjectTasksColumns from './ui/ProjectTasksColumns/ProjectTasksColumns'

function ProjectPage() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const selectedProject = useProjectsState(state => state.projects.find(el => el.projectId === state.selectedProject.projectId))
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
                        <button onClick={() => setIsModalOpen(true)}><h1>Create task</h1><img src={CreateTaskImg} /></button>
                        <button><img src="settings button" alt="settings" /></button>
                    </div>

                    <ProjectTasksColumns></ProjectTasksColumns>
                </>)
                : (
                    <h1>Select project</h1>)
            }

            <CreateTaskModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} createTask={task => createTaskFunction(task)}></CreateTaskModal>
        </section>
    )
}

export default ProjectPage