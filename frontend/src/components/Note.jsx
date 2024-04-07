

function Note({note, onDelete}) {

    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

    return (
        <div className='note-container mr-10 border-2 border-gray-300 rounded'>
            <p className="note-title">{note.title}</p>
            <p className="body-area">{note.body_area}</p>
            <p className="note-content">{note.content}</p>
            <p className="note-date">{ formattedDate }</p>
            <button className="delete-note" onClick={() => {
                onDelete(note.id)
            }}>Delete
            </button>
        </div>
    );
}

export default Note