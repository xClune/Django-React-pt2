import { useState } from 'react'
import api from "../api"
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import LoadingIndicator from './LoadingIndicator'

function LoginForm ({route, method}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const title = method === "login" ? "Login" : "Register"

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        try {
            const res = await api.post(route, { username, password })
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate('/')
            } else {
                navigate('/login')
            }
        } catch(error){
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    const switchPage = () => {
        if (method === "login"){navigate('/register')}
        else {navigate('/login')}
    }

    return (
        <form onSubmit={handleSubmit} 
        className='max-w-sm mx-auto flex flex-col justify-start items-center mt-10'>
            <h1 className='text-3xl'>{title}</h1>
            <div>
                <label htmlFor='username' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'> 
                </label>
                <input 
                className='form-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-stone-500 focus:border-stone-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-stone-500 dark:focus:border-stone-500'
                name='username'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Username'
                />
            </div>
            <div className='mb-5'>
                <label htmlFor="password" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>    
                </label>
                <input 
                className='form-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-stone-500 focus:border-stone-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-stone-500 dark:focus:border-stone-500'
                name='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                />
            </div>
            
            {loading && <LoadingIndicator />}
            <button className='form-button text-white bg-stone-700 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-stone-600 dark:hover:bg-stone-700 dark:focus:ring-stone-800' type='submit'>
                {title}
            </button>
            {method === "login" ? <a className='text-stone-600 mt-2' onClick={switchPage}>Register</a> : 
            <a className='text-stone-600 mt-2' onClick={switchPage}>Login</a>}
        </form>
    );
}

export default LoginForm
