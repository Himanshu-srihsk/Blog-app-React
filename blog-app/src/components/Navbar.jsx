import React, { useEffect, useState } from 'react';
import { NavLink as ReactLink, useNavigate} from 'react-router-dom';
import { Navbar,NavbarBrand,NavbarToggler,Collapse,Nav,NavbarText,UncontrolledDropdown,DropdownItem,DropdownMenu,NavItem,NavLink,DropdownToggle} from "reactstrap";
import {doLogout, getCurrentUserDetail, isLoggedIn} from "../auth"
const CustomNavbar = () =>{
  let navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  
  const [login, setLogin] = useState(false);
  const [user,setuser] = useState(undefined);
  useEffect(()=>{
    setLogin(isLoggedIn);
    setuser(getCurrentUserDetail());
  },[login])


  const logout = ()=>{
    doLogout(()=>{
        setLogin(false);
        navigate("/")
    })
}

    return(
          <div>
             <Navbar color='dark' dark expand='md' fixed='' className='px-5'>
        <NavbarBrand tag={ReactLink} to="/">MyBlogs</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>

          <NavItem>
              <NavLink tag={ReactLink} to="/">Home</NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={ReactLink} to="/about">About</NavLink>
            </NavItem>
            
              
            <NavItem>
              <NavLink tag={ReactLink} to="/services">Services</NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem  tag={ReactLink} to="/services">Contact Us</DropdownItem>
                <DropdownItem> facebook</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Youtube</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav navbar>
            {
              login && (
                <>
               

               <NavItem>
                  <NavLink tag={ReactLink} to="/profileinfo">ProfileInfo</NavLink>
               </NavItem>

               <NavItem>
                  <NavLink tag={ReactLink} to="/user/dashboard">{user.email}</NavLink>
               </NavItem>

               <NavItem>
                  <NavLink onClick={logout}>Logout</NavLink>
               </NavItem>
                </>
              )
            }
            
            {
              !login &&
               <>
                  <NavItem>
                  <NavLink tag={ReactLink} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/signup">Signup</NavLink>
                </NavItem>
               </>
            }
          </Nav>

        </Collapse>
      </Navbar>
          </div>
    );
};

export default CustomNavbar;