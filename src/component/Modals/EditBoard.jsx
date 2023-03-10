import { useState, useContext } from 'react'
import TaskContex from '../../context/Task'
import TaskOperationContext from '../../context/TaskOperation'
import ThemeContext from '../../context/Theme'
// import TaskTheme
function EditBoard({board}) {
  const { theme } = useContext(ThemeContext)
  const {activeIndex}=useContext(TaskContex)
  const {closeModal}=useContext(TaskOperationContext)
  const [inputs,setInputs]=useState(board)
 const {dispatch}=useContext(TaskContex)
  const handleInputs=(event,i=null)=>{
    const name =event.target.name
    const value=event.target.value
    if(name ==="column"){
      const newColumn =inputs.columns.map((col,idx)=>{
        if (idx === i){

          return {...col,title:value}
        }
        return col
      })
      // newColumn[i].title = value
      setInputs(values=>({...values,columns:newColumn}))
    }
    else{
      setInputs(values=>({...values,[name]:value}))
    }

  }
  const AddColumns = () => {
    const newColumns=[...inputs.columns,{tasks:[]}]
    setInputs((values)=>({...values,columns:newColumns}))
  }
  const removeColumns = (index) => {
    const newColumns = inputs.columns.filter((subtask, i) => {
      return i != index
    })
    setInputs((values)=>({...values,columns:newColumns}))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({type:"editboard",index:activeIndex,payload:inputs})
    closeModal()
  }
  const btnClass='btn text-'+theme
  const formClass='form '+theme
  return (
    <form onSubmit={handleSubmit} className={formClass}>
      <h2>Add New Board</h2>
      <label htmlFor="title">
        <input type="text" name='title' className={theme} value={inputs.title} onChange={handleInputs} />
      </label>
      <div >
        <p>Board Columns</p>
        {
          inputs.columns&&inputs.columns.map(( column, i) => {
            return < Columns key={i}  column={ column} i={i} handleInputs={handleInputs} removeColumns={removeColumns} />
          })
        }
      </div>
      <button className={btnClass} onClick={(e) => {
        e.preventDefault();
        AddColumns()
      }}>
        + Add New Columns
      </button>
      <button className={btnClass}>
        Save Changes
      </button>
    </form>
  )
}
function Columns({ column, i, handleInputs, removeColumns }) {
  const { theme } = useContext(ThemeContext)
  
  return <>
    <label htmlFor="column">
      <input type="text" name="column" id="column" className={theme} value={column.title} onChange={(e) => { handleInputs(e, i) }} placeholder="Add subtask" />
    </label>
    <button className='rm-btn ' onClick={(e) => {
      e.preventDefault();
      removeColumns(i)
    }}>&times;</button>
  </>
}
export default EditBoard