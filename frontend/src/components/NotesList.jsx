import { useEffect } from 'react'
import api from '../api'
import Note from './Note.jsx'
import '../styles/NoteList.css'

function NotesList ({notes, setNoteId, getNotes, setNewNoteView, getFolders, folders, updateStats}) {

    // useEffect to get current notes and folders on mount
    useEffect(() => {
        getNotes();
        getFolders();
    }, [])

    // Delete folder using id
    const deleteFolder = (id) => {
        let folder;

        for (const item of folders) {
            if (id === item.id){
                folder = item
            }
        }

        for (const note of notes) {
            if (note['folder'] === folder['folder']){
                alert('Please move or delete all cards within first')
                return;
            }      
        }

        api
            .delete(`api/folders/delete/${id}/`)
            .then((res) => {
                if (!res.status === 204) alert('Failed to delete folder.')
                getFolders()
            })
            .catch((error) => alert(error))
    }

    // Delete note using id
    const deleteNote = (id) => {
        api
            .delete(`api/notes/delete/${id}/`)
            .then((res) => {
                if (!res.status === 204) alert('Failed to delete note.')
                getNotes()
            })
            .catch((error) => alert(error))
    }

    // If there are no folders, display a message to add a folder
    if (folders.length === 0) {return <div className='flex items-center justify-center w-full h-full'><h1 className='mt-20'>Start by adding a folder!</h1></div>}
    // Otherwise, display the folders and notes
    else {
    return (
            <>
                <div className="flex-1 folder grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-2 mx-5 sm:mx-10 mt-2">

                    {/* Map folders objects, filtering notes beneath if same folder*/}

                    {folders.map((folder) => 
                    // make this div draggable with dnd-kit
                    <div className='grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-2 self-start w-full rounded-lg'
                    key={folder.id}>
                        <div className='flex flex-col overflow-hidden rounded-lg'>
                            <div className='relative p-1 self-center justify-self-center text-center text-l md:text-2xl font-bold w-full border-1 border-stone-600 bg-gradient-to-br from-stone-700 to-purple-500 text-white rounded-lg mb-24 px-5'>
                                <button 
                                className='foldername absolute right-1 top-1 hover:bg-red-600 rounded-sm px-1 text-xs' 
                                onClick={() => {
                                    deleteFolder(folder.id);
                                    }}>
                                    X
                                </button>
                                {folder.folder}
                            </div>

                            {/* If notes same as folder */}
                            {notes.filter((note) => note.folder == folder.folder).map((note, index) => (
                                <Note note={note} setNoteId={setNoteId} onDelete={deleteNote} key={note.id} z={index*10} setNewNoteView={setNewNoteView} updateStats={updateStats}/>
                            ))}
                        </div>
                    </div>
                    )}
                </div>
            
            </>
        )
    }

}

export default NotesList