import { useEffect } from 'react'

import './style.css'

import type { Props } from './type'

import X from '../../../../assets/img/x.svg'
import Alert from '../../../../assets/img/alert-circle.svg'

function WarningModal({ title, buttonText, isOpen, closeModal, warningFunction }: Props) {
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
            <section style={{ display: isOpen ? 'flex' : 'none' }} className='warning-project-modal modal'>
                {/* Close modal */}
                <img src={X} alt="X" onClick={closeModal} />

                {/* Title and buttons */}
                <div className="warning-project-modal-title">
                    <h1>Warning:</h1>
                    <img draggable='false' src={Alert} alt="Warning" />
                </div>

                <p>{title}</p>

                <div className="warning-project-modal-buttons">
                    <button
                        onClick={() => {
                            closeModal()
                        }}>
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            warningFunction()
                            closeModal()
                        }}>
                        {buttonText}
                    </button>
                </div>


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

export default WarningModal