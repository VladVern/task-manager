import { useRef, useEffect } from 'react'

import './style.css'

import type { Props } from './type'

import X from '../../../../../assets/img/x.svg'

import useProjectsState from '../../../../shared/state/useProjectsState'

function CreateProjectModal({ isOpen, closeModal }: Props) {
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

    // Logic create project (error message, inputs, create)
    const createProject = useProjectsState(state => state.createProject)
    const inputName = useRef<HTMLInputElement>(null)
    const inputDescription = useRef<HTMLInputElement>(null)
    const toggleMessageError = useProjectsState(state => state.toggleMessageError)
    function createProjectButton(inputName: undefined | string, inputDescription: undefined | string) {
        if (!inputName || !inputName.trim() || typeof inputDescription !== 'string') {
            toggleMessageError('Write project name')
            return false
        }
        if (inputName.length >= 128 || inputDescription.length >= 128) {
            toggleMessageError('Text must not exceed 128 characters')
            return false
        }

        createProject(inputName, inputDescription)
        return true
    }

    return (
        <>
            <section style={{ display: isOpen ? 'flex' : 'none' }} className='create-project-modal modal'>
                {/* Close */}
                <img src={X} alt="X" onClick={closeModal} />
                <h1>Create project</h1>

                {/* From to create project */}
                <div className='create-project-modal-form'>
                    <input ref={inputName} type="text" placeholder='Write name' />
                    <input ref={inputDescription} type="text" placeholder='Write description (optional)' />
                    <button
                        onClick={() => {
                            if (!createProjectButton(inputName.current?.value, inputDescription.current?.value)) {
                                return
                            }

                            inputName.current!.value = ''
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
                className="create-project-modal-overlay"
            />
        </>
    )
}

export default CreateProjectModal