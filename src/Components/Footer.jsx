import React from 'react'
import { Link } from 'react-router-dom'
import {Row,Col} from 'react-bootstrap'

function Footer() {
  return (
    <>
     <div className='w-100 bg-light  bg-success'>
      <Row>
        <Col className='d-flex flex-column align-items-center'> 
        <h4>project fair 2024</h4>
          <p  style={{textAlign:'justify'}}> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'<br/>
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make<br/>
             a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,<br/>
              remaining essentially unchanged.</p></Col>
     
     
         
     
      <Col className='d-flex flex-column align-items-center'> 
      <h4>links</h4>
      <Link to={'/'} style={{color:'grey'}}>Landing</Link><br/>
          <Link to={'/log'} style={{color:'grey'}} >Login</Link><br/>
          <Link to={'/reg'} style={{color:'grey'}} >Register</Link><br/>
          {/* <Link to={'/auth'} style={{color:'grey'}} >Auth</Link><br/> */}
          </Col>
         
        

        
      <Col className='d-flex flex-column align-items-center '>
        <h4>References</h4>
          <a href="https://react-bootstrap.github.io/"  target='_blank' style={{color:'grey'}} >React-bootstrap</a><br/>
          <a href="https://react.dev/" target='_blank' style={{color:'grey'}} >React</a><br/>
          <a href="https://getbootstrap.com/" target='_blank' style={{color:'grey'}} >bootstrap</a><br/>
          </Col>

        
      <div className='text-center'>
          <p> &copy; project fair 2024</p>
      </div>
      </Row>
      </div>
    </>
  )
}

export default Footer