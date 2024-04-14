import { useState } from 'react'
import api from '../api'
import Header from '../components/Header'
import NotesList from '../components/NotesList';
import WorkoutForm from '../components/WorkoutForm'

function Home() {
    const [notes, setNotes] = useState([])

    const getNotes = () => {
        api
            .get("api/notes/")
            .then((res) => res.data)
            .then((data) => { setNotes(data) })
            .catch((err) => alert(err))
    }

    return (
        <>
            <Header />
            <div className='main flex items-center flex-col'>
                <NotesList notes={ notes } getNotes={ getNotes }/>
                <WorkoutForm getNotes={ getNotes }/>
            </div>
        </>
    );
}

export default Home