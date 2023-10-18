import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export const OneNote = () => {
  const {id} = useParams();
  const [note, setNote] = useState(null)

  useEffect(()=>{
    getNote()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  
  const getNote = () => {
    fetch(`/api/notes/${id}/`)
      .then((res)=> res.json())
      .then((response)=>{
        const newNote = response
        console.log(newNote.body)
        setNote(newNote)
      })
      .catch((error)=>console.log(error))
  }

  return(
    <>
      <h2>Note:</h2>
      <p>{note?.body}</p>
    </>
  )
}