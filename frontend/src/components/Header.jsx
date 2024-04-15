import { useNavigate } from 'react-router-dom'

function Header ({setNewNoteView}) {
    const navigate = useNavigate()

    // track logged in status and adjust header to suit.

    return (
        <>
            <header className="
            h-30
            flex flex-col items-center
            bg-blue-700 border-b-2 border-gray-200 
            shadow-lg shadow-gray-200
            sm:h-18 sm:justify-between sm:flex sm:flex-row">
                <div className="title 
                text-white font-extrabold text-3xl 
                mx-20 my-10
                sm:text-4xl
                md:text-5xl
                transition-all ease-in duration-200">
                    Gym Planner
                </div>
                <div className="buttons flex flex-row items-center justify-end">
                    <button 
                    className="
                    text-white font-medium bg-blue-700 
                    py-2.5 px-5 mb-10 ml-10
                    text-center text-sm w-auto 
                    hover:bg-blue-800 
                    focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg
                    sm:w-auto sm:ml-0 sm:mb-0 sm:items-center sm:justify-center
                    dark:bg-blue-600 dark:hover:bg-blue-300 dark:focus:ring-blue-800 mr-10"
                    onClick={() => {setNewNoteView(true)}}>
                        Add Plan
                    </button>
                    <button 
                    className="
                    text-white font-medium bg-blue-700 
                    py-2.5 px-5 mb-10 ml-10
                    text-center text-sm w-auto 
                    hover:bg-blue-800 
                    focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg
                    sm:w-auto sm:ml-0 sm:mb-0 sm:items-center sm:justify-center
                    dark:bg-blue-600 dark:hover:bg-blue-300 dark:focus:ring-blue-800 mr-10"
                    onClick={() => {
                        navigate('/login')
                    }}>
                        Logout
                    </button>
                </div>
            </header>
        </>
    )
}

export default Header;