import { useState, useRef, useEffect } from 'react'

import './style.css'

import X from '../../../media/img/x.svg'

import type { Props } from '../../type/CreateTaskModal'
import type { TaskPriority } from '../../type/ProjectState'
import useProjectsState from '../../state/useProjectsState'

function CreateTaskModal({ isOpen, closeModal, createTask }: Props) {
    const inputTitle = useRef<HTMLInputElement>(null)
    const inputDescription = useRef<HTMLInputElement>(null)
    const [selectPriority, setSelectPriority] = useState<TaskPriority>('low')

    const toggleMessageError = useProjectsState(state => state.toggleMessageError)

    useEffect(() => {
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth

        if (isOpen) {
            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = `${scrollBarWidth}px`
        } else {
            document.body.style.overflow = 'auto'
            document.body.style.paddingRight = '0px'
        }

        return () => {
            document.body.style.overflow = 'auto'
            document.body.style.paddingRight = '0px'
        }
    }, [isOpen])

    function createTaskButton(inputTitle: undefined | string, inputDescription: undefined | string, inputPriority: undefined | TaskPriority) {
        if (!inputTitle || !inputDescription) {
            toggleMessageError('Write title and description')
            return false
        }
        if (inputTitle.length >= 240 || inputDescription.length >= 240) {
            toggleMessageError('Text must not exceed 240 characters')
            return false
        }
        if (inputPriority !== 'low' && inputPriority !== 'medium' && inputPriority !== 'high') {
            toggleMessageError('Select task priority')
            return false
        }

        createTask({
            title: inputTitle,
            description: inputDescription,
            priority: inputPriority,
            type: 'to-do'
        })

        return true
    }

    return (
        <>
            <section style={{ display: isOpen ? 'flex' : 'none' }} className='create-task-modal'>
                <img src={X} alt="X" onClick={closeModal} />

                <h1>Create task</h1>

                <label htmlFor="create-task">
                    <input id='create-task' ref={inputTitle} type="text" placeholder='Write title' />
                    <input id='create-task' ref={inputDescription} type="text" placeholder='Write description' />
                    <h1>Task priority</h1>
                    <select value={selectPriority} onChange={(e) => setSelectPriority(e.target.value as TaskPriority)}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <button onClick={() => {
                        if (!createTaskButton(inputTitle.current?.value, inputDescription.current?.value, selectPriority)) {
                            return
                        }
                        inputTitle.current!.value = ''
                        inputDescription.current!.value = ''
                        closeModal()
                    }} id='create-task'>Create</button>
                </label>

            </section>

            <div onClick={closeModal} style={{ display: isOpen ? 'flex' : 'none' }} className="create-task-modal-overlay"></div>
        </>
    )
}

export default CreateTaskModal