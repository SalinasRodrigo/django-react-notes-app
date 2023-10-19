import { Link } from "react-router-dom"
import { PlusIcon } from "../icons/PlusIcon.jsx"



export const AddButton = () => {

  return(
    <Link to={"/notes/new"} className="add-btn" title="new note">
      <PlusIcon/>
    </Link>
  )
}