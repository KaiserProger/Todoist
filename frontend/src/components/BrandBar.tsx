import React from 'react'
import { Navbar, NavbarBrand } from 'react-bootstrap'

const BrandBar = () => {
  return (
    <Navbar variant="dark" bg="dark" className="d-flex justify-content-center">
        <NavbarBrand>
            ToDoIst
        </NavbarBrand>
    </Navbar>
  )
}

export default BrandBar