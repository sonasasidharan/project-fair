import { commonApi } from "./commonApi"
import base_url from "./server_url"


// register
 export const useRegister=async(data)=>{
        return await commonApi("POST",`${base_url}/register`,data,"")
}


// login

export const useLogin=async(data)=>{
        return await commonApi("POST",`${base_url}/login`,data,"")
}

// add project
export const addProject=async(data,header)=>{
        return await commonApi('POST',`${base_url}/addprojects`,data,header)
}


// home-project
export const homeProjects=async()=>{
        return await commonApi('GET',`${base_url}/home-projects`,"","")
}


// all projects
export const allProjects=async(header,search)=>{
        return await commonApi('GET',`${base_url}/all-projects?search=${search}`,"",header)
}

// user projects
export const userProjects=async(header)=>{
        return await commonApi('GET',`${base_url}/user-projects`,"",header)
}



// edit project
export const editProjects=async(id,data,header)=>{
        return await commonApi('PUT',`${base_url}/edit-project/${id}`,data,header)
}


// delete projects

export const deleteProjects=async(id,header)=>{
        return await commonApi('DELETE',`${base_url}/delete-project/${id}`,{},header)
}

// update profile

export const updateProfile=async(header,data)=>{
        return await commonApi('PUT',`${base_url}/update-profile`,data,header)
}

