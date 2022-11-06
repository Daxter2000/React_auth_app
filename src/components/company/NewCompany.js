import React, {useState, useEffect} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


const NewCompany = (props) => {
    const navigate = useNavigate()
    const [company, setCompany] = useState({})

    useEffect(() => {
        setCompany({name:"", RFC: "", address: ""})
    }, [])
    
    const handleChange = (e) => {
        e.preventDefault()
        setCompany(Object.assign({},company, {[e.target.name]: e.target.value}))
    }

    const handleSubmit=(e) => {
        axios.post("http://localhost:3000/company/create", 
            {
                company: 
                    {
                    name: company.name,
                    RFC: company.RFC,
                    address: company.address
                    }
            }
        ,{withCredentials:true})
        .then(response => {
            console.log(response)
        }).catch(e => {
            console.log("error en la creacion de company", e)
        })
        e.preventDefault()
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <input type="text" 
                    name="name"
                    placeholder="Company name"
                    value={company.name || ""} 
                    onChange={handleChange} 
                    required 
                />

                <input type="text" 
                    name="RFC"
                    placeholder="RFC"
                    value={company.RFC || ""} 
                    onChange={handleChange} 
                     
                />
                
                <input type="text" 
                    name="address"
                    placeholder="Address"
                    value={company.address || ""} 
                    onChange={handleChange} 
                    required 
                />

                <button type="submit">Registrar company</button>
            </form>
        </div>
         );
}

export default NewCompany