import React, { useEffect, useState } from 'react'
import{Row,Col} from 'react-bootstrap'
import ProjectCards from '../Components/ProjectCards'
import { Link } from 'react-router-dom'
import { homeProjects } from '../services/allApis'

function Landing() {
  const [token,setToken]=useState("")
  const [projects,setProjects]=useState([])
  useEffect(()=>{
    setToken(sessionStorage.getItem("token"))
    getHomeProjects()
  },[])

  const getHomeProjects=async()=>{
    const result=await homeProjects()
    // console.log(result)
    if(result.status==200){
      setProjects(result.data)
    }
    else{
      console.log(result.response.data)
    }
  }

  console.log(projects)
  return (
    <>
    <div className='w-100 d-flex p-5 align-items-center ' style={{height:'100vh', backgroundColor:'pink'}}>
        <Row>
        <Col className='align-items-center d-flex'>
        <div>
        <h1 className='mb-2 display-4 text-light'>project fair</h1>
            <p style={{textAlign:'justify'}}>survived not only five centuries, but also the leap into electronic typesetting,
             remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
             and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
             {/* <button className='btn btn-success'></button> */}
            
             {
              token ?
              <Link  className='btn btn-warning' to={'/dash'}>manage your projects..</Link>
              :
              <Link  className='btn btn-success' to={'/auth'}>start to explore..</Link>

             }
              
        </div>
            </Col>
            <Col>
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/web-development-2974925-2477356.png"   className='img-fluid' alt="" />
            </Col>
        </Row>
        </div>
        <div className='p-5 w-100'>
          <h2 className='text-center mt-4 mb-3'>projects for you...</h2>
          <marquee behavior="" direction="">
            <div className='d-flex justify-content-evenly mt-2'>

              {
                projects.length>0?
                projects.map(item=>(
                  <ProjectCards project={item}/>

                ))
                :
                <h5>no projects available</h5>
              }
           
            
            </div>
          </marquee>

          <div className='text-center ' >
            <Link to={'/pro'}>click for more </Link>
          </div>
        </div>
        </>
  )
}

export default Landing