import { useState } from 'react'
import { Helmet } from 'react-helmet'
import api from '../api'
import Header from '../components/Header'
import NotesList from '../components/NotesList';
import NewCardForm from '../components/NewCardForm';
import NewFolderForm from '../components/NewFolderForm';

function Home() {
    const [notes, setNotes] = useState([])
    const [noteId, setNoteId] = useState('')

    const [folders, setFolders] = useState([])

    const [newNoteView, setNewNoteView] = useState(false)
    const [newFolderView, setNewFolderView] = useState(false)

    const getNotes = () => {
        api
            .get("api/notes/")
            .then((res) => res.data)
            .then((data) => { setNotes(data) })
            .catch((err) => alert(err))
    }

    const getFolders = () => {
        api
            .get("api/folders/")
            .then((res) => res.data)
            .then((data) => { setFolders(data) })
            .catch((err) => alert(err))
    }
    

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Smart Cards</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Helmet>

            <Header 
            setNewNoteView={setNewNoteView} 
            setNewFolderView={setNewFolderView}/>
            <div className='main relative m-0 p-0'>
                <NewFolderForm 
                setNewFolderView={setNewFolderView} 
                newFolderView={newFolderView} 
                folders={folders} 
                setFolders={setFolders}
                getFolders={getFolders} />
                <NewCardForm 
                folders={folders}
                getFolders={getFolders} 
                notes={ notes } 
                noteId={noteId} 
                getNotes={ getNotes } 
                newNoteView={newNoteView} 
                setNewNoteView={setNewNoteView}/>
                <NotesList 
                notes={ notes } 
                setNoteId={setNoteId} 
                getNotes={ getNotes } 
                setNewNoteView={setNewNoteView}
                getFolders={ getFolders } 
                setNewFolderView={setNewFolderView}
                folders={folders}/>   
            </div>
        </>
    );
}

export default Home