import React from 'react'
import { useState } from 'react'

const View = ({books,deleteBook,setbooks,setStatus}) => {
  const [updateStatus,setUpdateStatus]=useState(-1)
  function handleEdit(slno){
    setUpdateStatus(slno)
  }

  function getStatusButtonStyle(val) {
    if (val === "Todo") {
      return "text-slate-500 border-[1px] p-1 border-slate-500";
    } else if (val==="Pending") {
      return "text-yellow-500 border-[1px] p-1 border-yellow-500";
    } else {
      return "text-green-500 border-[1px] p-1 border-green-500";
    }
  }
  
  return(   
    books.map(book=>(
      updateStatus=== book.slno ? <Edit books={books} setbooks={setbooks} book={book}/> :
      <><br></br>
      <tr key={book.slno}>
          <td>{book.title}</td>
          <td><span className={getStatusButtonStyle(book.status)}>{book.status}</span></td>
          <td className='edit-btn'>
            <button onClick={() => {handleEdit(book.slno)}}><i class="fas fa-pen"></i></button>
          </td>
          <td className='delete-btn'>
            <button onClick={() => {
              let text = "Do you want to Remove?"
              // eslint-disable-next-line no-restricted-globals
              if (confirm(text) == true) {
                deleteBook(book.slno)
                text = "You pressed OK!"
              }
              else {
                console.log("You canceled!")
              }
            } }><i class="fas fa-trash"></i></button>
          </td>
        </tr></>
  
))
    
  )
}

export default View
function Edit({book,books,setbooks}){
  function handleInput(e){
    const newBook =books.map(bo=>(
      bo.slno===book.slno ? {...bo, [e.target.name]:e.target.value} : bo
    ))
      setbooks(newBook)
  }
  function handleSave(){
      window.location.reload(false)
  }
  return(
    <><br></br><tr className='text-center'>
      <td><input type='text' name='title' value={book.title} onChange={handleInput} className='w-40 '></input></td>
      <td><select name='status' onChange={handleInput} >
            <option value="Todo">Todo</option>
            <option value="Pending">Pending</option>
            <option value="Complete">Complete</option>
          </select></td>
      <td><button type='submit' onClick={handleSave}><i class="fas fa-save"></i></button> </td>    
      <td><button></button></td> 
    </tr>
    </>
  )
}

