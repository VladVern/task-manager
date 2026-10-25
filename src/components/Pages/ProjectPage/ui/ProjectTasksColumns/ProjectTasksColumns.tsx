import './style.css'

import { useState } from 'react'

import type { TaskStatus } from '../../../../shared/type/ProjectState'

import useProjectsState from '../../../../shared/state/useProjectsState'
import ProjectTaskColumnsItem from './ui/ProjectTaskColumnsItem/ProjectTaskColumnsItem'

function ProjectTasksColumns() {
    const selectedProject = useProjectsState(state => state.projects.find(el => el.projectId === state.selectedProject.projectId))
    const tasksList = useProjectsState(state => state.projects.find(el => el.projectId === state.selectedProject.projectId)?.projectTasks)

    const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null)
    const updateTask = useProjectsState(state => state.updateTask)
    function handleDragStart(taskId: string) {
        setDraggedTaskId(taskId)
    }
    function handleDragOver(e: React.DragEvent) {
        e.preventDefault()
    }
    function handleDrop(status: TaskStatus) {
        if (!draggedTaskId || !selectedProject || !tasksList) return

        const task = tasksList.flatMap(group => group.tasks).find(task => task.taskId === draggedTaskId)

        if (!task) return

        updateTask(selectedProject.projectId, draggedTaskId, task, status)

        setDraggedTaskId(null)
    }

    return (
        <div className="project-tasks">
            <div className="project-tasks-column project-tasks-to-do" onDragOver={handleDragOver} onDrop={() => handleDrop('to-do')}>
                <h2>To Do</h2>

                {tasksList?.find(group => group.status === 'to-do')?.tasks.map(task => (
                    <ProjectTaskColumnsItem title={task.title} description={task.description} priority={task.priority} drag={() => handleDragStart(task.taskId)} key={task.taskId}></ProjectTaskColumnsItem>
                ))}
            </div>

            <div className="project-tasks-column project-tasks-in-progress" onDragOver={handleDragOver} onDrop={() => handleDrop('in-progress')}>
                <h2>In Progress</h2>

                {tasksList?.find(group => group.status === 'in-progress')?.tasks.map(task => (
                    <ProjectTaskColumnsItem title={task.title} description={task.description} priority={task.priority} drag={() => handleDragStart(task.taskId)} key={task.taskId}></ProjectTaskColumnsItem>
                ))}
            </div>

            <div className="project-tasks-column project-tasks-done" onDragOver={handleDragOver} onDrop={() => handleDrop('done')}>
                <h2>Done</h2>

                {tasksList?.find(group => group.status === 'done')?.tasks.map(task => (
                    <ProjectTaskColumnsItem title={task.title} description={task.description} priority={task.priority} drag={() => handleDragStart(task.taskId)} key={task.taskId}></ProjectTaskColumnsItem>
                ))}
            </div>
        </div>
    )
}

export default ProjectTasksColumns