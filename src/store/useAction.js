
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { addboard,addtask,editboard,edittask,delboard,deltask,changestatus } from "./Action";

export const useAction=()=>{
    const dispatch=useDispatch()
    return bindActionCreators({addboard,addtask,editboard,edittask,delboard,deltask,changestatus},dispatch)
}