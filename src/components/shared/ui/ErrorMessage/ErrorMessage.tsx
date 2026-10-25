import './style.css'

import type { Props } from '../../type/ErrorMessage'

function ErrorMessage({title, isActive}: Props) {
    return (
        <section style={{ display: isActive ? 'flex' : 'none' }} className='error-message'>
            <h1>{title}</h1>
        </section>
    )
}

export default ErrorMessage