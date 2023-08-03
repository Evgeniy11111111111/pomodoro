import React, {useEffect, useState} from "react";

interface IUseDropdownPosition {
    buttonRef: React.RefObject<HTMLButtonElement>
}

interface IPosition {
    top: number,
    left: number
}
export function useDropdownPosition({buttonRef}: IUseDropdownPosition) {
    const [positionDropdown, setPositionDropdown] = useState<IPosition>({top: 0, left: 0})

    useEffect(() => {
        if (buttonRef.current) {
            const buttonRect = buttonRef.current.getBoundingClientRect()

            const position = {
                top: buttonRect.bottom,
                left: buttonRect.left,
            }

            setPositionDropdown(position)
        }
    }, [buttonRef])

    return [positionDropdown]
}