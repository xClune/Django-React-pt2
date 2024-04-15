import { useState } from 'react'
import api from '../api'
import Header from '../components/Header'
import NotesList from '../components/NotesList';
import WorkoutForm from '../components/WorkoutForm'

function Home() {
    const [notes, setNotes] = useState([])
    const [newNoteView, setNewNoteView] = useState(false)

    const getNotes = () => {
        api
            .get("api/notes/")
            .then((res) => res.data)
            .then((data) => { setNotes(data) })
            .catch((err) => alert(err))
    }

    return (
        <>
            <Header setNewNoteView={setNewNoteView}/>
            <div className='main relative'>
                <WorkoutForm getNotes={ getNotes } newNoteView={newNoteView} setNewNoteView={setNewNoteView}/>
                <NotesList notes={ notes } getNotes={ getNotes }/>   
            </div>
        </>
    );
}

export default Home