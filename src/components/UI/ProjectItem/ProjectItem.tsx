import './style.css'

import Arrow from '../../../media/img/chevron-right.png'
import Trash from '../../../media/img/trash.png'

import type { Props } from '../../type/ProjectItem'

function ProjectItem({ id, name, description, openProject, deleteProject }: Props) {
    return (
        <div className="projects-list-item">
            <div className="projects-list-item-texts">
                <h1>{name}</h1>
                <p>{description}</p>
            </div>

            <div className="projects-list-item-buttons">
                <button onClick={() => deleteProject(id)}><img src={Trash}></img></button>
                {/* Modal is delete project? */}
                <button onClick={() => openProject(id)}><img src={Arrow}></img></button>
            </div>
        </div>
    )
}

export default ProjectItem