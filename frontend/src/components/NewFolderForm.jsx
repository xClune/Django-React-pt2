import { useState } from 'react'
import api from '../api'
import '../styles/Form.css'

function NewFolderForm ({ getFolders, setNewFolderView, newFolderView }) {
    const [folderName, setFolderName] = useState("")

    const createNewFolder = (e) => {
        e.preventDefault()
        api
            .post('/api/folders/', {folder: folderName})
            .then((res) => {
                if (!res.status === 201) alert('Failed to create folder.')
                getFolders();
                setNewFolderView(false);
                setFolderName('')
            })
            .catch((error) => alert(error))
    }

    if (!newFolderView) {
        return <></>
    } else {
        return (
            <>
                <form onSubmit={createNewFolder} className='bg-purple-400 border-2 border-purple-700 rounded-lg p-5 absolute sm:top-1/2 left-1/2 transform -translate-x-1/2 sm:-translate-y-1/2 w-11/12 sm:w-6/12 text-white'>
                    <div>Enter Folder Name:</div>
                    <button 
                    className='absolute right-2 top-2 hover:bg-red-600 rounded-md px-3' 
                    onClick={() => {
                        setNewFolderView(false);
                        setFolderName('')
                        }}>
                        X
                    </button>
                    <label htmlFor="folder"></label>
                    <br />
                    <input
                        className='form-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500'
                        type="folder"
                        id="folder"
                        name="folder"
                        placeholder='Folder'
                        required
                        onChange={(e) => setFolderName(e.target.value)}
                        value={folderName}
                    />
                    <br />               
                    <button 
                    className='form-button text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 cursor-pointer'
                    type="submit" 
                    value="Submit">Add Folder
                    </button>
                </form>
            </>
        )
    }
    
}

export default NewFolderForm