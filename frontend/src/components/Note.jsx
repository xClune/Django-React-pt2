import { useState } from 'react'

function Note({note, onDelete, z}) {
    const [hidden, setHidden] = useState('hidden')
    const [m, setM] = useState(0)

    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

    const toggleInfo = () => {
        hidden === 'hidden' ? setHidden('') : setHidden('hidden');
    }

    return (
        <div className={`note-container text-white flex flex-col w-full border-double border-4 border-stone-400 bg-stone-500 rounded-lg p-5 self-center z-${z} -mt-20 peer peer-hover:translate-y-20 transition-all ease-in-out duration-500`}>
            <p className={`note-title hover:z-50 font-bold`}>{note.title}</p>
            <p className={`body-area ${hidden}hover:z-50`}>{note.body_area}</p>
            <p className={`note-content ${hidden}`}>{note.content}</p>
            <p className={`note-date ${hidden} text-xs self-end`}>Created { formattedDate }</p>
            <a className={`extend self-center text-white hover:cursor-pointer py-0 px-1 hover:text-stone-500 rounded-sm text-xs hover:bg-white transition-all ease-in duration-300`} onClick={toggleInfo}>{
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