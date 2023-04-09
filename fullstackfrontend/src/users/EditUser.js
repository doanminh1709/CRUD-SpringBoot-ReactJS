import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function EditUser() {

    let navigate=useNavigate();

    //Get id on url 
    const{id} = useParams()
    //State : Use state to store property values that belongs to the component 
    const[user,setUser] = useState({
        name:"" , 
        username:"",
        email:""
    })

    const{name , username , email} = user
    //Define onInputChange method called when user passed data to form 
    const onInputChange = (e)=>{
        //Marges the current state value of 'user' with the new object using the spread operator('...')
        setUser({...user,[e.target.name]:e.target.value})
    }

    //Load data user begin when component render first 
    useEffect(() =>{
        loadUser()
    },[]);

    //Handle onSubmit method define method handle event when people click submit button 
    const onSubmit = async (e) =>{
        e.preventDefault();// not show info on url 
        await axios.put(`http://localhost:8080/user/${id}` , user)
        navigate("/")
    }

    //Load info's current user and from API and update value of State 
    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/user/${id}`)
        setUser(result.data);
    }


  return (
    <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h2 className="text-center m-4">Edit User</h2>
                <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="Name" className="form-label">
                        Name
                    </label>
                    <input
                    type={"text"} 
                    className="form-control"
                    placeholder="Enter your name"
                    name="name"
                    value={name}
                    onChange={(e) => onInputChange(e)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="Username" className="form-label">
                        Username
                    </label>
                    <input
                    type={"text"} 
                    className="form-control"
                    placeholder="Enter your username"
                    name="username"
                    value={username}
                    onChange={(e) => onInputChange(e)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">
                        Email
                    </label>
                    <input
                    type={"text"} 
                    className="form-control"
                    placeholder="Enter your email"
                    name="email"
                    value={email}
                    onChange={(e) => onInputChange(e)}
                    />
                </div>
                <button type="submit" className="btn btn-outline-primary">Save</button>
                <Link className="btn btn-outline-danger mx-2" to="/">Cancel</Link>
                </form>
            </div>
        </div>
        
    </div>
  )
}
