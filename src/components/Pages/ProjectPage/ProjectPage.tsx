import { useState } from 'react'

import type { Task } from '../../shared/type/ProjectState'

import './style.css'

import Settings from '../../../assets/img/settings.svg'

import useProjectsState from '../../shared/state/useProjectsState'

import CreateTaskModal from './ui/CreateTaskModal/CreateTaskModal'
import ProjectTasksColumns from './ui/ProjectTasksColumns/ProjectTasksColumns'
import EditProjectModal from './ui/EditProjectModal/EditProjectModal'

function ProjectPage() {
    // State Modals (Create Task, Edit Project)
    const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState<boolean>(false)
    const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState<boolean>(false)

    // Selected Project
    const selectedProject = useProjectsState(state => state.projects.find(el => el.projectId === state.selectedProject.projectId))

    // Logic Create Task
    const createTask = useProjectsState(state => state.createTask)
    function createTaskButton(task: Omit<Task, 'taskId'>): void {
        if (selectedProject?.projectId) {
            createTask(selectedProject?.projectId, task)
        }
    }

    const deleteProject = useProjectsState(state => state.deleteProject)

    return (
        <section className="project">
            {/* <button onClick={() => deleteProject(selectedProject!.projectId)}>delete</button> */}
            {/* Logic if not selected project */}
            {
                selectedProject ? (
                    <>
                        <div className="project-settings">
                            <div className="project-settings-title">
                                <h1>{selectedProject.projectName}</h1>
                                <p>{selectedProject.projectDescription}</p>
                            </div>

                            <div className="project-settings-buttons">
                                <button onClick={() => setIsEditProjectModalOpen(true)} className="projects-settings-button-settings">
                                    <img draggable="false" src={Settings} alt="settings" />
                                </button>
                                <button onClick={() => setIsCreateTaskModalOpen(true)} className="projects-settings-button-create">+ Create task</button>
                            </div>
                        </div>

                        {/* 3 Columns of tasks */}
                        <ProjectTasksColumns />

                        {/* Modals (Create Task, Edit Project) */}
                        <CreateTaskModal
                            isOpen={isCreateTaskModalOpen}
                            closeModal={() => setIsCreateTaskModalOpen(false)}
                            createTask={task => createTaskButton(task)}
                        />
                        <EditProjectModal
                            isOpen={isEditProjectModalOpen}
                            closeModal={() => setIsEditProjectModalOpen(false)}
                            projectId={selectedProject!.projectId}
                        />
                    </>
                ) : (
                    <h1 className='projects-selected-empty'>Select project</h1>
                )
            }

        </section>
    )
}

export default ProjectPage