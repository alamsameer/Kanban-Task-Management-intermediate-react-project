import { useState, useEffect } from 'react'
import store from './store/store'
import './App.css'
// import data from "./assets/Data.json"
import Body from "./component/Body"
import Header from './component/Header'
import SideBar from './component/SideBar'
import TaskTheme from './context/Task'
import ThemeContext from './context/Theme'
import TaskOperationContext from './context/TaskOperation'
import Modal from './component/Modal'
import { useSelector } from 'react-redux'
import { Provider } from 'react'

function App() {
  // const [state, dispatch] = useReducer(reducer, null, init)
  const [theme, setTheme] = useState('light');
  const [activeIndex, setActiveIndex] = useState(0)
  const [isToggle, setToggle] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mode, setMode] = useState(null)
  const [taskToEdit, setTaskToEdit] = useState(null)
  const [taskToShow, setTaskToShow] = useState(null)
  const [boardToEdit, setBoardToEdit] = useState(null)
  // let lenState = state.length
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
    <TaskTheme.Provider value={{  setActiveIndex, activeIndex }} >
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
