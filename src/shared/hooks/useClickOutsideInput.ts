import {useEffect, useRef} from "react";

interface IUseClickOutsideInput {
    onClose?: () => void;
    isEdit: boolean
}

export function useClickOutsideInput({onClose, isEdit}: IUseClickOutsideInput) {
    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isEdit) {
            ref.current?.focus()
        }
    }, [isEdit])
    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (event.target instanceof  Node && !ref.current?.contains(event.target)) {
                onClose?.()
            }

        }
        document.addEventListener('click', handleClick)

        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])

    return ref
}