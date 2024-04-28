import React from 'react'
import '../styles/Logo.css'

const Logo = () => {
  return (
    <>
        <svg viewBox="0 0 120 87" fill="none" xmlns="http://www.w3.org/2000/svg" className='group'>
            <g id="Frame 2" >
                <g id="Outer Group" className='fill-purple-100'>
                    <path id="Outer" d="M45.7928 67.3312L45.7972 58.204L36.9175 58.2061L57.8037 22.261L78.6939 58.2007L69.8027 58.1961L69.8101 67.3299L94.6031 67.3272L57.8006 4L21 67.3339L45.7928 67.3312Z" />
                </g>
                <g id="Arrow Group" className='group-hover:-translate-y-8 transition-all ease-out duration-700 fill-purple-100 group-hover:fill-purple-800'>
                    <path id="Inner" d="M58 64L46.453 84H69.547L58 64ZM60 84V82H56V84H60Z"/>
                </g>
            </g>
        </svg>
    </>
  )
}

export default Logo