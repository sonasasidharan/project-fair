import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import {Row,Col} from 'react-bootstrap'
import server_url from '../services/server_url'

function ProjectCards({project}) {

 

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // console.log(projects)

  return (
  <>
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" onClick={handleShow} className='img-fluid' src={project?.image?`${server_url}/uploads/${project.image}`:"https://d2slcw3kip6qmk.cloudfront.net/marketing/blog/2017Q2/project-planning-header@2x.png"} style={{width:'100%',height:'200px'}}/>
      <Card.Body>
        <Card.Title>{project.title}</Card.Title>
      </Card.Body>
    </Card>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>projects</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
            <Col>
            <img className='img-fluid' src={project?.image?`${server_url}/uploads/${project.image}`:"https://d2slcw3kip6qmk.cloudfront.net/marketing/blog/2017Q2/project-planning-header@2x.png"}  />
            </Col>
            <Col>
            <h4>{project.title}</h4>
            <p>{project.overview}</p>
            <h6>{project.Languages}</h6>
            <div className='mt-3 p-3 d-flex justify-content-between'>
                <a href="">
                <i class="fa-brands fa-github fa-xl"></i>
                </a>
                <a href="">
                <i class="fa-solid fa-link fa-xl"></i>
                </a>
            </div>
            </Col>
        </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">save</Button>
        </Modal.Footer>
      </Modal>

  </>
  )
}

export default ProjectCards