import { useState, useEffect } from 'react'
import api from '../api'
import Note from './Note.jsx'

function NotesList ({notes, setNoteId, getNotes, setNewNoteView}) {

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

    // create headers from unique body areas
    const categories = new Set ([]);
    notes.map((note) => categories.add(note.body_area));
    // convert back to array for operations
    const headerArray = Array.from(categories);

    return (
        <>
            <div className="category grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-2 mx-5 sm:mx-10 mt-2">
                {headerArray.map((header) => 
                <div className='grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-2 self-start w-full rounded-lg'
                key={header}>
                    <div className='flex flex-col'>
                        <div className='p-1 self-center justify-self-center text-center text-2xl font-bold w-full border-2 border-stone-600 bg-white-400 text-stone-600 rounded-lg mb-24'>{header}
                        </div>
                        {notes.filter((note) => note.body_area == header).map((note, index) => (
                            <Note note={note} setNoteId={setNoteId} onDelete={deleteNote} key={note.id} z={index*10} setNewNoteView={setNewNoteView}/>
                        ))}
                    </div>
                </div>
                )}
            </div>
        </>
    )

}

export default NotesList