import './style.css'

import type { Props } from './type'

import Trash from '../../../../../../../assets/img/trash.svg'
import Edit from '../../../../../../../assets/img/edit.svg'

function ProjectTaskColumnsItem({ projectId, taskId, title, description, priority, onDragStart, isDragging, deleteButton, updateButton }: Props) {
    return (
        <div onPointerDown={e => onDragStart(e, taskId)} className={`task ${isDragging ? 'task--dragging' : ''}`}>
            {/* Text of task */}
            <div className="task-text">
                <h1>{title}</h1>
                <p>{description}</p>
                <div className={`task-text-priority-${priority}`}>
                    <p>{priority}</p>
                </div>
            </div>

            {/* Update/Delete buttons */}
            <div className="task-settings">
                <button onClick={() => updateButton(projectId, taskId)}>
                    <img draggable='false' src={Edit} alt="Edit" />
                </button>
                <button onClick={() => deleteButton(projectId, taskId)}>
                    <img draggable='false' src={Trash} alt="Delete" />
                </button>
            </div>
        </div>
    )
}

export default ProjectTaskColumnsItem