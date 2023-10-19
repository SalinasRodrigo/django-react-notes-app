/* eslint-disable react/prop-types */
import {Link} from 'react-router-dom';

export const ListItem = ({note}) => {
  
  const getTitle = (note) => {
    return note.body.split('\n')[0]
  }

  const getDateFormat = (date) => {
    return new Date(date).toLocaleDateString()
  }

  const getContent = (note) =>{
    const title = getTitle(note)
    let content = note.body.replaceAll('\n', '')
    return content.replaceAll(title, '')
  }

  return (
    <Link to={`/notes/${note.id}/`} className='list-item'>
      <header>
        <h3>{getTitle(note)}</h3>
      </header>
      <footer>
        <small>{getDateFormat(note.updated)}</small>
        <small>{getContent(note)}</small>
      </footer>
    </Link>
  )
}