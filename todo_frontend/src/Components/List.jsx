import { useEffect, useState } from "react"
import axios from 'axios'
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
                        <td><button className="btn btn-outline-danger" onClick={()=>{}}>Delete</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
            {editing ? <EditForm curTask={editdata}/>:null}
        </div>
    )
}
const EditForm =({curTask})=>{
    const [task,setTask] = useState(curTask)
    return(
        <form>
            <input type="text" name="title" id="title" value={task.task} />
            <input type="text" name="description" id="description" value={task.description}/>
            <input type="submit" value="Update" />
        </form>
    )
}

export default List

