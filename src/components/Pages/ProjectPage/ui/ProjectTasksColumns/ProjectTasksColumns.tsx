import './style.css'

import { useState } from 'react'

import type { TaskStatus } from '../../../../shared/type/ProjectState'

import useProjectsState from '../../../../shared/state/useProjectsState'

import ProjectTaskColumnsItem from './ui/ProjectTaskColumnsItem/ProjectTaskColumnsItem'
import DeleteModal from '../../../../shared/ui/DeleteModal/DeleteModal'
import EditTaskModal from './ui/EditTaskModal/EditTaskModal'
import useTaskDrag from './hook/useTaskDrag'

// 3 columns of tasks
const COLUMNS: { status: TaskStatus, title: string, className: string }[] = [
    { status: 'to-do', title: 'To Do', className: 'project-tasks-to-do' },
    { status: 'in-progress', title: 'In Progress', className: 'project-tasks-in-progress' },
    { status: 'done', title: 'Done', className: 'project-tasks-done' },
]

function ProjectTasksColumns() {
    // Selected project task list
    const selectedProject = useProjectsState(state => state.projects.find(el => el.projectId === state.selectedProject.projectId))
    const tasksList = selectedProject?.projectTasks

    // State modals
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)
    const [updateModalProps, setUpdateModalProps] = useState({ projectId: '', taskId: '' })
    const [deleteModalProps, setDeleteModalProps] = useState({ projectId: '', taskId: '' })

    // Logic delete and update tasks
    const deleteTask = useProjectsState(state => state.deleteTask)
    const updateTask = useProjectsState(state => state.updateTask)

    // Drag and Drop
    const { draggedTaskId, overStatus, startDrag } = useTaskDrag((taskId: string, status: TaskStatus) => {
        if (!selectedProject || !tasksList) {
            return
        }

        const task = tasksList.flatMap(group => group.tasks).find(t => t.taskId === taskId)
        if (!task) {
            return
        }

        updateTask(selectedProject.projectId, taskId, task, status)
    })

    return (
        <>
            {/* 3 columns of tasks */}
            <div className="project-tasks">
                {COLUMNS.map(({ status, title, className }) => {
                    const tasks = tasksList?.find(group => group.status === status)?.tasks

                    return (
                        <div
                            key={status}
                            data-status={status}
                            className={`project-tasks-column ${className} ${overStatus === status ? 'project-tasks-column--over' : ''}`}>

                            <div className="project-tasks-column-title">
                                <h2>{title}</h2>
                                <div className="project-tasks-column-title-count"><p>{tasks?.length}</p></div>
                            </div>

                            <div className="project-tasks-column-line" />

                            <div className="project-tasks-column-tasks">
                                {tasks?.map(task => (
                                    <ProjectTaskColumnsItem
                                        key={task.taskId}
                                        projectId={selectedProject!.projectId}
                                        taskId={task.taskId}
                                        title={task.title}
                                        description={task.description}
                                        priority={task.priority}
                                        isDragging={draggedTaskId === task.taskId}
                                        onDragStart={startDrag}
                                        deleteButton={(projectId, taskId) => {
                                            setDeleteModalProps({ projectId, taskId })
                                            setIsOpenDeleteModal(true)
                                        }}
                                        updateButton={(projectId, taskId) => {
                                            setUpdateModalProps({ projectId, taskId })
                                            setIsOpenUpdateModal(true)
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Modals */}
            <DeleteModal
                title='Delete task?'
                buttonText='Delete'
                isOpen={isOpenDeleteModal}
                closeModal={() => setIsOpenDeleteModal(false)}
                deleteFunction={() => deleteTask(deleteModalProps.projectId, deleteModalProps.taskId)}
            />
            <EditTaskModal
                isOpen={isOpenUpdateModal}
                closeModal={() => setIsOpenUpdateModal(false)}
                projectId={updateModalProps.projectId}
                taskId={updateModalProps.taskId}
            />
        </>
    )
}

export default ProjectTasksColumns