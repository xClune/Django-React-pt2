import { useState } from 'react'

function Note({note, onDelete, setNewNoteView, setNoteId, z}) {
    const [hidden, setHidden] = useState('hidden')

    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

    const toggleInfo = () => {
        hidden === 'hidden' ? setHidden('') : setHidden('hidden');
    }

    return (
        <div className={`note-container text-white flex flex-col w-full border-double border-4 border-stone-400 bg-stone-500 rounded-lg p-5 self-center z-${z} -mt-20 peer peer-hover:translate-y-20 transition-all ease-in-out duration-700`} onMouseLeave={() => setHidden('hidden')}>
            <p className={`note-title hover:z-50 font-bold mb-3`}>{note.title}</p>
            <p className={`note-date ${hidden} text-xs self-end`}>{ formattedDate }</p>
            <p className={`category ${hidden}hover:z-50 border-b border-stone-400`}>{note.category}</p>
            <p className={`note-content ${hidden}`}>{note.content}</p>
            <div className='flex flex-row items-center justify-between'>
                <button className={`note-edit ${hidden} text-xs text-white bg-stone-700 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg mt-2 px-1 py-1 text-center dark:bg-stone-600 dark:hover:bg-blue-600 dark:focus:ring-stone-800 z-${z} transition-all ease-in duration-300 flex-1 mx-1`} 
                onClick={() => {
                    setNoteId(note.id),
                    setNewNoteView('edit')
                }}>Edit</button>
                <button 
                className={`delete-note ${hidden} text-white bg-stone-700 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-xs mt-2 px-1 py-1 flex-1 text-center dark:bg-stone-600 dark:hover:bg-red-600 dark:focus:ring-stone-800 z-${z} transition-all ease-in duration-300 mx-1`} 
                onClick={() => {
                    onDelete(note.id)
                }}>Delete
                </button>
            </div>
            <a className={`extend self-center text-white hover:cursor-pointer py-0 px-1 mt-2 hover:text-stone-500 rounded-sm text-xs hover:bg-white transition-all ease-in duration-300 cursor-pointer`} onClick={toggleInfo}>{
                hidden == '' ? 'see less' : 'see more'
            }</a>
        </div>
    );
}

export default Note