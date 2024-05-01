import { useState, useEffect, useMemo, useContext } from 'react'
import { Helmet } from 'react-helmet'
import api from '../api'

import Header from '../components/Header'
import NotesList from '../components/NotesList';
import NewCardForm from '../components/NewCardForm';
import NewFolderForm from '../components/NewFolderForm';
import Footer from '../components/Footer'

import { ExpContext } from '../contexts/ExperienceContext'
import { LevelContext } from '../contexts/LevelContext'

function Home() {
    // create state variables for notes and setNotes
    const [notes, setNotes] = useState([])
    const [noteId, setNoteId] = useState('')

    // create state variables for folders and setFolders
    const [folders, setFolders] = useState([])

    // create state variables for stats and setStats
    const [stats, setStats] = useState([])

    // useContext to get the value of exp and setExp
    useEffect(() => {getStats()},[])
    const [exp, setExp] = useState(0)
    const [level, setLevel] = useState(1)

    // create state variables for new note and new folder form popups
    const [newNoteView, setNewNoteView] = useState(false)
    const [newFolderView, setNewFolderView] = useState(false)

    // function to retrieve notes from the backend
    const getNotes = () => {
        api
            .get("api/notes/")
            .then((res) => res.data)
            .then((data) => { setNotes(data) })
            .catch((err) => alert(err))
    }

    // function to retrieve folders from the backend
    const getFolders = () => {
        api
            .get("api/folders/")
            .then((res) => res.data)
            .then((data) => { setFolders(data) })
            .catch((err) => alert(err))
    }

    // function to retrieve stats from the backend
    const getStats = () => {
        api
            .get("api/userstats/")
            .then((res) => res.data)
            .then((data) => { setStats(data) })
            .catch((err) => alert(err))
    }

    // function to update stats in the backend
    const updateStats = () => {
        api
            .put(`/api/userstats/edit/${stats[0].id}/`, {exp, level})
            .then((res) => {
                if (!res.status === 204) alert('Failed to update note.')
                getStats();
            })
            .catch((error) => alert(error))
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Smart Cards</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Helmet>

            <ExpContext.Provider value={{exp, setExp}}>
                <LevelContext.Provider value={{level, setLevel}}>
                    <Header 
                        stats={ stats }
                        getStats={ getStats }
                        updateStats={ updateStats }
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
                        stats={stats}
                        setStats={setStats}
                        updateStats={updateStats}
                    /> 
                </LevelContext.Provider>
            </ExpContext.Provider>

            <Footer />

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