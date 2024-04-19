import { useState } from 'react'
import { Helmet } from 'react-helmet'
import api from '../api'
import Header from '../components/Header'
import NotesList from '../components/NotesList';
import WorkoutForm from '../components/WorkoutForm'

function Home() {
    const [notes, setNotes] = useState([])
    const [noteId, setNoteId] = useState('')
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
            <Helmet>
                <meta charSet="utf-8" />
                <title>Gym Planner</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Helmet>

            <Header setNewNoteView={setNewNoteView}/>
            <div className='main relative m-0 p-0'>
                <WorkoutForm notes={ notes } noteId={noteId} getNotes={ getNotes } newNoteView={newNoteView} setNewNoteView={setNewNoteView}/>
                <NotesList notes={ notes } setNoteId={setNoteId} getNotes={ getNotes } setNewNoteView={setNewNoteView}/>   
            </div>
        </>
    );
}

export default Home