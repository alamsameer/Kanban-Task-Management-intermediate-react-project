import { useContext } from "react"
import "../css/board.css"
import TaskContex from "../context/Task"
import ThemeContext from '../context/Theme'
import {MdOutlineDashboard} from 'react-icons/md'
function Board(props) {
  const { theme, setTheme } = useContext(ThemeContext)
  const {state,setActiveIndex,activeIndex }=useContext(TaskContex)
    const currentActive=()=>{
      setActiveIndex(props.boardIndex)
      if(props.setSidebarModal){
        props.setSidebarModal(false)
      }
    }
    const boardClass='sidebar-board board-'+theme+` ${props.boardIndex==activeIndex?"active"+'-'+theme:""}`
  return (
    <div className={boardClass} onClick={currentActive} ><p><MdOutlineDashboard/></p><p>{props.title}</p></div>
  )
}

export default Board