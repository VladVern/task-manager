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
    projectId: null | string
}

export type State = {
    selectedProject: SelectedProject,
    
    projects: Project[],

    selectProject: (id: string) => void,

    createProject: (name: string, description: string) => void,
    deleteProject: (id: string) => void,
    updateProject: (id: string, name: string, description: string) => void

    createTask: (id: string, task: Omit<Task, 'projectId'>) => void,
    deleteTask: (id: string, task: Pick<Task, 'taskId'>) => void,
    updateTask: (id: string, task: Task) => void
}   