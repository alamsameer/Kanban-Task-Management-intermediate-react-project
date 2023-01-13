import  { useState ,useContext} from 'react'
import TaskContex from '../../context/Task'
import ThemeContext from '../../context/Theme'
function EditTask({item}) {
   const{state,activeIndex}=useContext(TaskContex)
  const{theme}=useContext(ThemeContext)
 
  const bodycolumns=state[activeIndex].columns
  const [inputs,setInputs]=useState(item)
  const [subtasks,setSubTask]=useState(item.subtasks)
  console.log(item);
  const handleInputs=(event)=>{
    const name=event.target.name
    const value=event.target.value
    setInputs(values=>({...values,[name]:value}))
  }
  const AddSubTask=()=>{
    setSubTask([...subtasks,''])
  } 
  const removeSubTask=(index)=>{
    const newsubtask =subtasks.filter((subtask,i)=>{
      return i != index
    })
    setSubTask(newsubtask)
    }
    const handleSubtask=(event,index)=>{
      const newSubtask=[...subtasks]
      newSubtask[index]=event.target.value
      setSubTask(newSubtask)
    }
    const handleSubmit=(e)=>{
      e.preventDefault();
      setInputs(values=>({...values,subtasks}))
      closeModal()
    }
    // console.log(inputs);
    const formClass='form '+theme
    const btnClass='btn text-'+theme
  return (
    <form onSubmit={handleSubmit}  className={formClass}>
      <label htmlFor="title" ><span className='label-block'>Title</span>
        <input type="text" id='title'className={theme} name='title' value={inputs.title || ""} onChange={handleInputs} />
      </label>
      <label htmlFor="description">
      <span className='label-block'>Description</span>
        <textarea name="description" className={theme}  id="description" cols="30" rows="10" value={inputs.description || ""}  onChange={handleInputs}/>
      </label>
      <label htmlFor="subtask">
        {
          subtasks.map((subtask,i)=>{
            return <SubTask key={i} subtask={subtask} i={i} handleSubtask={handleSubtask} removeSubTask={removeSubTask}/>
          })
        } 
      </label>
      <button className={btnClass} onClick={(e)=>{
        e.preventDefault();
        AddSubTask()}}>
        + Add Subtask
      </button>
      <select name='status' id='status'className={theme} value={inputs.status} onChange={handleInputs}>
      {bodycolumns.map(option => (
        <option key={option.title} value={option.title}>{option.title}</option>
      ))}
    </select>
    <button type="submit" className={btnClass}>Save Changes</button>
    </form>
  )
}
function SubTask({subtask,i,handleSubtask,removeSubTask}){
  const { theme } = useContext(ThemeContext)
   return <>
  
  <input  type="text" className={theme} name="subtask" id="subtask" value={subtask.title} onChange={(e)=>{handleSubtask(e,i)}}/>
  <button className='rm-btn ' onClick={(e) => {
      e.preventDefault();
      removeSubTask(i)
    }}>&times;</button>
  </>
}

export default EditTask