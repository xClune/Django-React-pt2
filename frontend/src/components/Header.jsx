
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react' 

import Logo from '../assets/Logo'
import MenuLogo from '../assets/MenuLogo'


function Header ({setNewNoteView, setNewFolderView, stats, getStats}) {

    // Determine path for header display
    const { pathname } = useLocation();

    // Load stats
    if (pathname === '/') {useEffect(() => {getStats()},[])}

    // use states different displays
    const [hidden, setHidden] = useState('hidden');
    const [navMenu, setNavMenu] = useState(false);
    useEffect(() => {
        pathname === '/' ? setHidden('') : setHidden('hidden')
    },[])

    // declare navigate function
    const navigate = useNavigate()


    return (
        <>
            <header className={`h-20 items-center
             border-b-2 border-gray-200 
            shadow-lg shadow-gray-200
            sm:h-24 justify-between flex flex-row m-0 w-screen bg-gradient-to-l from-stone-700 to-purple-800`}>
                <div className={` 
                ml-3
                sm:mx-10 sm:my-10
                transition-all ease-in duration-200 h-full flex flex-row items-center`}>
                    <Logo/>
                    <div className='title
                    text-white font-extrabold text-2xl sm:text-3xl hidden md:block'>
                        SmartCards
                    </div>
                </div>

                {/* Retrieve stats for user */}
                {stats ? 
                    (stats.map((stat) => {
                        return (
                            <div className='flex flex-col items-center gap-2' key={stat.id}>
                                <h2 className={`text-white font-bold ${hidden}`}>Current Level: {stat.level}</h2>
                                <progress className={`${hidden} bg-blue-400`} value={stat.exp} max={stat.level*100}/>
                                <h2 className={`text-white ${hidden}`}>{`${stat.exp}/${stat.level*100} xp`}</h2>
                            </div>
                            )
                        }
                    )) : null
                }

                {/* Hamburger menu on mobile display */}
                <div className='block lg:hidden mr-3' onClick={() => {setNavMenu(!navMenu)}}>
                    <MenuLogo />
                </div>

                {/* Buttons for desktop display */}
                <div className={`${hidden}`}>
                    <div className={`buttons flex flex-row items-center justify-end `}>
                        <button 
                        className={`hidden lg:block
                        text-white font-medium bg-purple-700 
                        py-2.5 px-5 mb-50 ml-5
                        text-center text-xs sm:text-sm w-auto 
                        hover:bg-purple-800 
                        focus:ring-4 focus:outline-none focus:ring-stone-300 rounded-lg
                        sm:w-auto sm:ml-0 sm:mb-0 sm:items-center sm:justify-center
                        dark:bg-purple-600 dark:hover:bg-purple-400 dark:focus:ring-purple-800 mr-10`}
                        onClick={() => {setNewFolderView(true)}}>
                            Add Folder
                        </button>
                        <button 
                        className={`hidden lg:block
                        text-white font-medium bg-purple-700 
                        py-2.5 px-5 mb-50 ml-5
                        text-center text-xs sm:text-sm w-auto 
                        hover:bg-purple-800 
                        focus:ring-4 focus:outline-none focus:ring-purple-300 rounded-lg
                        sm:w-auto sm:ml-0 sm:mb-0 sm:items-center sm:justify-center
                        dark:bg-purple-600 dark:hover:bg-purple-300 dark:focus:ring-purple-800 mr-10`}
                        onClick={() => {setNewNoteView(true)}}>
                            Add Card
                        </button>
                        <button 
                        className={`hidden lg:block
                        text-white font-medium bg-purple-700 
                        py-2.5 px-5 mb-5 ml-5
                        text-center text-sm w-auto
                        hover:bg-purple-800 
                        focus:ring-4 focus:outline-none focus:ring-purple-300 rounded-lg
                        sm:w-auto sm:ml-0 sm:mb-0 sm:items-center sm:justify-center
                        dark:bg-purple-600 dark:hover:bg-purple-300 dark:focus:ring-purple-800 mr-10`}
                        onClick={() => {
                            navigate('/login')
                        }}>
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Dropdown for mobile nav menu */}
            {navMenu === true && 
            <div className='w-full h-auto bg-purple-500 flex flex-col items-center -my-1 [&>*]:w-full [&>*]:text-end  [&>*]:text-white [&>*]:border-b [&>*]:border-purple-700'>
                <div className='py-1 hover:bg-purple-300' onClick={() => {setNewFolderView(true)}}>
                    <span className='mr-4'>New Folder</span>
                </div>
                <div className='py-1 hover:bg-purple-300' onClick={() => {setNewNoteView(true)}}>
                    <span className='mr-4'>New Card</span>
                </div>
                <div className='py-1 hover:bg-purple-300' onClick={() => {
                        navigate('/login')
                    }}>
                    <span className='mr-4'>Logout</span>
                </div>
            </div>
            }
        </>
    )
}

export default Header;