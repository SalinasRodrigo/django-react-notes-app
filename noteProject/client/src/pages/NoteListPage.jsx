import { useEffect, useState } from "react"
import { ListItem } from "../components/ListItem"
import { AddButton } from "../components/AddButton"


export const NoteListPage = () => {
  const [notes, setNotes] = useState([])

  useEffect(()=>{
    getNotes()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const getNotes = () => {
    fetch('/api/notes/')
      .then((res)=> res.json())
      .then((response)=>{
        const notes = response
        setNotes(notes)
      })
      .catch((error)=>console.log(error))
  }

  return(
    <>
    <div className="list">
      <h2>Notes:</h2>
      {notes.map((note)=>{
        return(
          <ListItem key={note.id} note={note}/>
        )
      })}
    </div>
      <AddButton/>
    </>
  )
}