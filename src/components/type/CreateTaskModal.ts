import type { Task } from '../type/ProjectState'

export type Props = {
    isOpen: boolean,
    closeModal: () => void,
    createTask: (task: Omit<Task, 'taskId'>) => void
}