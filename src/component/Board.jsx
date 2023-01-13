import { useContext } from "react"
import "../css/board.css"
import TaskContex from "../context/Task"
import ThemeContext from '../context/Theme'
function Board(props) {
  const { theme, setTheme } = useContext(ThemeContext)
  const {state,setActiveIndex,activeIndex }=useContext(TaskContex)
  // console.log(boardIndex);
    const currentActive=()=>{
      setActiveIndex(props.boardIndex)
      if(props.setSidebarModal){
        props.setSidebarModal(false)
      }
    }
    const boardClass='sidebar-board board-'+theme+` ${props.boardIndex==activeIndex?"active"+'-'+theme:""}`
  return (
    <div className={boardClass} onClick={currentActive} >{props.title}</div>
  )
}

export default Board