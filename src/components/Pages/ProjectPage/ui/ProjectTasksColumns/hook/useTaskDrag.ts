import { useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'

import type { TaskStatus } from '../../../../../shared/type/ProjectState'

const LONG_PRESS_MS = 150
const MOUSE_THRESHOLD = 5
const TOUCH_CANCEL_THRESHOLD = 10

export default function useTaskDrag(onDrop: (taskId: string, status: TaskStatus) => void) {
    // State drugged task
    const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null)
    const [overStatus, setOverStatus] = useState<TaskStatus | null>(null)

    // Latest onDrop
    const onDropRef = useRef(onDrop)
    onDropRef.current = onDrop
    // Active drag cleanup
    const cleanupRef = useRef<(() => void) | null>(null)

    // Cleanup on unmount
    useEffect(() => () => cleanupRef.current?.(), [])

    // Start drag
    function startDrag(e: ReactPointerEvent<HTMLElement>, taskId: string) {
        if (e.button !== 0) return
        if ((e.target as HTMLElement).closest('button')) return
        if (cleanupRef.current) return

        const card = e.currentTarget
        const rect = card.getBoundingClientRect()
        const pointerId = e.pointerId
        const isMouse = e.pointerType === 'mouse'
        const startX = e.clientX
        const startY = e.clientY
        const offsetX = startX - rect.left
        const offsetY = startY - rect.top

        let active = false
        let ghost: HTMLElement | null = null
        let timer: number | undefined
        let currentStatus: TaskStatus | null = null
        let lastX = startX
        let lastY = startY

        function updateGhost() {
            if (ghost) ghost.style.transform = `translate(${lastX - offsetX}px, ${lastY - offsetY}px)`
        }

        function updateTarget() {
            const el = document.elementFromPoint(lastX, lastY)
            const column = el?.closest<HTMLElement>('[data-status]')
            currentStatus = (column?.dataset.status as TaskStatus) ?? null
            setOverStatus(currentStatus)
        }

        function activate() {
            active = true
            ghost = card.cloneNode(true) as HTMLElement
            Object.assign(ghost.style, {
                position: 'fixed',
                left: '0',
                top: '0',
                width: `${rect.width}px`,
                margin: '0',
                zIndex: '9999',
                pointerEvents: 'none',
                opacity: '0.85',
                boxShadow: '0 8px 24px rgba(0,0,0,.25)',
            })
            document.body.appendChild(ghost)
            document.body.style.userSelect = 'none'
            document.body.style.webkitUserSelect = 'none'
            setDraggedTaskId(taskId)
            updateGhost()
            updateTarget()
            navigator.vibrate?.(10)
        }

        function onTouchMove(ev: TouchEvent) {
            if (active) ev.preventDefault()
        }

        function onContextMenu(ev: Event) {
            ev.preventDefault()
        }

        function onMove(ev: PointerEvent) {
            if (ev.pointerId !== pointerId) return
            lastX = ev.clientX
            lastY = ev.clientY

            if (!active) {
                const dist = Math.hypot(lastX - startX, lastY - startY)
                if (isMouse) {
                    if (dist > MOUSE_THRESHOLD) activate()
                } else if (dist > TOUCH_CANCEL_THRESHOLD) {
                    finish(false)
                }
                return
            }

            updateGhost()
            updateTarget()
        }

        function onUp(ev: PointerEvent) {
            if (ev.pointerId === pointerId) finish(true)
        }
        function onCancel(ev: PointerEvent) {
            if (ev.pointerId === pointerId) finish(false)
        }

        function finish(drop: boolean) {
            window.clearTimeout(timer)
            window.removeEventListener('pointermove', onMove)
            window.removeEventListener('pointerup', onUp)
            window.removeEventListener('pointercancel', onCancel)
            window.removeEventListener('touchmove', onTouchMove)
            window.removeEventListener('contextmenu', onContextMenu)
            ghost?.remove()
            document.body.style.userSelect = ''
            document.body.style.webkitUserSelect = ''

            if (active && drop && currentStatus) {
                onDropRef.current(taskId, currentStatus)
            }

            setDraggedTaskId(null)
            setOverStatus(null)
            cleanupRef.current = null
        }

        window.addEventListener('pointermove', onMove)
        window.addEventListener('pointerup', onUp)
        window.addEventListener('pointercancel', onCancel)
        window.addEventListener('touchmove', onTouchMove, { passive: false })
        window.addEventListener('contextmenu', onContextMenu)
        cleanupRef.current = () => finish(false)

        if (!isMouse) {
            timer = window.setTimeout(activate, LONG_PRESS_MS)
        }
    }

    return { draggedTaskId, overStatus, startDrag }
}