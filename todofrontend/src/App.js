import './App.css';
import { useState,useEffect } from 'react';
import {postname,getname} from '../src/utility/fetch'
import Getelements from './Getelements'
function App() {
  const [value, setValue] = useState([]);
  let tasks="tasks"
  async function getTasks() {
    const response = await getname(`${process.env.REACT_APP_API_URL}/tasks`);
    setValue(response.data);
    //console.log(response);
  }
  useEffect(() => {
    // console.log(axios.get('http://localhost:3000/tasks'));
    getTasks();
  }, []);
  const[user,setUser]=useState("")
  const[task,setTask]=useState("")
  async function add()
  {
    const send={
      "username":user,
      "task":task
    }
   await postname('http://localhost:3000/ins',send).then((response)=>{
    console.log("success");
  
   }
   )
   await getTasks()
   setTask("")
   setUser("")
  }
  return (
    <div>
       <h1>Todo list APP</h1>
     <header class="c-header">
     <label>Username</label>
    <input type={Text}  value={user} onChange={(event)=>{setUser(event.target.value)}}></input>
    <label>Task</label>
    <input type={Text} value={task} onChange={(event)=>{setTask(event.target.value)}}></input>
    <button onClick={add}>Add</button>
      </header> 
    
    <div className='table'>
      <Getelements name={value} functon={getTasks}/>
    </div>
    </div>
  )
}

export default App;
