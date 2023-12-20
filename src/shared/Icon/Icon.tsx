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
import {ArrowRed} from "../Icons/ArrowRed";
import {StatsPomodoro} from "../Icons/StatsPomodoro";
import {StatsPomodoroBig} from "../Icons/StatsPomodoroBig";
import {Focus} from "../Icons/Focus";
import {StopCount} from "../Icons/StopCount";
import {TimeInPause} from "../Icons/TimeInPause";

export enum EIcon {
    Pomodoro = 'PomodoroIcon',
    Equalizer = 'Equalizer',
    ActionMenu = 'ActionMenu',
    Increase = 'Increase',
    Decrease = 'Decrease',
    Edit = 'Edit',
    Delete = 'Delete',
    Close = 'Close',
    Plus = 'Plus',
    ArrowRed = 'ArrowRed',
    StatsPomodoro = 'StatsPomodoro',
    StatsPomodoroBig = 'StatsPomodoroBig',
    Focus = "Focus",
    StopCount = "StopCount",
    TimeInPause = "TimeInPause"
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
        case EIcon.ArrowRed: return (
            <ArrowRed />
        )
        case EIcon.StatsPomodoro: return (
            <StatsPomodoro />
        )
        case EIcon.StatsPomodoroBig: return (
            <StatsPomodoroBig />
        )
        case EIcon.Focus: return (
            <Focus />
        )
        case EIcon.StopCount: return (
            <StopCount />
        )
        case EIcon.TimeInPause: return (
            <TimeInPause />
        )
    }
}

