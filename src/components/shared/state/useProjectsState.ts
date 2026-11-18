import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { State } from '../type/ProjectState'

const useProjectsState = create<State>()(persist((set, get) => ({
    // Navigation (Selected project)
    selectedProject: {
        projectId: null
    },
    selectProject(id) {
        set(state => {
            const project = state.projects.find(project => project.projectId === id)

            return {
                selectedProject: {
                    projectId: project?.projectId ?? null
                }
            }
        })
    },

    // Project
    projects: [],
    createProject(name, description) {
        if (!name || !name.trim() || typeof description !== 'string' || name.length >= 128 || description.length >= 128) {
            return
        }

        set(state => ({
            projects: [...state.projects, {
                projectId: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
                projectName: name,
                projectDescription: description,
                projectTasks: [{ status: 'to-do', tasks: [] }, { status: 'in-progress', tasks: [] }, { status: 'done', tasks: [] }]
            }]
        }))
    },
    deleteProject(id) {
        if (!id) {
            return
        }

        const selectedProject = get().selectedProject.projectId
        if (selectedProject === id) {
            set(() => ({
                selectedProject: {
                    projectId: null
                }
            }))
        }

        set(state => ({
            projects: state.projects.filter(el => el.projectId !== id)
        }))
    },
    updateProject(id, name, description) {
        if (!id || !name || !name.trim() || typeof description !== 'string' || name.length >= 128 || description.length >= 128) {
            return
        }

        const projects = get().projects.map(el => {
            if (el.projectId === id) {
                return {
                    projectId: el.projectId,
                    projectName: name,
                    projectDescription: description,
                    projectTasks: el.projectTasks
                }
            } else {
                return el
            }
        })

        set(() => ({
            projects: [...projects]
        }))
    },

    // Task
    createTask(projectId, task) {
        if (!projectId || !task || !task.title || !task.title.trim() || typeof task.description !== 'string' || task.title.length >= 128 || task.description.length >= 128 || (task.priority !== 'high' && task.priority !== 'low' && task.priority !== 'medium')) {
            return
        }

        set(state => ({
            projects: state.projects.map(project =>
                project.projectId === projectId
                    ? {
                        ...project,
                        projectTasks: project.projectTasks.map(group =>
                            group.status === 'to-do'
                                ? {
                                    ...group,
                                    tasks: [
                                        ...group.tasks,
                                        {
                                            taskId: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
                                            ...task
                                        }
                                    ]
                                }
                                : group
                        )
                    }
                    : project
            )
        }))
    },
    deleteTask(projectId, taskId) {
        if (!projectId || !taskId) {
            return
        }

        set(state => ({
            projects: state.projects.map(project =>
                project.projectId === projectId
                    ? {
                        ...project,
                        projectTasks: project.projectTasks.map(group => ({
                            ...group,
                            tasks: group.tasks.filter(task => task.taskId !== taskId)
                        }))
                    }
                    : project
            )
        }))
    },
    updateTask: (projectId, taskId, task, status = null) => {
        if (!projectId || !taskId || !task || !task.taskId || !task.title || !task.title.trim() || typeof task.description !== 'string' || task.title.length >= 128 || task.description.length >= 128 || (task.priority !== 'high' && task.priority !== 'low' && task.priority !== 'medium')) {
            return
        }

        const projects = get().projects.map(project => {
            if (project.projectId !== projectId) return project

            const sourceGroup = project.projectTasks.find(group =>
                group.tasks.some(task => task.taskId === taskId)
            )

            if (!sourceGroup) return project

            const targetStatus = status ?? sourceGroup.status

            const updatedTask = {
                ...sourceGroup.tasks.find(task => task.taskId === taskId)!,
                ...task,
                taskId
            }

            if (sourceGroup.status === targetStatus) {
                return {
                    ...project,
                    projectTasks: project.projectTasks.map(group => {
                        if (group.status !== sourceGroup.status) return group

                        return {
                            ...group,
                            tasks: group.tasks.map(t =>
                                t.taskId === taskId ? updatedTask : t
                            )
                        }
                    })
                }
            }

            return {
                ...project,
                projectTasks: project.projectTasks.map(group => {
                    if (group.status === sourceGroup.status) {
                        return {
                            ...group,
                            tasks: group.tasks.filter(t => t.taskId !== taskId)
                        }
                    }

                    if (group.status === targetStatus) {
                        return {
                            ...group,
                            tasks: [...group.tasks, updatedTask]
                        }
                    }

                    return group
                })
            }
        })

        set({ projects })
    },

    // Error message
    errorMessage: {
        errorMessage: '',
        isActive: false,
        totalTimerId: null
    },
    toggleMessageError: async (message) => {
        const totalTimerId = get().errorMessage.totalTimerId

        if (totalTimerId !== null) {
            clearTimeout(totalTimerId)
        }

        set({
            errorMessage: {
                errorMessage: message,
                isActive: true,
                totalTimerId: setTimeout(() => {
                    set({
                        errorMessage: {
                            errorMessage: '',
                            isActive: false,
                            totalTimerId: null
                        }
                    })
                }, 5000)
            }
        })
    },
    closeMessageError: () => {
        const totalTimerId = get().errorMessage.totalTimerId

        if (totalTimerId) {
            clearTimeout(totalTimerId)

            set({
                errorMessage: {
                    errorMessage: '',
                    isActive: false,
                    totalTimerId: null
                }
            })
        }
    },

    // Theme
    theme: 'light',
    changeTheme: () => {
        const theme = get().theme === 'light' ? 'dark' : 'light'
        set(() => ({
            theme: theme
        }))
        document.documentElement.setAttribute('data-theme', theme)
    }
}), {
    name: 'projects-state',

    // Save localStorage (project, selectedProject, theme)
    partialize: (state) => ({
        projects: state.projects,
        selectedProject: state.selectedProject,
        theme: state.theme
    }),

    // Load theme
    onRehydrateStorage: () => (state) => {
        if (state) {
            document.documentElement.setAttribute('data-theme', state.theme)
        }
    }
}))

export default useProjectsState