import "../../css/showsubtask.css"
import { useContext, useState } from 'react'
import TaskContex from '../../context/Task'
import ThemeContext from '../../context/Theme'
import TaskOperationContext from '../../context/TaskOperation'


function ShowTask({ item }) {
  const[subTasks,setSubTasks]=useState(item.subtasks)
  const [status,setStatus]=useState(item.status)
  const { state, activeIndex,dispatch } = useContext(TaskContex)
  const {openEditTaskModal,closeModal}=useContext(TaskOperationContext)
  const { theme } = useContext(ThemeContext)
  const bodycolumns = state[activeIndex].columns
  const showtaskClass="showtask-container "+theme
  function handlechange(e){
    let value=e.target.value 
    setStatus(value)
  }
  function handlesubtask(event,index){
    const newSubtasks = [...subTasks];
    newSubtasks[index].isCompleted = event.target.checked;
    setSubTasks(newSubtasks);
  }
  function deleteTask(item){
    dispatch({type:"deletetask", index:activeIndex,payload:item})
    closeModal()
  }
  return (
    <div className={showtaskClass}>
      <div className="showtask-header">
        <p>{item.title}</p>
        <div>
          <button className={theme} onClick={()=>{openEditTaskModal(item)}}>Edit</button>
          <button className={theme} onClick={()=>{deleteTask(item)}}>Delete</button>
        </div>
      </div>

      <ul className="subtask-items">
        <li className="field">SubTask</li>
        {
          subTasks && subTasks.map((subtask, i) => (
            <li key={i} style={{textDecoration:subtask.isCompleted?'line-through':'none'}}>
              <input type="checkbox" checked={subtask.isCompleted} onChange={e=>handlesubtask(e,i)} />
              {subtask.title}
            </li>
          ))
        }
      </ul>
      <div className="subtask-status">
        <p className="field">Status</p>
        <select className={theme} name='status' id='status' value={status} onChange={handlechange}>
          {bodycolumns.map(option => (
            <option key={option.title} value={option.title}>{option.title}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ShowTask