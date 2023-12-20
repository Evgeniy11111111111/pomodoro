import React from 'react';
import styles from './text.scss';
import classNames from 'classnames'

export enum EColor {
  black = 'black',
  white = 'white',
  red   = 'red',
  gray  = 'gray',
  grayLight = 'gray-light',
  totalBlack = 'total-black'
}

export enum EBold {
  regular    = 'regular',
  medium     = 'medium',
  light      = 'light',
  ultraLight = 'ultralight',
  bold       = 'bold',
}
type TSizes = 150 | 64 | 24 | 16 | 12

type THeight = 16 | 17 | 24 | 28 | 33 | 64 | 76 | 179
interface ITextProps {
  As?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div';
  children?: React.ReactNode;
  size?: TSizes;
  color?: EColor;
  bold?: EBold;
  lheight?: THeight;
  className?: string;
}

export function Text(props: ITextProps) {
  const {
    As = 'span',
    children,
    size= 16,
    lheight = 16,
    color = EColor.black,
    bold = EBold.regular,
    className
  } = props
  const classes = classNames(
    styles[`s${size}`],
    styles[`lh${lheight}`],
    styles[color],
    styles[bold],
    className
  )
  return (
    <As className={classes}>
      {children}
    </As>
  );
}
