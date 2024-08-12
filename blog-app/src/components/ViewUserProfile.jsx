import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, Col, Container, Row, Table } from "reactstrap";
import { getCurrentUserDetail, isLoggedIn } from '../auth';

const ViewUserProfile = ({user}) => {
   const [currentUser, setCurrentUser] = useState(null)
   const [login, setLogin] = useState(null)
   useEffect(()=>{
      setCurrentUser(getCurrentUserDetail())
      setLogin(isLoggedIn())
   },[])
  return (
    <Card className="mt-2 border-0 rounded-0 shadown-sm">
    <CardBody>
       <h3 className="text-uppercase">user Info</h3>
       <Container className="text-center">
          <img  style={{maxWidth: '150px', maxHeight: '250px'}} src={user.image?user.image:'https://img.freepik.com/free-photo/user-profile-front-side-with-white-background_187299-40009.jpg?t=st=1723171695~exp=1723175295~hmac=fe69149c719a307fa78f17906314054994263b31ce56006af6479ba94e273d46&w=826'} alt=""  className="image-fluid rounded-circle"/>
       </Container>
       <Table responsive striped hover className="mt-5  text-center"  bordered={true}>
          <tbody>
             <tr>
                <td>
                   Blog Id
                </td>
                <td>
                   {user.id}
                </td>
             </tr>

             <tr>
                <td>
                   USER NAME
                </td>
                <td>
                  {user.name}
                </td>
             </tr>

             <tr>
                <td>
                   USER Email
                </td>
                <td>
                  {user.email}
                </td>
             </tr>

             <tr>
                <td>
                   USER About
                </td>
                <td>
                  {user.about}
                </td>
             </tr>

             <tr>
                <td>
                   USER Role
                </td>
                <td>
                 {user.roles.map((role)=>{
                   return (
                      <div key={role.id}>{role.name}</div>
                   )
                 })}
                </td>
             </tr>

          </tbody>
       </Table>
       {

         currentUser?(currentUser.id == user.id)?
         (
            <CardFooter className='text-center'>
               <Button color='warning'>Update profile</Button>
            </CardFooter>
            ):'':''
       }
    </CardBody>
  </Card>
  )
}

export default ViewUserProfile