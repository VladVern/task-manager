import { useState, useRef, useEffect } from 'react'

import './style.css'

import type { Props } from './type'
import type { TaskPriority } from '../../../../shared/type/ProjectState'

import X from '../../../../../assets/img/x.svg'

import useProjectsState from '../../../../shared/state/useProjectsState'

function CreateTaskModal({ isOpen, closeModal, createTask }: Props) {
    // Logic hide/show scroll bar
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

    // Logic create button (error message, inputs, create)
    const inputTitle = useRef<HTMLInputElement>(null)
    const inputDescription = useRef<HTMLInputElement>(null)
    const [selectPriority, setSelectPriority] = useState<TaskPriority>('low')
    const toggleMessageError = useProjectsState(state => state.toggleMessageError)
    function createTaskButton(inputTitle: undefined | string, inputDescription: undefined | string, inputPriority: undefined | TaskPriority) {
        if (!inputTitle || !inputTitle.trim() || typeof inputDescription !== 'string') {
            toggleMessageError('Write task title')
            return false
        }
        if (inputTitle.length >= 128 || inputDescription.length >= 128) {
            toggleMessageError('Text must not exceed 128 characters')
            return false
        }
        if (inputPriority !== 'low' && inputPriority !== 'medium' && inputPriority !== 'high') {
            toggleMessageError('Task priority error')
            return false
        }

        createTask({
            title: inputTitle,
            description: inputDescription,
            priority: inputPriority
        })

        return true
    }

    return (
        <>
            <section style={{ display: isOpen ? 'flex' : 'none' }} className='create-task-modal modal'>
                {/* Close modal */}
                <img src={X} alt="X" onClick={closeModal} />

                <h1>Create task</h1>

                {/* Form to create task */}
                <div className='create-task-modal-form'>
                    <input ref={inputTitle} type="text" placeholder='Write title' />
                    <input ref={inputDescription} type="text" placeholder='Write description (optional)' />
                    <select value={selectPriority} onChange={(e) => setSelectPriority(e.target.value as TaskPriority)}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>

                    <button
                        onClick={() => {
                            if (!createTaskButton(inputTitle.current?.value, inputDescription.current?.value, selectPriority)) {
                                return
                            }
                            inputTitle.current!.value = ''
                            inputDescription.current!.value = ''
                            closeModal()
                        }}>
                        Create
                    </button>
                </div>

            </section>
            
            {/* Black background */}
            <div
                onClick={closeModal}
                style={{ display: isOpen ? 'flex' : 'none' }}
                className="create-task-modal-overlay"
            />
        </>
    )
}

export default CreateTaskModal