import React from 'react'
import SideBar from './SideBar'
import Products from './Products'

function Body() {
  return (
    <div className='mt-6 flex container mx-auto justify-between px-20'>
        <SideBar />
        <Products />
    </div>
  )
}

export default Body