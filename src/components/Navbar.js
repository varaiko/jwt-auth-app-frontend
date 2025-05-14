import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { AuthData } from '../auth/AuthWrapper';
import { nav } from "./Navigation";
import { redirectToHome, removeCookies } from '../utils/UtilFunctions';

const AppNavbar = () => {

  const { user } = AuthData();

  const logout = () => {
    removeCookies(["access_token", "refresh_token"])
    redirectToHome();
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm py-3">
      <Container>
        <Navbar.Brand href="/" className="fw-bold text-uppercase">AuthApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center gap-2">
            {nav.map((route, index) => {
              const showForUnauth = !user.isAuthenticated && !route.isAuthenticated && route.isMenu;
              const showForPerm = user.isAuthenticated && route.hasPermissions && user.permissions.includes(route.hasPermissions.toString()) && route.isMenu;
              const showForRole = user.isAuthenticated && route.hasRole && route.hasRole.toString() === user.roles && route.isMenu;
              if (showForUnauth || showForPerm || showForRole) {
                return (
                  <Nav.Link key={index} href={route.path} className="text-light px-3 rounded hover-opacity">
                    {route.name}
                  </Nav.Link>
                );
              }
              return null;
            })}
            {user.isAuthenticated && (
              <Nav.Link onClick={logout} className="text-light px-3 rounded bg-danger bg-opacity-75 hover-opacity">
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
