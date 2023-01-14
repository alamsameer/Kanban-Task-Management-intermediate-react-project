import { useContext } from 'react'
import Board from '../Board'
import TaskContext from '../../context/Task'
import ThemeContext from '../../context/Theme'
import TaskOperationContext from '../../context/TaskOperation'
function SidebarModal({setSidebarModal}) {
    const { state } = useContext(TaskContext)
    const { theme, setTheme } = useContext(ThemeContext)
    const {openAddBoardModal}=useContext(TaskOperationContext)
    const modalSidebarClass="modal-sidebar "+theme

    const togglerSideclass = "theme-toggler " + `${theme === "dark" ? "right" : "left"}`
    const themeChangerClass = "theme-changer theme-changer-" + `${theme === "dark" ? "dark" : "light"}`
    const changeTheme = () => {
        if (theme == "light") {
          setTheme("dark")
        }
        else { setTheme("light") }
      }
    return (
    <div className={modalSidebarClass} >
        <article>
          {
            state.map((data,i) => {
              const { title } = data
              return <Board key={i} boardIndex={i} title={title} setSidebarModal={setSidebarModal} />
            })
          }
          <div className="modal-sidebar-btn" onClick={()=>{
            setSidebarModal(false)
            openAddBoardModal()}}> + Add Board</div>
        </article>
        <footer className="modal-sidebar-footer">
          <div className={themeChangerClass} style={{position:"relative"}}>

            <button onClick={changeTheme}>

              <span className={togglerSideclass}></span>
            </button>
            <i></i>
          </div>
        </footer>
      </div>
  )
}

export default SidebarModal