import {useState, useEffect} from 'react'
import api from '../api'
import Note from '../components/Note'
import Header from '../components/Header'

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
            <Header />
            <div className='main flex items-center flex-col'>
                <div className='notes-section w-full'>
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
                        className='form-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
                        className='form-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
                        className='form-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        id="content"
                        name="content"
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    <br />               
                    <input 
                    className='form-button text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    type="submit" 
                    value="Submit"></input>
                </form>
            </div>
        </>);
}

export default Home