import { useContext, useEffect, useState } from 'react'
import "../css/taskbody.css"
import Column from "./Column"
import TaskContex from '../context/Task'
import ThemeContext from '../context/Theme'
import TaskOperationContext from '../context/TaskOperation'

function Body() {
  const { state, activeIndex } = useContext(TaskContex)
  const { theme } = useContext(ThemeContext)
  const { openEditBoard } = useContext(TaskOperationContext)

  const bodycolumns = activeIndex !== null ? state[activeIndex].columns : null

  const taskbodyclass = 'task-body taskbody-' + theme
  const newcolumnclass = "newcolumn newcolumn-" + theme
  return (
    <div className={taskbodyclass}>
      {
        bodycolumns && bodycolumns.map((data, i) => {
          return <Column key={i} data={data} />
        })
      }
      {
        activeIndex == null ? "" : <>

          <div className={newcolumnclass} onClick={() => {
            openEditBoard(state[activeIndex])
          }}>
            + New Column
          </div>
        </>
      }
    </div>
  )
}

export default Body