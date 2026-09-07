import type { State } from '../type/ProjectState'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useProjectsState = create<State>()(persist((set, get) => ({
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
    }
}), {
    name: 'projects-state'
}))

export default useProjectsState