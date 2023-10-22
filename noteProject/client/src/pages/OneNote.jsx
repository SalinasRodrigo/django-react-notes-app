import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import debounce from "just-debounce-it";
import { TrashIcon } from "../icons/TrashIcon";
import { LeftIcon } from "../icons/LeftIcon";
import { SaveIconn } from "../icons/SaveIcon";

export const OneNote = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getNote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getNote = () => {
    if(id === 'new') return
    fetch(`/api/notes/${id}/`)
      .then((res) => res.json())
      .then((response) => {
        const newNote = response;
        setNote(newNote);
      })
      .catch((error) => console.log(error));
  };

  const updateNote = (newNote) => {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    fetch(`/api/notes/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(newNote),
    });
  };

  const deleteNote = () => {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    fetch(`/api/notes/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'X-CSRFToken': csrftoken,
      },
    }).then(() => navigate('/'));
  };

  const createNote = () => {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    fetch(`/api/notes/`, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(note)
    }).then(() => navigate('/'));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceUpdate = useCallback(
    debounce((newNote) => {
      if(newNote.body !== ''){
        updateNote(newNote)
      }
    }, 500),
    []
  );

  const handleChange = (e) => {
    const newNote = { ...note, body: e.target.value };
    setNote(newNote);
    if (id !== 'new'){
      debounceUpdate(newNote);
    }
  };

  return (
    <div className="one-note">
      <div className="note-body">
        <h2>Note:</h2>
        <textarea onChange={handleChange} defaultValue={note?.body}></textarea>
      </div>
      <div className="back-link">
        {id !== "new" ? (
          <button onClick={deleteNote} title="delete note"><TrashIcon/></button>
        ) : (
          <button onClick={createNote} title="save note"><SaveIconn/></button>
        )}

        <Link to={"/"} title="back to notes"><LeftIcon/></Link>
      </div>
    </div>
  );
};
