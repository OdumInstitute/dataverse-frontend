import { Navbar as NavbarBS } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { Link, NavbarProps } from './NavbarProps'
import { NavDropdown } from './nav-dropdown/NavDropdown'
import { Container } from '../grid/Container'

export function Navbar({ brand, links }: NavbarProps) {
  return (
    <NavbarBS collapseOnSelect bg="light" expand="lg" fixed="top">
      <Container>
        <NavbarBS.Brand href={brand.path}>
          <img width="28" height="28" src={brand.logo.src} alt={brand.logo.altText} />
          {brand.title}
        </NavbarBS.Brand>
        <NavbarBS.Toggle aria-controls="responsive-navbar-nav" />
        <NavbarBS.Collapse id="responsive-navbar-nav">
          <Nav>
            {links.length != 0 &&
              links.map((link: Link, index) =>
                typeof link.value == 'string' ? (
                  <Nav.Link eventKey={index} key={index} href={link.value}>
                    {link.title}
                  </Nav.Link>
                ) : (
                  <NavDropdown key={index} title={link.title} links={link.value} />
                )
              )}
          </Nav>
        </NavbarBS.Collapse>
      </Container>
    </NavbarBS>
  )
}