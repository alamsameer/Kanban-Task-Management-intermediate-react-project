import { useContext, useState } from "react"
import TaskContex from "../context/Task"
import TaskOperationContext from "../context/TaskOperation"
import ThemeContext from "../context/Theme"

function Task({ item }) {
  const [isModal, setModal] = useState(false)
  const { activeIndex } = useContext(TaskContex)
  const {openShowTaskModal}=useContext(TaskOperationContext)
  const{theme}=useContext(ThemeContext)
  const taskclass="task "+theme
  return (
    <div className={taskclass}>
      <div className="task-title" onClick={()=>{openShowTaskModal(item)}}>
        {item.title}
      </div>
      {/* insert a modal for edit task */}
    </div>
  )
}

export default Task