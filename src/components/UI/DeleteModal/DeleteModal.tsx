import { useEffect } from 'react'

import './style.css'

import X from '../../../media/img/x.svg'

import type { Props } from '../../type/DeleteModal'

function DeleteProjectModal({ title, isOpen, closeModal, deleteFunction }: Props) {
    useEffect(() => {
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth

        if (isOpen) {
            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = `${scrollBarWidth}px`
        } else {
            document.body.style.overflow = 'auto'
            document.body.style.paddingRight = '0px'
        }

        return () => {
            document.body.style.overflow = 'auto'
            document.body.style.paddingRight = '0px'
        }
    }, [isOpen])

    return (
        <>
            <section style={{ display: isOpen ? 'flex' : 'none' }} className='delete-project-modal'>
                <img src={X} alt="X" onClick={closeModal} />

                <h1>Delete {title}?</h1>
                <button onClick={() => {
                    deleteFunction()
                    closeModal()
                }}>Delete</button>

            </section>

            <div onClick={closeModal} style={{ display: isOpen ? 'flex' : 'none' }} className="delete-project-modal-overlay"></div>
        </>
    )
}

export default DeleteProjectModal