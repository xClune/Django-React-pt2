import { useState } from 'react'

function Note({note, onDelete, setNewNoteView, setNoteId, z}) {
    const [hidden, setHidden] = useState('hidden')

    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

    const toggleInfo = () => {
        hidden === 'hidden' ? setHidden('') : setHidden('hidden');
    }

    return (
        <div className={`note-container text-white flex flex-col w-full border-double border-4 border-stone-400 bg-stone-500 rounded-lg p-5 self-center z-${z} -mt-28 peer peer-hover:translate-y-28 transition-all ease-in-out duration-500`} onMouseLeave={() => setHidden('hidden')}>
            <p className={`note-date ${hidden} text-xs self-end`}>{ formattedDate }</p>
            <p className={`note-title hover:z-50 font-bold mb-1`}>{note.title}</p>
            <p className={`body-area ${hidden}hover:z-50 border-b border-stone-400`}>{note.body_area}</p>
            <p className={`note-content ${hidden}`}>{note.content}</p>
            <button className={`note-edit ${hidden} self-center text-xs text-white bg-stone-700 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg mt-2 px-1 py-1 text-center dark:bg-stone-600 dark:hover:bg-blue-600 dark:focus:ring-stone-800 z-${z} transition-all ease-in duration-300 mb-2`} 
            onClick={() => {
                setNoteId(note.id),
                setNewNoteView('edit')
            }}>Edit Workout</button>
            <a className={`extend self-center text-white hover:cursor-pointer py-0 px-1 mt-2 hover:text-stone-500 rounded-sm text-xs hover:bg-white transition-all ease-in duration-300 cursor-pointer`} onClick={toggleInfo}>{
                hidden == '' ? 'see less' : 'see more'
            }</a>
            <button 
            className={`delete-note form-button text-white bg-stone-700 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm mt-2 px-1 py-1 text-center dark:bg-stone-600 dark:hover:bg-red-600 dark:focus:ring-stone-800 z-${z} transition-all ease-in duration-300`} 
            onClick={() => {
                onDelete(note.id)
            }}>Delete
            </button>
        </div>
    );
}

export default Note