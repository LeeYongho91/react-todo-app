import React, { useState } from 'react'

const List =  React.memo(({id, title, completed, todoData, setTodoData, provided, snapshot, handleClick}) => {

  console.log(`List`);


const handleCompleteChange = (id) => {
  const newTodoData = todoData.map((data) => {
    if(data.id === id) {
      data.completed = !data.completed;
    }
    return data;
  });
  setTodoData(newTodoData)
}

  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(title)

  const handleEditChange = (e) => {
    setEditedTitle(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodoData = todoData.map(data => {
      if(data.id === id) {
        data.title = editedTitle
      }
      return data;
    })
    setTodoData(newTodoData);
    setIsEditing(false);
  }

  if(isEditing) {
    return (
      <div
        className={`flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`} 
      >
            <div className='items-center'>
              <form onSubmit={handleSubmit}>
              <input defaultChecked={completed} onChange={handleEditChange} value={editedTitle} className="w-full px-3 py-2 mr-4 text-gray-500 rounded" />
              </form>
            </div>
              <div className='items-center'>
              <button className='px-4 py-2 float-right' onClick={() => setEditedTitle(false)}>x</button>
              <button className='px-4 py-2 float-right' type="submit" onClick={handleSubmit}>save</button>
              </div>     
            </div>
    )
  } else {
    return (
      <div
        key={id}
        {...provided.draggableProps}
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        className={`${
          snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`} 
      >
            <div className='items-center'>
            <input type='checkbox' defaultChecked={false} onChange={() => handleCompleteChange(id)} className='mr-2' />
              <span className={completed ? "line-through" : undefined}>{title}</span>
            </div>
              <div className='items-center'>
              <button className='px-4 py-2 float-right' onClick={() => handleClick(id)}>x</button>
              <button className='px-4 py-2 float-right' onClick={() => setIsEditing(true)}>edit</button>
              </div>     
            </div>
    )
  }
})

export default List;
