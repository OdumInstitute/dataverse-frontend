import { Button } from './Button'
import styles from './Header.module.css'
import logo from '../hello-dataverse/logo.svg'
import React from 'react'
import { useTranslation } from 'react-i18next'

type User = {
  name: string
}

interface HeaderProps {
  user?: User
  onLogin: () => void
  onLogout: () => void
  onCreateAccount: () => void
}

export function Header({ user, onLogin, onLogout, onCreateAccount }: HeaderProps) {
  const { t } = useTranslation('helloDataverse')

  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>
        <div>
          <img width="28" height="28" src={logo} alt={t('altImage') ?? 'logo'} />
          <h1 className={styles.title}>Dataverse</h1>
        </div>
        <div>
          {user ? (
            <>
              <span className={styles.welcome}>
                Welcome, <b>{user.name}</b>!
              </span>
              <Button size="small" onClick={onLogout} label="Log out" />
            </>
          ) : (
            <>
              <Button size="small" onClick={onLogin} label="Log in" />
              <Button primary size="small" onClick={onCreateAccount} label="Sign up" />
            </>
          )}
        </div>
      </div>
    </header>
  )
}
