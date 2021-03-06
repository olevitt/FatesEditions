import React from 'react'
import classnames from 'classnames'
import styles from './style.scss'

const NavbarButton = ({ children, domProps }) => {
  const className = classnames(
    'divider',
    styles.component,
  )
  return (
    <li className={className} {...domProps}>
      <a>{children}<span className="sr-only" /></a>
    </li>
  )
}

export default NavbarButton
