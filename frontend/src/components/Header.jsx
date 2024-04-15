
function Header ({setNewNoteView}) {

    return (
        <>
            <header className="flex flex-row justify-between items-center border-b-2 bg-blue-700 border-gray-200 shadow-lg shadow-gray-200 font-sans">
                <div className="title mx-20 my-10 font-extrabold text-5xl text-white hover:text-yellow-200 hover:text-6xl transition-all ease-in duration-200">
                    Gym Daily Planner
                </div>
                <button 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-10"
                onClick={() => {setNewNoteView(true)}}>
                    Add Plan
                </button>
            </header>
        </>
    )
}

export default Header;