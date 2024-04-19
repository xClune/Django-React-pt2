import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react' 

function Header ({setNewNoteView}) {
    const navigate = useNavigate()

    const { pathname } = useLocation();
    const [hidden, setHidden] = useState('');

    useEffect(() => {
        if (pathname === '/') {
            setHidden('');
        } else {
            setHidden('hidden')
        }
    }, [])

    return (
        <>
            <header className={`
            h-30
            flex flex-col items-center
            bg-stone-700 border-b-2 border-gray-200 
            shadow-lg shadow-gray-200
            sm:h-24 sm:justify-between sm:flex sm:flex-row py-1`}>
                <div className={`title flex flex-row items-center
                text-white font-extrabold text-2xl 
                mx-10 my-10
                sm:text-3xl
                md:text-4xl
                transition-all ease-in duration-200`}>
                    <svg width="120" height="87" viewBox="0 0 120 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Frame 2" className='group'>
                            <g id="Outer Group" className='peer'>
                                <path id="Outer" d="M45.7928 67.3312L45.7972 58.204L36.9175 58.2061L57.8037 22.261L78.6939 58.2007L69.8027 58.1961L69.8101 67.3299L94.6031 67.3272L57.8006 4L21 67.3339L45.7928 67.3312Z" fill="white"/>
                            </g>
                            <g id="Arrow Group" className='group-hover:-translate-y-8 transition-all ease-out duration-700'>
                                <path id="Inner" d="M58 64L46.453 84H69.547L58 64ZM60 84V82H56V84H60Z" fill="white"/>
                            </g>
                        </g>
                    </svg>
                    TrainSense
                </div>
                <div className={`buttons  flex flex-row items-center justify-end ${hidden}`}>
                    <button 
                    className={`
                    text-white font-medium bg-stone-700 
                    py-2.5 px-5 mb-50 ml-5
                    text-center text-xs sm:text-sm w-auto 
                    hover:bg-stone-800 
                    focus:ring-4 focus:outline-none focus:ring-stone-300 rounded-lg
                    sm:w-auto sm:ml-0 sm:mb-0 sm:items-center sm:justify-center
                    dark:bg-stone-600 dark:hover:bg-stone-300 dark:focus:ring-stone-800 mr-10`}
                    onClick={() => {setNewNoteView(true)}}>
                        Add New
                    </button>
                    <button 
                    className={`
                    text-white font-medium bg-stone-700 
                    py-2.5 px-5 mb-5 ml-5
                    text-center text-sm w-auto 
                    hover:bg-stone-800 
                    focus:ring-4 focus:outline-none focus:ring-stone-300 rounded-lg
                    sm:w-auto sm:ml-0 sm:mb-0 sm:items-center sm:justify-center
                    dark:bg-stone-600 dark:hover:bg-stone-300 dark:focus:ring-stone-800 mr-10`}
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