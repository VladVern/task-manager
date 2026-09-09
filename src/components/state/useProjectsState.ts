import type { State } from '../type/ProjectState'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useProjectsState = create<State>()(persist((set, get) => ({
    selectedProject: {
        projectName: null,
        projectId: null
    },

    projects: [],

    createProject(name, description) {
        if (!name || !description) {
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
    selectProject(id) {
        set(state => {
            const project = state.projects.find(project => project.projectId === id)

            return {
                selectedProject: {
                    projectName: project?.projectName ?? null,
                    projectId: project?.projectId ?? null
                }
            }
        })
    },
}), {
    name: 'projects-state'
}))

export default useProjectsState