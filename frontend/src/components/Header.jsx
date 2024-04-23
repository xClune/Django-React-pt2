import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react' 
import Logo from '../assets/Logo'
import MenuLogo from '../assets/MenuLogo'


function Header ({setNewNoteView, setNewFolderView}) {
    const navigate = useNavigate()

    const { pathname } = useLocation();
    const [hidden, setHidden] = useState('hidden');
    const [navMenu, setNavMenu] = useState(false);

    useEffect(() => {pathname === '/' ? setHidden('') : setHidden('hidden')},[])

    return (
        <>
            <header className={`h-20 items-center
            bg-stone-700 border-b-2 border-gray-200 
            shadow-lg shadow-gray-200
            sm:h-24 justify-between flex flex-row m-0 w-screen`}>
                <div className={` 
                ml-3
                sm:mx-10 sm:my-10
                transition-all ease-in duration-200 h-full flex flex-row items-center`}>
                    <Logo />
                    <div className='title
                    text-white font-extrabold text-2xl sm:text-3xl hidden sm:block'>
                        SmartCards
                    </div>
                </div>
                <div className='block lg:hidden mr-3' onClick={() => {setNavMenu(!navMenu)}}>
                    <MenuLogo />
                </div>
                <div className={`${hidden}`}>
                <div className={`buttons flex flex-row items-center justify-end lg:block`}>
                    <button 
                    className={`
                    text-white font-medium bg-stone-700 
                    py-2.5 px-5 mb-50 ml-5
                    text-center text-xs sm:text-sm w-auto 
                    hover:bg-stone-800 
                    focus:ring-4 focus:outline-none focus:ring-stone-300 rounded-lg
                    sm:w-auto sm:ml-0 sm:mb-0 sm:items-center sm:justify-center
                    dark:bg-stone-600 dark:hover:bg-stone-300 dark:focus:ring-stone-800 mr-10`}
                    onClick={() => {setNewFolderView(true)}}>
                        Add Folder
                    </button>
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
                        Add Card
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
                </div>
            </header>
            {navMenu === true && 
            <div className='w-full h-auto bg-stone-500 flex flex-col items-center -my-1 [&>*]:w-full [&>*]:text-end  [&>*]:text-white [&>*]:border-b [&>*]:border-stone-700'>
                <div className='py-1 hover:bg-stone-300' onClick={() => {setNewFolderView(true)}}>
                    <span className='mr-4'>New Folder</span>
                </div>
                <div className='py-1 hover:bg-stone-300' onClick={() => {setNewNoteView(true)}}>
                    <span className='mr-4'>New Card</span>
                </div>
                <div className='py-1 hover:bg-stone-300' onClick={() => {
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