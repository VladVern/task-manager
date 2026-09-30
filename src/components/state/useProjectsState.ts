import { isAction } from '@reduxjs/toolkit'
import type { State } from '../type/ProjectState'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useProjectsState = create<State>()(persist((set, get) => ({
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

    projects: [],

    createProject(name, description) {
        if (!name || !description || name.length >= 240 || description.length >= 240) {
            return
        }

        set(state => ({
            projects: [...state.projects, {
                projectId: crypto.randomUUID(),
                projectName: name,
                projectDescription: description,
                projectTasks: []
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

    createTask(id, task) {
        if (!id || !task) {
            return
        }

        const projects = get().projects.map(el => {
            if (el.projectId === id) {
                el.projectTasks.push({
                    taskId: crypto.randomUUID(),
                    ...task
                })

                return el
            } else {
                return el
            }
        })

        set(() => ({
            projects: [...projects]
        }))
    },
    deleteTask(id, task) {
        if (!id || !task) {
            return
        }
    },
    updateTask(id, task) {
        if (!id || !task) {
            return
        }
    },

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