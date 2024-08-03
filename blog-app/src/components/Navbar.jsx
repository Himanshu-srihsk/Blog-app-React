import React, { useState } from 'react';
import { NavLink as ReactLink} from 'react-router-dom';
import { Navbar,NavbarBrand,NavbarToggler,Collapse,Nav,NavbarText,UncontrolledDropdown,DropdownItem,DropdownMenu,NavItem,NavLink,DropdownToggle} from "reactstrap";
const CustomNavbar = () =>{
    const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

    return(
          <div>
             <Navbar color='dark' dark expand='md' fixed=''>
        <NavbarBrand tag={ReactLink} to="/">MyBlogs</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/about">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/login">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/signup">Signup</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                GitHub
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem  tag={ReactLink} to="/services">Services</DropdownItem>
                <DropdownItem> Contact us</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Youtube</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>Youtube</NavbarText>
        </Collapse>
      </Navbar>
          </div>
    );
};

export default CustomNavbar;