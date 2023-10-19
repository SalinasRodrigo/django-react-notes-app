import { Link } from "react-router-dom"


export const AddButton = () => {

  return(
    <Link to={"/notes/new"} className="add-btn">
      Add note
    </Link>
  )
}