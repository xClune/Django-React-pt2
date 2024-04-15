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

    const categories = ['Full Body', 'Legs', 'Arms', 'Chest', 'Back', 'Abs']

    return (
        <>
            <div className="category grid grid-cols-[repeat(auto-fill,minmax(200px,220px))] gap-2 p-10">
                {categories.map((category) => <div className='p-3 self-center justify-self-center text-3xl w-full border-2 border-black'>{category}</div>)}
            </div>
            {/* Instead of 6 cells, create 6 columns here. Use map w/filter to place the workouts only in their correct column (by category) */}
            <div className='notes-section grid grid-cols-[repeat(auto-fill,minmax(200px,220px))] gap-2 p-10'>
                    {notes.map((note) => (
                        <Note note={note} onDelete={deleteNote} key={note.id} />
                    ))}
            </div>
        </>
    )

}

export default NotesList