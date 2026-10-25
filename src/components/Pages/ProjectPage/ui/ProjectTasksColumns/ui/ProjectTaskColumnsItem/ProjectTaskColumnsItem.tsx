import './style.css'

import type { Props } from './type'

function ProjectTaskColumnsItem({title, description, priority, drag}: Props) {
    // Add delete update
    
    return (
        <div onDragStart={() => drag()} className="task" draggable>
            <h1>{title}</h1>
            <p>{description}</p>
            <span>{priority}</span>
        </div>
    )
}

export default ProjectTaskColumnsItem