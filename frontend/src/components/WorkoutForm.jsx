import { useState } from 'react'
import api from '../api'

function WorkoutForm ({ getNotes, newNoteView, setNewNoteView }) {
    const [bodyArea, setBodyArea] = useState("Full Body")
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    const createNote = (e) => {
        e.preventDefault()
        api
            .post('/api/notes/', {body_area: bodyArea, content, title})
            .then((res) => {
                if (!res.status === 201) alert('Failed to create note.')
                getNotes();
                setNewNoteView(false);

            })
            .catch((error) => alert(error))
    }

    if (!newNoteView) {
        return <></>
    } else {
        return (
            <>
                <form onSubmit={createNote} className='bg-blue-200 rounded-lg p-5 absolute sm:top-1/2 left-1/2 transform -translate-x-1/2 sm:-translate-y-1/2'>
                    <button 
                    className='absolute right-2 top-1' 
                    onClick={() => {setNewNoteView(false)}}>
                        x
                    </button>
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
                        <option value="full-body">Full Body</option>
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
            </>
        )
    }
    
}

export default WorkoutForm