import './App.css';
import { useState,useEffect } from 'react';
import View from './components/View';


function App() {
  const getDatafromLS=()=>{
    const data = localStorage.getItem('books');
    if(data){
      return JSON.parse(data);
    }
    else{
      return []
    }
  }
  const [books, setbooks]=useState(getDatafromLS());

  const [task, settask]=useState('');
  const [slno, setSlno]=useState('0')
  const [status, setStatus]=useState('');
  const [onn,setOnn]=useState(0)
 

  const handleAddBookSubmit=(e)=>{
    e.preventDefault();

    let book={
      slno,
      task,
      status
    }
    setbooks([...books,book]);
    settask('');
    setSlno(slno+1);
    setStatus("")

  }


  const deleteBook=(slno)=>{
    const filteredBooks=books.filter((element,index)=>{
      return element.slno !== slno
    })
    setbooks(filteredBooks);
  }


  useEffect(()=>{
    localStorage.setItem('books',JSON.stringify(books));
  },[books])

  const addtask=["Add Task","Close"]
  return (
    <div className='wrapper'>
    <h1 className='text-4xl p-6'>TODO App</h1>
    <div className='main'>

    <div className='form-container flex flex-row gap-4 justify-end mr-20 mt-48'>
    {onn!=0  &&  <form autoComplete="off" className='bg-cyan-400 p-2 mb-2 gap-2'
        onSubmit={handleAddBookSubmit}>
          <label>task:   
          <input type="text" className='form-control bg-cyan-400' required
          onChange={(e)=>settask(e.target.value)} value={task}></input></label>
          <label>Status: 
          <select className='bg-cyan-400' onChange={(e)=>{setStatus(e.target.value)}} >
            <option value="Todo">Todo</option>
            <option value="Pending">Pending</option>
            <option value="Complete">Complete</option>
          </select></label>
          <button type="submit" className='ml-4 px-1 bg-white text-cyan-500'>
            Add
          </button>
        </form>}
        {<button onClick={()=>onn==1?setOnn(0):setOnn(1)} 
        className='w-20 bg-white text-cyan-500  mb-2 outline outline-1 outline-offset-2'>{addtask[onn]}</button>}
      </div>

      <div className='view-container flex flex-col'>
        {books.length>0&&<>
          <div className='flex justify-evenly'>
            <table className='table w-4/6 '>
              <thead>
                <tr className='text-center text-2xl border-[1px] border-transparent border-b-black'>
                  <th>Task</th>
                  <th>Status</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody className='text-center text-2xl'>

                <View books={books} deleteBook={deleteBook} setbooks={setbooks}/>
              </tbody>
            </table>
          </div>
        </>}
        {books.length < 1 && <div>No books are added yet</div>}
      </div>

    </div>
  </div>
    )
}

export default App;