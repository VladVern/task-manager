import { useEffect } from 'react'

import './style.css'

import type { Props } from './type'

import X from '../../../../assets/img/x.svg'

function DeleteModal({ title, buttonText, isOpen, closeModal, deleteFunction }: Props) {
    // Logic hide/show scroll bar
    useEffect(() => {
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth

        if (isOpen) {
            document.body.style.overflowY = 'hidden'
            document.body.style.paddingRight = `${scrollBarWidth}px`
        } else {
            document.body.style.overflowY = 'auto'
            document.body.style.paddingRight = '0px'
        }

        return () => {
            document.body.style.overflowY = 'auto'
            document.body.style.paddingRight = '0px'
        }
    }, [isOpen])

    return (
        <>
            <section style={{ display: isOpen ? 'flex' : 'none' }} className='delete-project-modal modal'>
                {/* Close modal */}
                <img src={X} alt="X" onClick={closeModal} />

                {/* Title and Delete button */}
                <h1>{title}</h1>
                <button
                    onClick={() => {
                        deleteFunction()
                        closeModal()
                    }}>
                    {buttonText}
                </button>

            </section>

            {/* Black background */}
            <div
                onClick={closeModal}
                style={{ display: isOpen ? 'flex' : 'none' }}
                className="delete-project-modal-overlay"
            />
        </>
    )
}

export default DeleteModal