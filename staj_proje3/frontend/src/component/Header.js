import React from 'react'
import { Button,Navbar,Nav,NavDropdown,Container,Form,FormControl} from 'react-bootstrap';
import '../my.css'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userAction';

function Header() {
  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo} = userLogin

  const dispatch = useDispatch()

  const logoutHandler=()=>
  {
    dispatch(logout())
  }
  return (
    <div>
        <Navbar bg="warning" expand="lg">
      <Container fluid>
        <Navbar.Brand className='nav-color' href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <LinkContainer to="/">
            <Nav.Link className='nav-color'><i className="fa-solid fa-house"></i>Anasayfa</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/about">
            <Nav.Link className='nav-color'><i class="fa-solid fa-address-card"></i>Hakkımızda</Nav.Link> 
            </LinkContainer>

            <LinkContainer to="/">
            <Nav.Link className='nav-color'><i className="fa-solid fa-cart-shopping"></i>Ürünler</Nav.Link>
            </LinkContainer>


            {userInfo ? (
              <NavDropdown className='nav-color' title={userInfo.name} id='username'>
                <LinkContainer to="/profile">
                  <NavDropdown.Item className='nav-color'>Profil</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item className='nav-color' onClick={logoutHandler}>Çıkış</NavDropdown.Item>
              </NavDropdown>

            ):
            (
              <LinkContainer to="/login">
              <Nav.Link className='nav-color'><i className="fa-solid fa-user"></i>Üye Girişi</Nav.Link>
              </LinkContainer>

            )
            }




            
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="ürün giriniz"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="light">ARA</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header