// board actions
export const ADDBOARD='addboard'
export const DELETEBOARD='deleteboard'
export const EDITBOARD='editboard'

// board action creator 

export const addboard=(board)=>({type:ADDBOARD,payload:board})
export const editboard=(i,board)=>({type:EDITBOARD,index:i,payload:board})
export const delboard=(i)=>({type:DELETEBOARD,index:i})

// task actions
export const ADDTASK='addtask'
export const DELETETASK='deletetask'
export const EDITTASK='edittask'

// task action creator 
export const  addtask=(i,task)=>({type:ADDTASK,index:i,payload:task})
export const edittask=()=>({type:EDITTASK})
export const deltask=(i,task)=>({type:DELETETASK,index:i,payload:task})

// status action
export const CHANGESTATUS='changestatus'
// status action creator 
export const changestatus=(currIndex,status,task)=>({type:CHANGESTATUS,index:currIndex,prevStatus:status,payload:task})

