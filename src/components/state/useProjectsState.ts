import type { State } from '../type/ProjectState'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useProjectsState = create<State>()(persist((set, get) => ({
    selectedProject: {
        projectId: null
    },

    projects: [],

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

    createProject(name, description) {
        if (!name || !description || name.length >= 50 || description.length >= 240) {
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
        if (!id || !name || !description || name.length >= 50 || description.length >= 240) {
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

    },
    deleteTask(id, task) {

    },
    updateTask(id, task) {

    },
}), {
    name: 'projects-state'
}))

export default useProjectsState