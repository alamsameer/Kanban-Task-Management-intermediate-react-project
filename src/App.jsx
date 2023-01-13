import { useState, useReducer } from 'react'
import './App.css'
import data from "./assets/Data.json"
import Body from "./component/Body"
import Header from './component/Header'
import SideBar from './component/SideBar'
import TaskTheme from './context/Task'
import ThemeContext from './context/Theme'
import TaskOperationContext from './context/TaskOperation'
import Modal from './component/Modal'
const reducer = (state, action) => {
  switch (action.type) {
    case "addboard":
      console.log(" ihave added one more booard");
      console.log(action.type, action.payload);
      let newStateb=[...state,action.payload]
      return newStateb
    case "addtask":
      let index = action.index
      let newcolumns = state[index].columns.map((col) => {
        if (col.title === action.payload.status) {
          // console.log("i am task ",...col.tasks);
          let newTask=[...col.tasks,action.payload]
            // console.log("i am newtask ",...newTask);
            return {...col,tasks:newTask}
        }
        return col
      })
      // ***** what cause the array to be added two times *************
      // console.log(columns);
      // const newState = [...state]
      // console.log(newState);
      // newState[index].columns=newcolumns
      // console.log( newState[index])
      // console.log( newState[index].columns);
      // console.log(newState);

      const modifiedState=state.map((board,i)=>{
        if (i==index){
          let newBoard={...board,columns:newcolumns}
          return newBoard
        }
        return board
      })
      return modifiedState
    case "edittask":
      console.log(" iam editing as task");
      console.log(...state);
      return state
    case "deletetask":
      console.log("i hae deleted the task ")
      console.log(...state);
      let delindex = action.index
      let deletedcolumns = state[delindex].columns.map((col) => {
        console.log(col.title,action.payload.status,col.title === action.payload.status);
        if (col.title === action.payload.status) {
          // console.log("i am task ",...col.tasks);
          let newTask=col.tasks.filter((task)=>{
            console.log(task.title != action.payload.title);
            return task.title != action.payload.title
          })

            console.log("i am newtask ",...newTask);
            return {...col,tasks:newTask}
        }
        return col
      })
      const newState = [...state]
      newState[delindex].columns=deletedcolumns 
      return newState
    case "editboard":
      let id=action.index
      console.log(id,action.payload);
      let State=state.map((board,i)=>{
        if(i === id){
          return action.payload
        }
        return board
      })
      return State
    case "deleteboard":
      let ind=action.index
      return state.filter((board,i)=>i!=ind)
    default:
      return state
  }
}
const init = () => {
  return data.boards
}

function App() {
  const [state, dispatch] = useReducer(reducer, null, init)
  const [theme, setTheme] = useState('light');
  const [activeIndex, setActiveIndex] = useState(1)
  const [isToggle, setToggle] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mode, setMode] = useState(null)
  const [taskToEdit, setTaskToEdit] = useState(null)
  const [taskToShow, setTaskToShow] = useState(null)
  const [boardToEdit, setBoardToEdit] = useState(null)
  // console.log("inside json", state);

  //  for adding task to the list 
  function openAddTaskModal() {
    console.log("i add task clicked");
    setIsModalOpen(true)
    setMode("add")
  }
  //  for editing the task 
  function openEditTaskModal(task) {
    setIsModalOpen(true)
    setMode("edit")
    setTaskToEdit(task)
  }
  function openAddBoardModal() {
    setIsModalOpen(true)
    setMode("addboard")
  }
  function openShowTaskModal(task) {
    setIsModalOpen(true)
    setMode("showtask")
    setTaskToShow(task)
  }
  function openEditBoard(board){
    setIsModalOpen(true)
    setMode("editboard")
    setBoardToEdit(board)

  }
  function closeModal() {
    setIsModalOpen(false)
    setMode(null)
    setTaskToEdit(null)
  }
  console.log(isModalOpen, mode);
  return (
    <TaskOperationContext.Provider value={{ openAddTaskModal, openEditTaskModal, openAddBoardModal, openShowTaskModal,openEditBoard, closeModal }}>
      <TaskTheme.Provider value={{ state, dispatch, setActiveIndex, activeIndex }} >
        <ThemeContext.Provider value={{ theme, setTheme, isToggle, setToggle }}>
          <div className="App">
            <nav>
              <Header index={activeIndex} />
            </nav>
            <main>
              <SideBar />
              <Body />
            </main>
            <Modal isModalOpen={isModalOpen} mode={mode}boardToEdit={boardToEdit} taskToEdit={taskToEdit} closeModal={closeModal} taskToShow={taskToShow} />
          </div>
        </ThemeContext.Provider>
      </TaskTheme.Provider>
    </TaskOperationContext.Provider>
  )
}

export default App
