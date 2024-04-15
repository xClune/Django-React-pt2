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
        <div className='notes-section w-full grid grid-cols-7 gap-1'>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
        </div>
    )

}

export default NotesList