import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import {Row,Col} from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCards'
import { allProjects } from '../services/allApis'

function Projects() {


  const[projects,setProjects]=useState([])
  const [logStatus,setLogStatus]=useState()
  const [search,setSearch]=useState("")

  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      getData()
      setLogStatus(true)
      
    }
    else{
      console.log('login first')
      setLogStatus(false)
    }

  },[search])

  console.log(projects)


  const getData=async()=>{
    const header={"Authorization":`Bearer ${sessionStorage.getItem('token')}`}
    const result=await allProjects(header,search)
    console.log(result)
    if(result.status==200){
      setProjects(result.data)
    }
    else{
      console.log(result.response.data)
    }
  }


  return (
    <>
    <Header  status={true}/>
    <div className='p-5' >
      <div className=' d-flex justify-content-between my-4'>
      <h1>all projects</h1>
      <input type="text" className='form-control w-25' placeholder='enter languages for search projects'  onChange={(e)=>{setSearch(e.target.value)}}/>
      </div>
     
      {
        logStatus?
        <Row>

        {
          projects.length > 0 ?
          projects.map(item => (
            <Col>
            <ProjectCard  project={item}/>
            </Col>

          ))
          :
          <h5 className='text-center text-danger'>no projects available</h5>
        }
       
      </Row>
      :
      <h2 className='text-center text-warning'>please login to get all projects</h2>
      }
    
    </div>
    </>
  )
}

export default Projects