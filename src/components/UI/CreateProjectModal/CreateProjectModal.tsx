import { useRef, useEffect } from 'react'

import './style.css'

import X from '../../../media/img/x.png'

import useProjectsState from '../../state/useProjectsState'

import type { Props } from '../../type/CreateProjectModal'

function CreateProjectModal({ isOpen, closeModal }: Props) {
    const createProject = useProjectsState(state => state.createProject)

    const inputName = useRef<HTMLInputElement>(null)
    const inputDescription = useRef<HTMLInputElement>(null)

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

    function createProjectButton(inputName: undefined | string, inputDescription: undefined | string) {
        if (!inputName || !inputDescription) {
            return
            // Thow error message
        }

        createProject(inputName, inputDescription)
    }

    return (
        <>
            <section style={{ display: isOpen ? 'flex' : 'none' }} className='create-project-modal'>
                <img src={X} alt="X" onClick={closeModal} />

                <h1>Create project</h1>

                <label htmlFor="create-project">
                    <input id='create-project' ref={inputName} type="text" placeholder='Write name' />
                    <input id='create-project' ref={inputDescription} type="text" placeholder='Write description' />
                    <button onClick={() => {
                        createProjectButton(inputName.current?.value, inputDescription.current?.value)
                        inputName.current!.value = ''
                        inputDescription.current!.value = ''
                        closeModal()
                    }} id='create-project'>Create</button>
                </label>

            </section>

            <div onClick={closeModal} style={{ display: isOpen ? 'flex' : 'none' }} className="create-project-modal-overlay"></div>
        </>
    )
}

export default CreateProjectModal