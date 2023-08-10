import React from 'react';
import styles from './icon.scss';
import {PomodoroIcon} from "../Icons/Pomodoro";
import {EqualizerIcon} from "../Icons/Equalizer";
import {ActionMenuIcon} from "../Icons/ActionMenu";
import {IncreaseIcon} from "../Icons/Increase";
import {DecreaseIcon} from "../Icons/Decrease";
import {EditIcon} from "../Icons/Edit";
import {DeleteIcon} from "../Icons/Delete";
import {CloseIcon} from "../Icons/Close";
import {PlusIcon} from "../Icons/Plus";

export enum EIcon {
    Pomodoro = 'PomodoroIcon',
    Equalizer = 'Equalizer',
    ActionMenu = 'ActionMenu',
    Increase = 'Increase',
    Decrease = 'Decrease',
    Edit = 'Edit',
    Delete = 'Delete',
    Close = 'Close',
    Plus = 'Plus'
}

interface IIconProps {
    name: EIcon,
}

export function Icon(props: IIconProps) {
    const {name} = props
    switch (name) {
        case EIcon.Pomodoro: return (
            <PomodoroIcon />
        )
        case EIcon.Equalizer: return (
            <EqualizerIcon />
        )
        case EIcon.ActionMenu: return (
            <ActionMenuIcon />
        )
        case EIcon.Increase: return (
            <IncreaseIcon />
        )
        case EIcon.Decrease: return (
            <DecreaseIcon />
        )
        case EIcon.Edit: return (
            <EditIcon />
        )
        case EIcon.Delete: return (
            <DeleteIcon />
        )
        case EIcon.Close: return (
            <CloseIcon />
        )
        case EIcon.Plus: return (
            <PlusIcon />
        )

    }
}

