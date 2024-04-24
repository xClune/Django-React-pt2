import { useState, useMemo } from 'react'
import { Progress } from '../contexts/ProgressContext'

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

    const [progress, setProgress] = useState(0);
    const value = useMemo(
    () => ({ progress, setProgress }), 
    [progress]
    );

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Smart Cards</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Helmet>
            <Progress.Provider value={value}>
                <Header 
                    setNewNoteView={setNewNoteView} 
                    setNewFolderView={setNewFolderView}
                />
            

                <NotesList 
                        notes={ notes } 
                        setNoteId={setNoteId} 
                        getNotes={ getNotes } 
                        setNewNoteView={setNewNoteView}
                        getFolders={ getFolders } 
                        setNewFolderView={setNewFolderView}
                        folders={folders}
                    /> 
            </Progress.Provider>  

            <NewFolderForm 
                setNewFolderView={setNewFolderView} 
                newFolderView={newFolderView} 
                folders={folders} 
                setFolders={setFolders}
                getFolders={getFolders} 
            />

            <NewCardForm 
                folders={folders}
                getFolders={getFolders} 
                notes={ notes } 
                noteId={noteId} 
                getNotes={ getNotes } 
                newNoteView={newNoteView} 
                setNewNoteView={setNewNoteView}
            />
        </>
    );
}

export default Home