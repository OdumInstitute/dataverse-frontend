import { Outlet } from 'react-router-dom'
import { Header } from './header/Header'
import { Container } from 'dataverse-design-system'
import { Footer } from './footer/Footer'
import styles from './Layout.module.scss'

export function Layout() {
  return (
    <article>
      <Header />
      <Container className={styles['body-container']}>
        <Outlet />
      </Container>
      <Footer />
    </article>
  )
}
