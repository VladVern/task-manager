type TaskPriority = 'low' | 'medium' | 'high'

type TaskType = 'to-do' | 'in-progress' | 'done'

type Task = {
    taskId: string,
    title: string,
    description: string,
    type: TaskType,
    priority: TaskPriority
}

type Project = {
    projectId: string,
    projectName: string,
    projectDescription: string,
    projectTasks: Task[]
}

type SelectedProject = {
    projectName: null | string,
    projectId: null | string
}

export type State = {
    selectedProject: SelectedProject,
    projects: Project[],
    createProject: (name: string, description: string) => void,
    deleteProject: (id: string) => void,
    selectProject: (id: string) => void
}   