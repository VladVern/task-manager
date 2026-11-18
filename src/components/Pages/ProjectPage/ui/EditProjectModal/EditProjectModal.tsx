import { useRef, useEffect } from 'react'

import './style.css'

import type { Props } from './type'

import X from '../../../../../assets/img/x.svg'

import useProjectsState from '../../../../shared/state/useProjectsState'

function EditProjectModal({ isOpen, closeModal, projectId }: Props) {
    // Current project
    const project = useProjectsState.getState().projects
        .find(project => project.projectId === projectId)

    // Inputs
    const inputName = useRef<HTMLInputElement>(null)
    const inputDescription = useRef<HTMLInputElement>(null)
    
    // Logic hide/show scroll bar, current value inputs
    useEffect(() => {
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth

        if (isOpen) {
            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = `${scrollBarWidth}px`
        } else {
            document.body.style.overflow = 'auto'
            document.body.style.paddingRight = '0px'
        }

        inputName.current && (inputName.current.value = project?.projectName ?? '')
        inputDescription.current && (inputDescription.current.value = project?.projectDescription ?? '')

        return () => {
            document.body.style.overflow = 'auto'
            document.body.style.paddingRight = '0px'
        }
    }, [isOpen])

    // Logic update project (Error message, inputs, update project)
    const updateProject = useProjectsState(state => state.updateProject)
    const toggleMessageError = useProjectsState(state => state.toggleMessageError)
    function updateProjectButton(inputName: undefined | string, inputDescription: undefined | string) {
        if (!inputName || !inputName.trim() || typeof inputDescription !== 'string') {
            toggleMessageError('Write project name')
            return false
        }
        if (inputName.length >= 128 || inputDescription.length >= 128) {
            toggleMessageError('Text must not exceed 128 characters')
            return false
        }

        updateProject(projectId, inputName, inputDescription)

        return true
    }

    return (
        <>
            <section style={{ display: isOpen ? 'flex' : 'none' }} className='edit-project-modal modal'>
                {/* Close modal */}
                <img src={X} alt="X" onClick={closeModal} />

                <h1>Edit project</h1>

                {/* Form to update project */}
                <div className='edit-project-modal-form'>
                    <input ref={inputName} type="text" placeholder='Write name' />
                    <input ref={inputDescription} type="text" placeholder='Write description (optional)' />

                    <button
                        onClick={() => {
                            if (!updateProjectButton(inputName.current?.value, inputDescription.current?.value)) {
                                return
                            }
                            inputName.current!.value = ''
                            inputDescription.current!.value = ''
                            closeModal()
                        }}>
                        Update
                    </button>
                </div>
            </section>

            {/* Background color */}
            <div
                onClick={closeModal}
                style={{ display: isOpen ? 'flex' : 'none' }}
                className="edit-project-modal-overlay"
            />
        </>
    )
}

export default EditProjectModal