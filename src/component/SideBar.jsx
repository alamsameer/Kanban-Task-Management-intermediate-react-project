import { useContext, useState } from "react"
import TaskContext from "../context/Task"
import ThemeContext from "../context/Theme"
import "../css/sidebar.css"
import Board from "./Board"
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import {HiOutlineLightBulb} from 'react-icons/hi'
import {MdOutlineNightlight} from 'react-icons/md'
import TaskOperationContext from "../context/TaskOperation"
 
function SideBar() {
  const { state, dispatch } = useContext(TaskContext)
  const {openAddBoardModal}=useContext(TaskOperationContext)
  // const [isToggle, setToggle] =  useContext(TaskContext)
  const { theme, setTheme ,isToggle, setToggle} = useContext(ThemeContext)
  const ParentclassName = "sidebar "+ ` ${isToggle ? "sidebar-toggle" : "up"} `
  const sidebarBoardClass = "sidebar-boards "  + `${theme === "dark" ? "dark" : "light"}`
  // console.log("state in sidebar", state);
  const togglerSideclass = "theme-toggler " + `${theme === "dark" ? "right" : "left"}`
  const themeChangerClass = "theme-changer theme-changer-" + `${theme === "dark" ? "dark" : "light"}`
  const sidebarcontrol=isToggle?"sidebar-control up":"sidebar-control down"
  const changeTheme = () => {
    if (theme == "light") {
      setTheme("dark")
    }
    else { setTheme("light") }
  }

  return (
    <div className={ParentclassName}>
 
      <div className={sidebarBoardClass} >
        <article>
          {
            state.map((data,i) => {
              const { title } = data
              // console.log(title);
              return <Board key={i} boardIndex={i} title={title} />
            })
          }
          <div className="sidebar-board" onClick={()=>{openAddBoardModal()}}> + Add Board</div>
        </article>
        <footer className="sidebar-footer">
          <div className={themeChangerClass}>

              <span style={{position:"absolute",left:"20%"}}><HiOutlineLightBulb/></span>
            <button onClick={changeTheme}>
              <span className={togglerSideclass}></span>
            </button>
              <span style={{position:"absolute",right:"20%"}}><MdOutlineNightlight/></span>
            <i></i>
          </div>
          <button className="sidebar-hide" onClick={() => setToggle(!isToggle)} > <AiOutlineEyeInvisible/> hide sidebar</button>
        </footer>
      </div>
      <button className={sidebarcontrol} onClick={() => {
        // console.log("i am clicked toggler");
        setToggle(!isToggle)}}><AiOutlineEye /></button>
        {/* insert add board modal here  */}
    </div>
  )
} 

export default SideBar