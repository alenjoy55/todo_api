import { useEffect, useState } from "react"
import axios from 'axios'
// import { error } from "console"
function List(){
    const [data,setData]=useState([])
    const [editing,setEditing] = useState(false)
    const [editdata,setEditData] = useState(null)
    useEffect(()=>{
        axios.get( "http://127.0.0.1:8000/api/todo/").then((res)=>{
            console.log(res.data);
            setData(res.data)
        }).catch(error=>console.log(error.message))
    },[])
    const Edit_dtls =(task)=>{
        setEditing(true)
        setEditData(task)
    }
    const updateDtls =(id,task)=>{
        setEditing(false)
        axios.put(`http://127.0.0.1:8000/api/todo/${id}/`,task).then(res=>{
            setData(data.map((prv)=>prv.id==id ? res.data : prv))
        }).catch(error =>console.log(error.message)
        )
    }

    const Delete_dtls =(id) =>{
        axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`).then(res=>{
            setData(data.filter((task)=>task.id!=id))
        }).catch(error=>console.log(error.message))
    }
    
    
    return(
        <div className="container">
            <h1>Display Details</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((value,index)=>(
                    <tr key={index}>
                        <td>{value.task}</td>
                        <td>{value.description}</td> 
                        <td><button className="btn btn-outline-info" onClick={()=>{Edit_dtls(value)}}>Edit</button></td>
                        <td><button className="btn btn-outline-danger" onClick={()=>{Delete_dtls(value.id)}}>Delete</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
            {editing ? <EditForm curTask={editdata} updatefun={updateDtls} />:null}
        </div>
    )
}
const EditForm =({curTask})=>{
    const [task,setTask] = useState(curTask)
    const handleChange = (e)=>{
        const {name,value}=e.target
       setTask({...task,[name]:value})  
    }
      const handleSubmit = (e)=>{
        e.preventDefault()
        updatefun(task.id,task)
    }
    return(
        <form onSubmit={handleSubmit}>
            <input type="text" name="task" id="titile" value={task.task}  onChange={handleChange}/>
            <input type="text" name="description" id="description" value={task.description} onChange={handleChange}/>
            <input type="submit" value="Update" />
        </form>
    )
}

export default List

