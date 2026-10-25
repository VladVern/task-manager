import type { State, Task } from '../type/ProjectState'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useProjectsState = create<State>()(persist((set, get) => ({
    // Selected project
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
        if (!name || !description || name.length >= 240 || description.length >= 240) {
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

        set(state => ({
            projects: state.projects.filter(el => el.projectId !== id)
        }))
    },
    updateProject(id, name, description) {
        if (!id || !name || !description || name.length >= 240 || description.length >= 240) {
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
        if (!projectId || !task) {
            return
        }

        const projects = get().projects.map(project => {
            if (project.projectId === projectId) {
                project.projectTasks[0].tasks.push({
                    taskId: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
                    ...task
                })

                return project
            } else {
                return project
            }
        })

        set(() => ({
            projects: [...projects]
        }))
    },
    deleteTask(projectId, taskId, task) {
        if (!projectId || !taskId || !task) {
            return
        }
    },
    updateTask: (projectId, taskId, task, status = null) => {
        if (!projectId || !taskId || !task) {
            return
        }

        const projects = get().projects.map(project => {
            if (project.projectId !== projectId) {
                return project
            }

            let updatedTask: Task | null = null

            // Ищем задачу во всех статусах
            const projectTasks = project.projectTasks.map(group => {
                const foundTask = group.tasks.find(task => task.taskId === taskId)

                if (foundTask) {
                    updatedTask = {
                        ...foundTask,
                        ...task,
                        taskId
                    }
                }

                return {
                    ...group,
                    tasks: group.tasks.filter(
                        task => task.taskId !== taskId
                    )
                }
            })

            // Если задача не найдена, ничего не меняем
            if (!updatedTask) {
                return project
            }

            // Если статус не передан, оставляем исходный
            const targetStatus = status ?? project.projectTasks.find(group => group.tasks.some(task => task.taskId === taskId))?.status

            return {
                ...project,
                projectTasks: projectTasks.map(group => {
                    if (group.status !== targetStatus) {
                        return group
                    }

                    return {
                        ...group,
                        tasks: [...group.tasks, updatedTask!]
                    }
                })
            }
        })

        set({ projects: projects })
    },

    // Error message
    errorMessage: {
        errorMessage: '',
        isActive: false
    },
    toggleMessageError: async (message) => {
        set(() => ({
            errorMessage: {
                errorMessage: message,
                isActive: true
            }
        }))

        await new Promise(res => setTimeout(res, 5000))

        set(() => ({
            errorMessage: {
                errorMessage: '',
                isActive: false
            }
        }))
    }
}), {
    name: 'projects-state',

    partialize: (state) => ({
        projects: state.projects,
        selectedProject: state.selectedProject
    })
}))

export default useProjectsState