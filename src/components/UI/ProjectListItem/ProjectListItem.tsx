import { useState } from 'react'

import './style.css'

import Arrow from '../../../media/img/chevron-right.svg'
import Trash from '../../../media/img/trash.svg'

import type { Props } from '../../type/ProjectItem'
import DeleteModal from '../DeleteModal/DeleteModal'

function ProjectListItem({ id, name, description, openProject, deleteProject }: Props) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    
    return (
        <div className="projects-list-item">
            <div className="projects-list-item-texts">
                <h1>{name}</h1>
                <p>{description}</p>
            </div>

            <div className="projects-list-item-buttons">
                <button onClick={() => setIsModalOpen(true)}><img src={Trash}></img></button>
                <button onClick={() => openProject(id)}><img src={Arrow}></img></button>
            </div>
            
            <DeleteModal title='project' isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} deleteFunction={() => deleteProject(id)}></DeleteModal>
        </div>
    )
}

export default ProjectListItem