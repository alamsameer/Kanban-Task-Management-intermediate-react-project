### Different modal content while clicking on different component

```js
//  parent Component
import React, { useState } from 'react';
import Modal from './Modal';

function ParentComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);
  
  function openAddTaskModal() {
    setModalMode('add');
    setIsModalOpen(true);
  }
  
  function openEditTaskModal(task) {
    setTaskToEdit(task);
    setModalMode('edit');
    setIsModalOpen(true);
  }
  
  function closeModal() {
    setIsModalOpen(false);
    setModalMode(null);
    setTaskToEdit(null);
  }
  
  return (
    <div>
      <button onClick={openAddTaskModal}>Add Task</button>
      {tasks.map(task => (
        <div key={task.id}>
          <p>{task.title}</p>
          <button onClick={() => openEditTaskModal(task)}>Edit Task</button>
        </div>
      ))}
      <Modal isOpen={isModalOpen} mode={modalMode} task={taskToEdit} closeModal={closeModal} />
    </div>
  );
}

export default ParentComponent;

```

### forms in React 

```js
import React, { useState } from 'react'

function Addtask() {
  const [inputs,setInputs]=useState({})
  const [subtasks,setSubTask]=useState(new Array(2).fill(""))
  console.log(subtasks);
  const handleInputs=(event)=>{
    const name=event.target.name
    const value=event.target.value
    setInputs(values=>({...values,[name]:value}))
  }
  const AddSubTask=()=>{
    setSubTask([...subtasks,''])
  }
  const removeSubTask=(index)=>{
    const newsubtask =subtasks.filter((subtask,i)=>{
      return i != index
    })
    setSubTask(newsubtask)
    }
    const handleSubtask=(event,index)=>{
      const newSubtask=[...subtasks]
      newSubtask[index]=event.target.value
      setSubTask(newSubtask)
    }
    console.log(inputs);
  return (
    <form>
      <label htmlFor="title">Title
        <input type="text" id='title' name='title' value={inputs.title || ""} onChange={handleInputs} />
      </label>
      <label htmlFor="description">
        Description
        <textarea name="description" id="description" cols="30" rows="10" value={inputs.description || ""}  onChange={handleInputs}/>
      </label>
      <label htmlFor="subtask">
        {
          subtasks.map((subtask,i)=>{
            return <SubTask key={i} subtask={subtask} i={i} handleSubtask={handleSubtask} removeSubTask={removeSubTask}/>
          })
        }
      </label>
      <button onClick={(e)=>{
        e.preventDefault();
        AddSubTask()}}>
        + Add Subtask
      </button>
    </form>
  )
}
function SubTask({subtask,i,handleSubtask,removeSubTask}){
   return <>
  <input  type="text" name="subtask" id="subtask" value={subtask} onChange={(e)=>{handleSubtask(e,i)}}/>
  <button  onClick={(e)=>{
    e.preventDefault();
    removeSubTask(i)}}>remove subtask</button>
  </>
}
export default Addtask
```

### Targeting first Child 

Select and style every <p> element that is the first child of its parent:

```css
p:first-child {
  background-color: yellow;
}
```


## problem aroused 

> ### Immutable Updating Columns

i am intialising the state of input as

 ```js

{title:"",columns:new Array(5).fill({})}
``` 

onchange event i am changing the state column item with their index as 


 ```js

newColumn[i].title = value
``` 

but in this case it change all the 5 item of column, why is to so  how can i improve

> solution 

The reason that all the items in the columns array are being changed when you update one of them is because JavaScript objects are passed by reference, rather than by value. This means that when you create a new array with new Array(5).fill({}), you are actually creating an array of references to the same object. So when you update the title property of one of the objects, it updates the same property on all of the other objects in the array.

One way to solve this issue is to create a new object with the updated properties for each item in the columns array, rather than modifying the existing object. You can use the map method to create a new array of objects with the updated properties.

### immutability issue inthe object this time
```js
col.tasks.push(action.payload);
 return {..col}
```
The issue is that the return {...col} is returning the same reference of the col object, so the new task that is being pushed is still being referenced by the previous state, and that's why the task is added twice.
### when i reassigned to columns then tha task in it get doubled 
```js
 console.log(col);
      let newshowState = [...state]
      newshowState[showIndex].columns=col
```
When you use the spread operator ... to create a new array, it creates a new array with the same references of the old objects.
So when you modify the col object, you're also modifying the object that's being referenced by the columns array in the state.
### solution
```js
let newshowState = state.map((state,i) => {
        if (i !== showIndex) {
          return state;
        }
        return {
          ...state,
          columns: col.map((col) => ({ ...col }))
        };
      });
```

```js
const newColumns = columns.map((col, i) => {
    if (i === index) {
        return { ...col, title: value };
    } else {
        return col;
    }
});

```

### how would i know which column has changed or the only one has changed 
You can use the map method to iterate through the columns array, compare the values of each column with the new values and return a new array with the changed columns.

For example, let's say that you have an initial state of columns and an updated state of newColumns:

```js
const changedColumns = newColumns.map((newColumn, index) => {
    if (JSON.stringify(newColumn) !== JSON.stringify(columns[index])) {
        return newColumn;
    }
}).filter(col => col !== undefined);


```

This will create a new array changedColumns that contains only the columns that have changed.

> The use of JSON.stringify is to compare the two objects, it will convert the object to a string and compare the string of initial and updated state. 

Alternatively, you can compare each property of the column using a loop or using other library's like "lodash" that has a function called isEqual to compare the two objects.

This way you can know which columns have been changed, and you can perform any action you want with them.