import { useState } from 'react'

import './style.css'

import type { Props } from './type'

import Arrow from '../../../../../assets/img/chevron-right.svg'
import Trash from '../../../../../assets/img/trash.svg'

import DeleteModal from '../../../../shared/ui/DeleteModal/DeleteModal'

function ProjectListItem({ id, name, description, openProject, deleteProject }: Props) {
    // State Modal Delete
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

    return (
        <div className="projects-list-item">
            {/* Title, Description */}
            <div className="projects-list-item-texts">
                <h1>{name}</h1>
                <p>{description}</p>
            </div>

            {/* Delete-Open Project */}
            <div className="projects-list-item-buttons">
                <button onClick={() => setIsDeleteModalOpen(true)}>
                    <img draggable="false" src={Trash}></img>
                </button>
                <button onClick={() => openProject(id)}>
                    <img draggable="false" src={Arrow}></img>
                </button>
            </div>

            {/* Modals (Delete) */}
            <DeleteModal
                title='Delete project?'
                buttonText='Delete'
                isOpen={isDeleteModalOpen}
                closeModal={() => setIsDeleteModalOpen(false)}
                deleteFunction={() => deleteProject(id)}
            />
        </div>
    )
}

export default ProjectListItem