import { useContext } from 'react'
import TaskContex from '../context/Task'
import ThemeContext from '../context/Theme'
import Task from './Task'

function Column({ data }) {
    const { state, activeIndex } = useContext(TaskContex)
    const { theme } = useContext(ThemeContext)
    const title = data.title
    const tasks= data.tasks
    const headerclass='column-header '+theme
    return (
        <div className='column-container'>
            <header className={headerclass}>{title}</header>
            {
                tasks&&tasks.map((item,i)=>{

                    return <Task key={i} item={item}/>
                })
            }
        </div>
    )
}

export default Column