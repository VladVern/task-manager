import './style.css'

import Alert from '../../../../assets/img/alert-circle.svg'
import X from '../../../../assets/img/x.svg'

import type { Props } from '../../type/ErrorMessage'

import useProjectsState from '../../state/useProjectsState'

function ErrorMessage({ title, isActive }: Props) {
    // Close Message
    const closeMessageError = useProjectsState(state => state.closeMessageError)

    return (
        // Message
        <section style={{ display: isActive ? 'flex' : 'none' }} className='error-message modal'>
            <img draggable='false' src={Alert} />
            <p>{title}</p>
            <button onClick={closeMessageError}><img draggable='false' src={X} alt="Close" /></button>
        </section>
    )
}

export default ErrorMessage