import { useState, useMemo, useEffect } from 'react'
import { Experience } from '../contexts/ExperienceContext'
import { Level } from '../contexts/LevelContext'

import { Helmet } from 'react-helmet'
import api from '../api'

import Header from '../components/Header'
import NotesList from '../components/NotesList';
import NewCardForm from '../components/NewCardForm';
import NewFolderForm from '../components/NewFolderForm';
import Footer from '../components/Footer'

function Home() {
    const [notes, setNotes] = useState([])
    const [noteId, setNoteId] = useState('')

    const [folders, setFolders] = useState([])

    const [newNoteView, setNewNoteView] = useState(false)
    const [newFolderView, setNewFolderView] = useState(false)

    const [stats, setStats] = useState([])

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

    const getStats = () => {
        api
            .get("api/userstats/")
            .then((res) => res.data)
            .then((data) => { setStats(data) })
            .catch((err) => alert(err))
    }

    // CHANGE TO PULL FROM DATABASE
    const [experience, setExperience] = useState(() => {
        return JSON.parse(localStorage.getItem('experience')) || 0
      });

    const [level, setLevel] = useState(() => {
        return JSON.parse(localStorage.getItem('level')) || 1
    });

    const value = useMemo(
    () => ({ experience, setExperience }), 
    [experience]
    );

    const levelValue = useMemo(
        () => ({ level, setLevel }), 
        [level]
        );

    useEffect(() => {
        if (experience >= level*100) {setExperience(0); setLevel(level+1)}

        localStorage.setItem('experience', JSON.stringify(experience));
      }, [experience]);

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
            <Experience.Provider value={value}>
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
            </Experience.Provider>  
            </Level.Provider>
            
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