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

    const categories = ['Full-body', 'Legs', 'Abs', 'Chest', 'Back', 'Shoulders', 'Arms']

    return (
        <>
            <div className="category grid grid-cols-[repeat(auto-fill,minmax(150px,170px))] gap-2 p-10">
                {categories.map((category) => 
                <div className='grid grid-cols-[repeat(1,minmax(150px,170px))] gap-2 p-10'
                key={category}>
                    <div className='p-3 self-center justify-self-center text-2xl w-full border-2 border-black'>{category}
                    </div>
                    <div>
                        {notes.filter((note) => note.body_area == category).map((note) => (
                            <Note note={note} onDelete={deleteNote} key={note.id} />
                        ))}
                    </div>
                </div>
                )}
            </div>
            {/* Instead of 6 cells, create 6 columns here. Use map w/filter to place the workouts only in their correct column (by category) */}
            {/* {notes.filter((note) => note.body_area === {category}).map((note) => (
                <Note note={note} onDelete={deleteNote} key={note.id} />
            ))} */}
        </>
    )

}

export default NotesList