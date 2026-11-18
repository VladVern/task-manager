export type TaskPriority = 'low' | 'medium' | 'high'

export type TaskStatus = 'to-do' | 'in-progress' | 'done'

export type Task = {
    taskId: string,
    title: string,
    description: string,
    priority: TaskPriority
}

export type TaskGroup = {
    status: TaskStatus,
    tasks: Task[]
}

export type Project = {
    projectId: string,
    projectName: string,
    projectDescription: string,
    projectTasks: TaskGroup[]
}
export type SelectedProject = {
    projectId: null | string
}

export type Theme = 'light' | 'dark'

export type State = {
    selectedProject: SelectedProject,
    selectProject: (id: string) => void,
    
    projects: Project[],
    createProject: (name: string, description: string) => void,
    deleteProject: (id: string) => void,
    updateProject: (id: string, name: string, description: string) => void

    createTask: (projectId: string, task: Omit<Task, 'taskId'>) => void,
    deleteTask: (projectId: string, taskId: string) => void,
    updateTask: (projectId: string, taskId: string, task: Task, status: 'to-do' | 'in-progress' | 'done' | null) => void,

    errorMessage: {
        isActive: boolean,
        errorMessage: string,
        totalTimerId: null | ReturnType<typeof setTimeout> 
    },
    toggleMessageError: (message: string) => void,
    closeMessageError: () => void,

    theme: Theme,
    changeTheme: () => void
}   