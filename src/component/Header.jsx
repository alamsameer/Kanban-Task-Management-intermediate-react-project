import { useContext, useEffect, useState } from "react"
import "../css/header.css"
import TaskContex from "../context/Task"
import logo from "../assets/logo-mobile.svg"
// import { BiDotsVertical } 
import {BiMessageSquareEdit} from "react-icons/bi"
import {AiOutlineDelete} from "react-icons/ai"
import {MdOutlineKeyboardArrowDown} from "react-icons/md"

import ThemeContext from "../context/Theme"
import SidebarModal from "./Modals/SidebarModal"
// import Addtask from "./Modals/AddTask"
import Modal from "./Modal"
import TaskOperationContext from "../context/TaskOperation"
function Header({ index }) {
  const { state, dispatch, activeIndex } = useContext(TaskContex)
  const { theme } = useContext(ThemeContext)
  const {openAddTaskModal,openEditBoard}=useContext(TaskOperationContext)
  const [isSidebarmodal,setSidebarModal]=useState(false)
  const title=state[activeIndex].title
  console.log(activeIndex);
  // console.log(state[activeIndex]);
  // const title = state[activeIndex].title
  
  const headerclass = "header " + `${theme}`

  return (
    <div className={headerclass}>
      <header className="header-logo">
        <img src={logo} alt="logo" style={{marginRight:"5px"}} />
        <span>Kanban</span>
      </header> 
      {isSidebarmodal ?<SidebarModal setSidebarModal={setSidebarModal} />:''}
      <div className="header-title">{title} <button className="header-gt" onClick={()=>{setSidebarModal(true)}}><MdOutlineKeyboardArrowDown/></button></div>
      <div className="header-edit">
        <button className="add-task "  onClick={()=>{
          
          openAddTaskModal()}}>Add task</button>

        <button className=" btn edit" onClick={()=>{
          openEditBoard(state[activeIndex])}}><BiMessageSquareEdit/></button>
        <button className=" btn delete" onClick={()=>{
          dispatch({type:"deleteboard",index:activeIndex})
          }}><AiOutlineDelete/></button>
      </div>
      {/* insert add  task modal here  */}
    </div>
  )
}

export default Header