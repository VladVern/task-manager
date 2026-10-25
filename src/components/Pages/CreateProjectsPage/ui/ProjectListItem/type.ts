export type Props = {
    id: string,
    name: string,
    description: string,
    openProject: (id: string) => void,
    deleteProject: (id: string) => void
}