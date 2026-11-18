export type Props = {
    taskId: string,
    projectId: string,
    title: string,
    description: string,
    priority: string,
    isDragging: boolean,
    onDragStart: (e: React.PointerEvent<HTMLElement>, taskId: string) => void,
    deleteButton: (projectId: string, taskId: string) => void,
    updateButton: (projectId: string, taskId: string) => void
}