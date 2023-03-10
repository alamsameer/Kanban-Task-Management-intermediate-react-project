import { useState, useReducer, useEffect } from 'react'
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
      let newStateb = [...state, action.payload]
      return newStateb
    case "addtask":
      let index = action.index
      let newcolumns = state[index].columns.map((col) => {
        if (col.title === action.payload.status) {
          let newTask = [...col.tasks, action.payload]
          return { ...col, tasks: newTask }
        }
        return col
      })
      const modifiedState = state.map((board, i) => {
        if (i == index) {
          let newBoard = { ...board, columns: newcolumns }
          return newBoard
        }
        return board
      })
      return modifiedState
    case "edittask":
      return state
    case "deletetask":
      let delindex = action.index
      let deletedcolumns = state[delindex].columns.map((col) => {
        if (col.title === action.payload.status) {
          let newTask = col.tasks.filter((task) => {
            return task.title != action.payload.title
          })
          return { ...col, tasks: newTask }
        }
        return col
      })
      const newState = [...state]
      newState[delindex].columns = deletedcolumns
      return newState
    case "editboard":
      let id = action.index
      let State = state.map((board, i) => {
        if (i === id) {
          return action.payload
        }
        return board
      })
      return State
    case "deleteboard":
      let ind = action.index
      return state.filter((board, i) => i != ind)
    case "changestatus":
      let showIndex = action.index
      const colIndex = state[showIndex].columns.findIndex(column => column.title == action.prevStatus)
      const taskIndex = state[showIndex].columns[colIndex].tasks.findIndex(task => task.title == action.payload.title)
      state[showIndex].columns[colIndex].tasks[taskIndex] = action.payload
      let col = state[showIndex].columns.map((col) => {
        if (col.title === action.prevStatus) {
          let newtask = col.tasks.filter(task => task.status != action.payload.status)
          return { ...col, tasks: newtask }
        }
        if (col.title == action.payload.status) {
          let newCol = { ...col };
          newCol.tasks = [...col.tasks, action.payload];
          return newCol;
        }
        return col
      })
      let newshowState = state.map((state,i) => {
        if (i !== showIndex) {
          return state;
        }
        return {
          ...state,
          columns: col.map((col) => ({ ...col }))
        };
      });
      console.log(newshowState);
      return newshowState
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
  const [activeIndex, setActiveIndex] = useState(0)
  const [isToggle, setToggle] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mode, setMode] = useState(null)
  const [taskToEdit, setTaskToEdit] = useState(null)
  const [taskToShow, setTaskToShow] = useState(null)
  const [boardToEdit, setBoardToEdit] = useState(null)
  let lenState = state.length
  //  for adding task to the list 
  function openAddTaskModal() {
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
  function openEditBoard(board) {
    setIsModalOpen(true)
    setMode("editboard")
    setBoardToEdit(board)

  }
  function closeModal() {
    setIsModalOpen(false)
    setMode(null)
    setTaskToEdit(null)
  }
  useEffect(() => {
    // setActiveIndex(0)
  }, [])
  return (
    <TaskOperationContext.Provider value={{ openAddTaskModal, openEditTaskModal, openAddBoardModal, openShowTaskModal, openEditBoard, closeModal }}>
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
            <Modal isModalOpen={isModalOpen} mode={mode} boardToEdit={boardToEdit} taskToEdit={taskToEdit} closeModal={closeModal} taskToShow={taskToShow} />
          </div>
        </ThemeContext.Provider>
      </TaskTheme.Provider>
    </TaskOperationContext.Provider>
  )
}

export default App
