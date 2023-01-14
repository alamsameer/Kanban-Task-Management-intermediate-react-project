import { useContext } from 'react'
import '../css/modal.css'
import ThemeContext from '../context/Theme'
import AddBoard from './Modals/AddBoard'
import Addtask from './Modals/AddTask'
import ShowTask from './Modals/ShowTask'
import EditTask from './Modals/EditTask'
import EditBoard from './Modals/EditBoard'
//  handle add task from  header - dispatch according to header add task  
//  handle onclick task list - dispatch according to onclick to task list 
function Modal(props) {
  const{theme}=useContext(ThemeContext)
  var block=props.isModalOpen ? "block":"none"
  const modalContentClass="modal-content "+theme
  return (
    <div>
      {
        props.isModalOpen && (
          <div className="modal" style={{display:block}}>
            <div className={ modalContentClass}>
              <span className="close" onClick={()=>{props.closeModal()}} >
                &times;
              </span>
              {props.mode === "add" && <Addtask closeModal={props.closeModal}/>}
              {props.mode === "edit" && <EditTask  item={props.taskToEdit}/>}
              {props.mode === "addboard"&& <AddBoard/>}
              {props.mode === "showtask" && <ShowTask item={props.taskToShow}/>}
              {props.mode === "editboard" && <EditBoard board={props.boardToEdit}/>}
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Modal