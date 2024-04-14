import { useEffect } from 'react'
import api from '../api'
import Note from './Note.jsx'

function NotesList ({notes, getNotes}) {

    useEffect(() => {
        getNotes();
    }, [])

    const deleteNote = (id) => {
        api
            .delete(`api/notes/delete/${id}/`)
            .then((res) => {
                if (!res.status === 204) alert('Failed to delete note.')
                getNotes()
            })
            .catch((error) => alert(error))
    }

    return (
        <div className='notes-section w-full'>
            <div className="notes-tray flex flex-row">
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
            </div>
        </div>
    )

}

export default NotesList