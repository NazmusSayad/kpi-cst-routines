import { ComponentProps, PropsWithChildren } from 'react'
import css from './Button.module.scss'

export const Button = ({ className, ...props }: ComponentProps<'button'>) => {
  return <button {...props} className={$cn(css.button, className)} />
}
