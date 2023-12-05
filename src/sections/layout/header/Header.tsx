import logo from '../../../assets/logo.svg'
import { useTranslation } from 'react-i18next'
import { Navbar } from '@iqss/dataverse-design-system'
import { Route } from '../../Route.enum'
import { useSession } from '../../session/SessionContext'

export function Header() {
  const { t } = useTranslation('header')
  const { user, logout } = useSession()
  const baseRemoteUrl = import.meta.env.VITE_DATAVERSE_BACKEND_URL as string

  return (
    <Navbar
      brand={{
        title: t('brandTitle'),
        href: Route.HOME,
        logoImgSrc: logo
      }}>
      {user ? (
        <Navbar.Dropdown title={user.name} id="dropdown-user">
          <Navbar.Dropdown.Item href={Route.LOG_OUT} onClick={logout}>
            {t('logOut')}
          </Navbar.Dropdown.Item>
        </Navbar.Dropdown>
      ) : (
        <>
          <Navbar.Link href={`${baseRemoteUrl}${Route.LOG_IN}`}>{t('logIn')}</Navbar.Link>
          <Navbar.Link href={`${baseRemoteUrl}${Route.SIGN_UP}`}>{t('signUp')}</Navbar.Link>
        </>
      )}
    </Navbar>
  )
}
