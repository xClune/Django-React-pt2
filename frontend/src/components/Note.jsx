
function Note({note, onDelete}) {

    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

    return (
        <div className='note-container mr-10 border-double border-4 border-blue-400 bg-blue-300 rounded p-5'>
            <p className="note-title">{note.title}</p>
            <p className="body-area">{note.body_area}</p>
            <p className="note-content">{note.content}</p>
            <p className="note-date">{ formattedDate }</p>
            <button 
            className="delete-note form-button text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
            onClick={() => {
                onDelete(note.id)
            }}>Delete
            </button>
        </div>
    );
}

export default Note