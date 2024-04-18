import { useState } from 'react'

function Note({note, onDelete, z}) {
    const [hidden, setHidden] = useState('hidden')

    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

    const extendCard = () => {
        hidden == '' ? setHidden('hidden') : setHidden('')
    }

    return (
        <div className={`note-container text-white flex flex-col w-full border-double border-4 border-blue-400 bg-blue-500 rounded-lg p-5 self-center z-${z}`}>
            <p className="note-title">{note.title}</p>
            <p className={`body-area ${hidden}`}>{note.body_area}</p>
            <p className={`note-content ${hidden}`}>{note.content}</p>
            <p className={`note-date ${hidden}`}>{ formattedDate }</p>
            <a className="extend self-center text-white hover:cursor-pointer hover:text-blue-300" onClick={extendCard}>{
                hidden == '' ? 'see less' : 'see more'
            }</a>
            <button 
            className="delete-note form-button text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mt-2 w-full sm:w-auto px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-red-600 dark:focus:ring-blue-800" 
            onClick={() => {
                onDelete(note.id)
            }}>Delete
            </button>
        </div>
    );
}

export default Note