import { useState, useRef, useEffect } from 'react'

import './style.css'

import type { Props } from './type'
import type { TaskPriority } from '../../../../../../shared/type/ProjectState'

import X from '../../../../../../../assets/img/x.svg'

import useProjectsState from '../../../../../../shared/state/useProjectsState'

function EditTaskModal({ projectId, taskId, isOpen, closeModal }: Props) {
    // current task
    const task = useProjectsState.getState().projects
        .find(project => project.projectId === projectId)
        ?.projectTasks
        .flatMap(group => group.tasks)
        .find(task => task.taskId === taskId)

    // Inputs
    const inputTitle = useRef<HTMLInputElement>(null)
    const inputDescription = useRef<HTMLInputElement>(null)
    const [selectPriority, setSelectPriority] = useState<TaskPriority>(
        task?.priority ?? 'low'
    )

    // Logic hide/show scroll bar, current value inputs and priority and state 
    useEffect(() => {
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth

        if (isOpen) {
            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = `${scrollBarWidth}px`
        } else {
            document.body.style.overflow = 'auto'
            document.body.style.paddingRight = '0px'
        }

        inputTitle.current && (inputTitle.current.value = task?.title ?? '')
        inputDescription.current && (inputDescription.current.value = task?.description ?? '')
        setSelectPriority(task?.priority ?? 'low')

        return () => {
            document.body.style.overflow = 'auto'
            document.body.style.paddingRight = '0px'
        }
    }, [isOpen])

    // Update task logic (update task, message error)
    const updateTask = useProjectsState(state => state.updateTask)
    const toggleMessageError = useProjectsState(state => state.toggleMessageError)
    function updateTaskButton(inputTitle: undefined | string, inputDescription: undefined | string, taskPriority: undefined | TaskPriority) {
        if (!inputTitle || !inputTitle.trim() || typeof inputDescription !== 'string') {
            toggleMessageError('Write task title')
            return false
        }
        if (inputTitle.length >= 128 || inputDescription.length >= 128) {
            toggleMessageError('Text must not exceed 128 characters')
            return false
        }
        if (taskPriority !== 'high' && taskPriority !== 'low' && taskPriority !== 'medium') {
            toggleMessageError('Task priority error')
            return false
        }

        updateTask(projectId, taskId, { taskId: taskId, title: inputTitle, description: inputDescription, priority: taskPriority }, null)
        return true
    }

    return (
        <>
            <section style={{ display: isOpen ? 'flex' : 'none' }} className='edit-task-modal modal'>
                {/* Close modal */}
                <img src={X} alt="X" onClick={closeModal} />

                <h1>Edit task</h1>

                {/* Form update task */}
                <div className='edit-task-modal-form'>
                    <input ref={inputTitle} type="text" placeholder='Write title' />
                    <input ref={inputDescription} type="text" placeholder='Write description (optional)' />
                    <select value={selectPriority} onChange={(e) => setSelectPriority(e.target.value as TaskPriority)}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>

                    <button
                        onClick={() => {
                            if (!updateTaskButton(inputTitle.current?.value, inputDescription.current?.value, selectPriority)) {
                                return
                            }

                            closeModal()
                        }}>
                        Update
                    </button>
                </div>
            </section>

            {/* Black background */}
            <div
                onClick={closeModal}
                style={{ display: isOpen ? 'flex' : 'none' }}
                className="edit-task-modal-overlay"
            />
        </>
    )
}

export default EditTaskModal