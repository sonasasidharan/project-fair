import React, { useEffect, useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import server_url from '../services/server_url'
import { toast } from 'react-toastify';
import { updateProfile } from '../services/allApis';

function Profile() {
  const [user,setUser]=useState({
    id:"",username:"",email:"",password:"",github:"",linkedin:"",profile:""
  })
  const [preview,setPreview]=useState("")
  const [existingProfile,setExistingProfile]=useState("")
  const [open,SetOpen]=useState(false)

  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      const userDetails=JSON.parse(sessionStorage.getItem('userDetails'))
      setUser({id:userDetails._id,username:userDetails.username,email:userDetails.email,password:userDetails.password,
        github:userDetails.github,linkedin:userDetails.linkedin})
        setExistingProfile(userDetails.profile)
    }
  },[open])
 

  useEffect(()=>{
    if(user.profile){
      setPreview(URL.createObjectURL(user.profile))
    }
    else{
      setPreview("")
    }
  },[user.profile])
  console.log(user)

  const handleProfileUpdate=async()=>{
    console.log(user)
    const {username,password,email,github,linkedin,profile}=user
    if(!username || !password || !email || !github || !linkedin ){
      toast.warning("enter valid inputs")
    }
    else{
      const formData=new FormData()
      formData.append("title",username)
      formData.append("password",password)
      formData.append("email",email)
      formData.append("github",github)
      formData.append("linkedin",linkedin)
      preview?formData.append("profile",profile):formData.append("profile",existingProfile)

      const header={
        "Authorization":`Bearer ${sessionStorage.getItem('token')}`,
        "content-Type":preview?"multipart/form-data":"application/json"
      }
      const result=await updateProfile(header,formData)
      if(result.status==200){
        console.log(result.data)
        toast.success("profile update successfully")
        sessionStorage.setItem("userDetails",JSON.stringify(result.data))
        SetOpen(!open)
      }
      else{
        toast.error(result.response.data)
      }
    }
  }
  return (
   <>
    
   <div className='p-5 border shadow border-3 m-3'>
    <div className='d-flex justify-content-between'>
    <h3>profile</h3>
    <button className='btn' onClick={()=>{SetOpen(!open)}}>
    <i className="fa-solid fa-down-long" style={{color: "#63E6BE",}} />
    </button>
    </div>
    {
      open &&
      <div>
             <label >
             <input type="file" name='' id='in' style={{display:'none'}} onChange={(e)=>setUser({...user,profile:e.target.files[0]})} />
              {
                existingProfile==""?
                <img src={preview?preview:"https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png"} alt="" className='img-fluid'  width={'150px'}/>
                :
                <img src={preview?preview:`${server_url}/uploads/${existingProfile}`} alt="" className='img-fluid'  width={'150px'}/>

              }
               
       
            </label>
            <FloatingLabel controlId="titleinp" label="titlle"className="mb-3">
        <Form.Control type="text" placeholder="title" value={user?.username} onChange={(e)=>setUser({...user,username:e.target.value})} />
      </FloatingLabel>
      <FloatingLabel controlId="githubinp" label="github Url" className="mb-3">
        <Form.Control type="text" placeholder="githuburl"  value={user?.github} onChange={(e)=>setUser({...user,github:e.target.value})}/>
      </FloatingLabel>
      <FloatingLabel controlId="linkedininp" label="linkedin Url" className="mb-3">
        <Form.Control type="text" placeholder="linkedinurl" value={user?.linkedin} onChange={(e)=>setUser({...user,linkedin:e.target.value})}/>
      </FloatingLabel>
      <div className='d-grid mt-3'>
        <button className='btn btn-block btn-warning' onClick={handleProfileUpdate}>update</button>
      </div>
    </div>

    }
    
    </div>
    </>
  )
}

export default Profile