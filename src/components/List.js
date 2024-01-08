import React from 'react'

export default function List({id, title, completed, todoData, setTodoData, provided, snapshot}) {



const handleCompleteChange = (id) => {
  const newTodoData = todoData.map((data) => {
    if(data.id === id) {
      data.completed = !data.completed;
    }
    return data;
  });
  setTodoData(newTodoData)
}



const handleClick = (id) => {
  const newTodoData = todoData.filter(data => data.id !== id);
  setTodoData(newTodoData)
}

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
            <button className='px-4 py-2' onClick={() => handleClick(id)}>x</button>
            </div>     
          </div>
  )
}
