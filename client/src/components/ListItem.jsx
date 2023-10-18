/* eslint-disable react/prop-types */
import {Link} from 'react-router-dom';

export const ListItem = ({note}) => {
  return (
    <Link to={`/notes/${note.id}/`}>
      <h3>{note.body}</h3>
    </Link>
  )
}