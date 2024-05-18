import React, { useContext, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Row,Col } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { addProject } from '../services/allApis';
import { addprojectResponseContext } from '../../Context Api/Contextapi';


function Add() {

  const {addProjectResponse,setAddProjectResponse}=useContext(addprojectResponseContext)
  console.log(useContext(addprojectResponseContext))

    const [show, setShow] = useState(false);
    const [preview,setPreview]=useState("")
    const [projectData,setProjectData]=useState({
      title:"",overview:"",language:"",github:"",demo:"",projectImage:""
    })
      const[imageStatus,setImageStatus]=useState(false)


    useEffect(()=>{
      console.log(projectData)
      if(projectData.projectImage.type=="image/jpg" || projectData.projectImage.type=="image/jpeg" || projectData.projectImage.type=="image/png" ){
        console.log("image is correct format")
        setImageStatus(false)
        setPreview(URL.createObjectURL(projectData.projectImage))
      }
      else{
        console.log("invalid file format.. image should be jpg,png or jpeg")
        setImageStatus(true)
        setPreview("")
      }
    },[projectData.projectImage])


    const handleAddProject= async()=>{
      const {title,overview,language,github,demo,projectImage}=projectData
      if(!title||!overview||!language||!github||!demo||!projectImage){
        toast.warning("Provide Complete Data!!")
      }
      else{
        const formData=new FormData()
        formData.append("title",title)
        formData.append("overview",overview)
        formData.append("language",language)
        formData.append("github",github)
        formData.append("demo",demo)
        formData.append("image",projectImage)

        const token=sessionStorage.getItem("token")
  
        const reqHeader={"Content-Type":"multipart/form-data",
                          "Authorization":`Bearer ${token}`
        }
        const result= await addProject(formData,reqHeader)
        if(result.status==200){
          toast.success("projecct added successfully")
          setProjectData({
            title:"",overview:"",language:"",github:"",demo:"",projectImage:""
          })
          handleClose()
          setAddProjectResponse(result)
        }
        else{
          console.log(result)
          toast.error(result.response.data)
        }
      }
    }
  

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)



    
  return (
   <>
   
   <button className='btn btn-info mb-4' onClick={handleShow}>Add</button>
   <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Add projects</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       <div>
        <Row>
            <Col>
            <label >
                <input type="file" onChange={(e)=>{setProjectData({...projectData,projectImage:e.target.files[0]})}} style={{display:'none'}} />
                  <img src={preview?preview:"https://www.freeiconspng.com/uploads/multimedia-photo-icon-31.png"} alt="" className='img-fluid' />
            </label>
            {
              imageStatus &&
              <p className='text-danger'> invalid file format.. image should be jpg,png or jpeg</p>
            }
           
            </Col>
            <Col>
            <div>
            <FloatingLabel controlId="titleinp" label="titlle"className="mb-3">
        <Form.Control type="text" placeholder="title" onChange={e=>setProjectData({...projectData,title:e.target.value})}  />
      </FloatingLabel>
      <FloatingLabel controlId="overvierinp" label="overview" className="mb-3">
        <Form.Control type="text" placeholder="overview"  onChange={e=>setProjectData({...projectData,overview:e.target.value})}  />
      </FloatingLabel>
      <FloatingLabel controlId="languageinp" label="language" className="mb-3">
        <Form.Control type="text" placeholder="language"   onChange={e=>setProjectData({...projectData,language:e.target.value})} />
      </FloatingLabel>
      <FloatingLabel controlId="githubinp" label="github Url" className="mb-3">
        <Form.Control type="text" placeholder="githuburl"  onChange={e=>setProjectData({...projectData,github:e.target.value})}  />
      </FloatingLabel>
            </div>
            </Col>
            <FloatingLabel controlId="demoinp" label="demo Url"  className='p-1'>
             <Form.Control type="text" placeholder="demo Url"  onChange={e=>setProjectData({...projectData,demo:e.target.value})} />
             </FloatingLabel>
        </Row>
       </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddProject}>save</Button>
        </Modal.Footer>
        

      </Modal>

   
   </>
  )
}

export default Add