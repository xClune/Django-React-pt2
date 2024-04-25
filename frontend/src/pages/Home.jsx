import { useState, useMemo, useEffect } from 'react'
import { Progress } from '../contexts/ProgressContext'
import { Level } from '../contexts/LevelContext'

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

    const [progress, setProgress] = useState(() => {
        return JSON.parse(localStorage.getItem('progress')) || 0
      });

    const [level, setLevel] = useState(() => {
        return JSON.parse(localStorage.getItem('level')) || 1
    });

    const value = useMemo(
    () => ({ progress, setProgress }), 
    [progress]
    );

    const levelValue = useMemo(
        () => ({ level, setLevel }), 
        [level]
        );

    useEffect(() => {
        if (progress >= 100) {setProgress(0); setLevel(level+1)}

        localStorage.setItem('progress', JSON.stringify(progress));
      }, [progress]);

    useEffect(() => {
        localStorage.setItem('level', JSON.stringify(level));
        }, [level]);

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Smart Cards</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Helmet>

            <Level.Provider value={levelValue}>
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
            </Level.Provider>

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