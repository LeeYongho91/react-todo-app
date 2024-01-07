import React, {useState} from 'react';
import './App.css';
import Lists from './components/Lists';
import Form from './components/Form';

export default function App() {
 
  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: Date.now(),
      title: value,
      completed: false
    };
    setTodoData((prev) => [...prev, newTodo]);
    setValue("");
  }

  

    return(
      <div className='flex items-center justify-center w-screen h-screen bg-blue-100'>
        <div className='w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg'>
            <div className='flex justify-between mb-3'>
              <h1>할 일 목록</h1>
            </div>
          <Lists todoData={todoData} setTodoData={setTodoData} />
          <Form value={value} setValue={setValue} handleSubmit={handleSubmit} />
        </div>
      </div>
    )
  }
