import {useState, useEffect} from 'react'
import api from '../api'
import Note from '../components/Note'

function Home() {
    const [notes, setNotes] = useState([])
    const [bodyArea, setBodyArea] = useState("Full Body")
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    useEffect(() => {
        getNotes();
    }, [])

    const getNotes = () => {
        api
            .get("api/notes/")
            .then((res) => res.data)
            .then((data) => { setNotes(data) })
            .catch((err) => alert(err))
    }

    const deleteNote = (id) => {
        api
            .delete(`api/notes/delete/${id}/`)
            .then((res) => {
                if (!res.status === 204) alert('Failed to delete note.')
                getNotes()
            })
            .catch((error) => alert(error))
    }

    const createNote = (e) => {
        e.preventDefault()
        api
            .post('/api/notes/', {body_area: bodyArea, content, title})
            .then((res) => {
                if (!res.status === 201) alert('Failed to create note.')
                getNotes()
            })
            .catch((error) => alert(error))
    }

    return (
        <>
            <div className='main flex items-center justify-center flex-col'>
            <h2 className='text-red-200 mb-5 text-4xl'>Notes</h2>
                <div className='notes-section'>
                    <div className="notes-tray flex flex-row">
                        {notes.map((note) => (
                            <Note note={note} onDelete={deleteNote} key={note.id} />
                        ))}
                    </div>
                </div>
                <h2>Create a Note</h2>
                <form onSubmit={createNote}>
                    <label htmlFor="title">Title:</label>
                    <br />
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <br />
                    <label htmlFor="body-area">Body Area:</label>
                    <br />
                    <select
                        id="body-area"
                        name="body-area"
                        required
                        value={ bodyArea }
                        onChange={(e) => {
                            setBodyArea(e.target.value)
                        }}
                    >
                        <option value="legs">Legs</option>
                        <option value="abs">Abs</option>
                        <option value="chest">Chest</option>
                        <option value="back">Back</option>
                        <option value="shoulders">Shoulders</option>
                        <option value="arms">Arms</option>
                    </select>
                    <br />
                    <label htmlFor="content">Content:</label>
                    <br />
                    <textarea
                        id="content"
                        name="content"
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    <br />               
                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        </>);
}

export default Home