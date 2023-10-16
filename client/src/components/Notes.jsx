import { useEffect, useState } from "react"


export const Notes = () => {
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
        console.log(notes)
        setNotes(notes)
      })
      .catch((error)=>console.log(error))
  }

  return(
    <>
      <h2>Notes</h2>
      {notes.map((note)=>{
        return(
          <p key={note.id}>{note.body}</p>
        )
      })}
    </>
  )
}