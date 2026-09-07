import { useRef } from 'react'

import useProjectsState from '../../state/useProjectsState'

import type { Props } from '../../type/CreateProjectModal'

function CreateProjectModal({ isOpen }: Props) {
    function createProjectButton() {
        if (!inputName.current?.value || !inputDescription.current?.value) {
            return
        }

        createProject(inputName.current?.value, inputDescription.current?.value)
    }

    const createProject = useProjectsState(state => state.createProject)

    const inputName = useRef<HTMLInputElement>(null)
    const inputDescription = useRef<HTMLInputElement>(null)


    let display = 'none'

    if (isOpen) {
        display = 'block'
    }

    return (
        <section style={{ display: display }} className='create-project-modal'>
            <h1>Create project</h1>
            <label htmlFor="create-project">
                <input id='create-project' ref={inputName} type="text" placeholder='Write name' />
                <input id='create-project' ref={inputDescription} type="text" placeholder='Write description' />
                <button onClick={() => createProjectButton()} id='create-project'>Create</button>
            </label>
        </section>
    )
}

export default CreateProjectModal