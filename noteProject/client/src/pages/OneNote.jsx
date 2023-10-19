import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import debounce from "just-debounce-it";

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
    fetch(`/api/notes/${id}/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    });
  };

  const deleteNote = () => {
    fetch(`/api/notes/${id}/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => navigate('/home'));
  };

  const createNote = () => {
    fetch(`/api/notes/create/`, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    }).then(() => navigate('/home'));
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
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={createNote}>Done</button>
        )}

        <Link to={"/"}>Back to notes</Link>
      </div>
    </div>
  );
};
