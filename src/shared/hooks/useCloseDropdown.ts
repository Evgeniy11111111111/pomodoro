import {useEffect, useRef} from "react";

interface IUseCloseDropdown {
    onClose?: () => void;
}
export function useCloseDropdown({onClose}: IUseCloseDropdown) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (event.target instanceof Node && !ref.current?.contains(event.target)) {
                onClose?.()
            }
        }

        document.addEventListener('click', handleClick)

        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])

    return ref;
}