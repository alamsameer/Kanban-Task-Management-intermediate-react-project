import data from '../assets/Data.json'

const initialState=data


export const reducer = (state=initialState, action) => {
    switch (action.type) {
      case "addboard":
        let newStateb = [...state, action.payload]
        return newStateb
      case "addtask":
        let index = action.index
        let newcolumns = state[index].columns.map((col) => {
          if (col.title === action.payload.status) {
            let newTask = [...col.tasks, action.payload]
            return { ...col, tasks: newTask }
          }
          return col
        })
        const modifiedState = state.map((board, i) => {
          if (i == index) {
            let newBoard = { ...board, columns: newcolumns }
            return newBoard
          }
          return board
        })
        return modifiedState
      case "edittask":
        return state
      case "deletetask":
        let delindex = action.index
        let deletedcolumns = state[delindex].columns.map((col) => {
          if (col.title === action.payload.status) {
            let newTask = col.tasks.filter((task) => {
              return task.title != action.payload.title
            })
            return { ...col, tasks: newTask }
          }
          return col
        })
        const newState = [...state]
        newState[delindex].columns = deletedcolumns
        return newState
      case "editboard":
        let id = action.index
        let State = state.map((board, i) => {
          if (i === id) {
            return action.payload
          }
          return board
        })
        return State
      case "deleteboard":
        let ind = action.index
        return state.filter((board, i) => i != ind)
      case "changestatus":
        let showIndex = action.index
        const colIndex = state[showIndex].columns.findIndex(column => column.title == action.prevStatus)
        const taskIndex = state[showIndex].columns[colIndex].tasks.findIndex(task => task.title == action.payload.title)
        state[showIndex].columns[colIndex].tasks[taskIndex] = action.payload
        let col = state[showIndex].columns.map((col) => {
          if (col.title === action.prevStatus) {
            let newtask = col.tasks.filter(task => task.status != action.payload.status)
            return { ...col, tasks: newtask }
          }
          if (col.title == action.payload.status) {
            let newCol = { ...col };
            newCol.tasks = [...col.tasks, action.payload];
            return newCol;
          }
          return col
        })
        let newshowState = state.map((state,i) => {
          if (i !== showIndex) {
            return state;
          }
          return {
            ...state,
            columns: col.map((col) => ({ ...col }))
          };
        });
        console.log(newshowState);
        return newshowState
      default:
        return state
    }
  }