import { useState, useContext } from 'react'
import { useSelector } from 'react-redux'
import TaskContex from '../../context/Task'
import ThemeContext from '../../context/Theme'
import { useAction } from '../../store/useAction'
import uuid from 'react-uuid'

function Addtask({ closeModal }) {
  const { activeIndex, dispatch } = useContext(TaskContex)
  const { theme } = useContext(ThemeContext)
  const state = useSelector(state => state)
  const bodycolumns = state[activeIndex].columns
  const [inputs, setInputs] = useState({id:uuid(), status: "To Do", subtasks: new Array(2).fill({ title: "", isCompleted: false }) })
  // const [subtasks, setSubTask] = useState(new Array(2).fill(""))
  const { addtask } = useAction()
  const handleInputs = (event, i = null) => {
    const name = event.target.name
    const value = event.target.value
    console.log(name, value);
    if (name === "subtask") {
      const newSubtask = inputs.subtasks.map((subtask, idx) => {
        if (i === idx) {
          return { ...subtask, title: value }
        }
        return subtask
      })
      setInputs(values => ({ ...values, subtasks: newSubtask }))
    }
    else {
      setInputs(values => ({ ...values, [name]: value }))
    }

  }
  const AddSubTask = () => {
    const newSubtask = [...inputs.subtasks, '']
    setInputs((values) => ({ ...values, subtasks: newSubtask }))
  }
  const removeSubTask = (index) => {
    const newSubtask = inputs.subtasks.filter((subtask, i) => {
      return i != index
    })
    setInputs((values) => ({ ...values, subtasks: newSubtask }))
  }
  // const handleSubtask = (event, index) => {
  //   const newSubtask = [...subtasks]
  //   newSubtask[index] = event.target.value
  //   setSubTask(newSubtask)
  // }
  const handleSubmit = (e) => {
    e.preventDefault();
    addtask(activeIndex, inputs)
    closeModal()
  }
  // console.log(inputs);
  const formClass = 'form ' + theme
  const btnClass = 'btn text-' + theme
  return (
    <form onSubmit={handleSubmit} className={formClass}>
      <label htmlFor="title" ><span className='label-block'>Title</span>
        <input type="text" id='title' className={theme} name='title' value={inputs.title || ""} onChange={handleInputs} placeholder='Type your task title' />
      </label>
      <label htmlFor="description">
        <span className='label-block'>Description</span>
        <textarea name="description" className={theme} id="description" cols="30" rows="10" value={inputs.description || ""} onChange={handleInputs} />
      </label>
      <div >
        {
          inputs.subtasks.map((subtask, i) => {
            return <SubTask key={i} subtask={subtask} i={i} inputs={inputs} handleInputs={handleInputs} removeSubTask={removeSubTask} />
          })
        }
      </div>
      <button className={btnClass} onClick={(e) => {
        e.preventDefault();
        AddSubTask()
      }}>
        + Add Subtask
      </button>
      <select name='status' id='status' className={theme} value={inputs.status} onChange={handleInputs}>
        <option disabled selected defaultValue={"-- select an option --"} > -- select an option -- </option>
        {bodycolumns.map(option => (
          <option key={option.title} value={option.title}>{option.title}</option>
        ))}
      </select>
      <button type="submit" className={btnClass}>Submit</button>
    </form>
  )
}
function SubTask({ subtask, i, handleInputs, inputs, removeSubTask }) {
  const { theme } = useContext(ThemeContext)
  console.log(subtask);
  return <>
    <label htmlFor={"subtask" + i}>
      <input type="text" name="subtask" id="subtask" className={theme} value={subtask.title} onChange={(e) => { handleInputs(e, i) }} placeholder="Add subtask" />
    </label>
    <button className='rm-btn ' onClick={(e) => {
      e.preventDefault();
      removeSubTask(i)
    }}>&times;</button>
  </>
}
export default Addtask