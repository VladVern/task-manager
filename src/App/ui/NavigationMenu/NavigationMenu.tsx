import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './style.css'

import Sun from '../../../assets/img/sun.svg'
import Moon from '../../../assets/img/moon.svg'
import ArrowLeft from '../../../assets/img/arrow-left.svg'
import Download from "../../../assets/img/download.svg"
import Upload from "../../../assets/img/upload.svg"
import Trash from "../../../assets/img/trash.svg"

import useProjectsState from "../../../components/shared/state/useProjectsState"

import DeleteModal from '../../../components/shared/ui/DeleteModal/DeleteModal'
import WarningModal from '../../../components/shared/ui/WarningModal/WarningModal'

function NavigationMenu() {
    // Error
    const toggleMessageError = useProjectsState(state => state.toggleMessageError)
    
    // State Modals (delete, warning)
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)
    const [isOpenWarningModal, setIsOpenWarningModal] = useState<boolean>(false)
    const [totalFile, setTotalFile] = useState<null | string>(null)

    // Clear project data
    function deleteDataButton() {
        useProjectsState.setState(() => ({ projects: [] }))
        useProjectsState.setState(() => ({ selectedProject: { projectId: null } }))
    }

    // Navigation logic
    const navigate = useNavigate()

    // Theme logic
    const theme = useProjectsState(state => state.theme)
    const changeTheme = useProjectsState(state => state.changeTheme)

    // Download localStorage logic
    const projects = useProjectsState(state => state.projects)
    function downloadLocalStorageButton() {
        const savedProjects = new Blob([JSON.stringify(projects)], { type: "application/json" })
        const a = document.createElement('a')
        a.href = URL.createObjectURL(savedProjects)
        a.download = "projects.json"
        a.click()
        URL.revokeObjectURL(a.href)
        a.remove()
    }

    // Upload localStorage logic
    async function uploadLocalStorageButton(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        
        const file = event.target.files?.[0]

        if (!file) {
            return
        }

        try {
            const buffer = await file.arrayBuffer()
            const text = new TextDecoder().decode(buffer)
            setTotalFile(text)

            setIsOpenWarningModal(true)
        } catch {
            toggleMessageError('Something went wrong')
        }
    }
    return (
        <>
            <section className="navigation-menu">
                {/* Navigation */}
                <div className="navigation-menu-navigation">
                    <button onClick={() => navigate('/projects/')}>
                        <img draggable='false' src={ArrowLeft} alt="Left" />
                    </button>
                </div>

                {/* Change Theme and some actions */}
                <div draggable='false' className="navigation-menu-actions">
                    <button title='Reset projects' onClick={() => setIsOpenDeleteModal(true)} className='navigation-menu-clear'>
                        <img draggable='false' src={Trash} alt="Trash" />
                    </button>
                    <button title='Download projects' onClick={downloadLocalStorageButton} className='navigation-menu-download'>
                        <img draggable='false' src={Download} alt="Download" />
                    </button>
                    <label title='Upload projects' className='navigation-menu-upload' htmlFor="uploadFile">
                        <input onChange={(e) => uploadLocalStorageButton(e)} id='uploadFile' type='file' />
                        <img draggable='false' src={Upload} alt="Upload" />
                    </label>

                    <div draggable="false" onClick={changeTheme} className="navigation-menu-toggle-switch">
                        <img draggable='false' src={Moon} />
                        <img draggable='false' src={Sun} />
                        <div draggable='false' className={theme === 'dark' ? 'active' : ''} />
                    </div>
                </div>
            </section>

            <div className='navigation-menu-line'><div /></div>

            {/* Modals */}
            <DeleteModal
                isOpen={isOpenDeleteModal}
                closeModal={() => setIsOpenDeleteModal(false)}
                deleteFunction={() => {
                    deleteDataButton()
                    navigate('/projects/')
                }}
                title='Reset all projects?'
                buttonText='Reset'
            />
            <WarningModal
                buttonText='Upload'
                title='Uploading new projects will replace existing ones. Incorrect file formats may break everything and require a complete cleanup. Back up your projects before proceeding!'
                closeModal={() => setIsOpenWarningModal(false)}
                isOpen={isOpenWarningModal}
                warningFunction={() => {
                    if (!totalFile) {
                        return
                    }
                    try {
                        useProjectsState.setState(() => ({ projects: JSON.parse(totalFile) }))
                        useProjectsState.setState(() => ({ selectedProject: { projectId: null } }))
                        navigate('/projects/')
                    } catch {
                        toggleMessageError('Something went wrong')
                    }
                }}
            />
        </>
    )
}

export default NavigationMenu