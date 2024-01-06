import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default function List({todoData, setTodoData}) {

  


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

const handleEnd = (result) => {
  if(!result.destination) return;
  const newTodoData = todoData;

  const [reorderedItem] = newTodoData.splice(result.source.index, 1);
  newTodoData.splice(result.destination.index, 0 ,reorderedItem)
  setTodoData(newTodoData);
}

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId='todo'>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((data, index) => (
            <Draggable index={index} key={data.id} draggableId={data.id.toString()}>
              {(provided, snapshot) => (
               <div
               key={data.id}
               {...provided.draggableProps}
               ref={provided.innerRef}
               {...provided.dragHandleProps}
               className={`${
                snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`} 
             >
                  <div className='items-center'>
                  <input type='checkbox' defaultChecked={false} onChange={() => handleCompleteChange(data.id)} className='mr-2' />
                    <span className={data.completed ? "line-through" : undefined}>{data.title}</span>
                  </div>
                    <div className='items-center'>
                     <button className='px-4 py-2' onClick={() => handleClick(data.id)}>x</button>
                    </div>     
            </div>
               )}
            </Draggable>
            ))}
            {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
