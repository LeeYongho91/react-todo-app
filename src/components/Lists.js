import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import List from './List';

const Lists =  React.memo(({todoData, setTodoData, handleClick}) => {

  console.log(`Lists`);

const handleEnd = (result) => {
  if(!result.destination) return;
  const newTodoData = todoData;

  const [reorderedItem] = newTodoData.splice(result.source.index, 1);
  newTodoData.splice(result.destination.index, 0 ,reorderedItem)
  localStorage.setItem('todoData', JSON.stringify(newTodoData));
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
                  <List key={data.id} id={data.id} 
                  handleClick={handleClick}
                  title={data.title} 
                  completed={data.completed} 
                  todoData={todoData} 
                  setTodoData={setTodoData} 
                  provided={provided} 
                  snapshot={snapshot}
                  />
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
})

export default Lists
