import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from '../components/Footer'
import {Header} from '../components/Header'
export const AppLayout = () => {
  return (
   <>
   <Header />
   <main className='min-h-screen pt-14'>
    <Outlet />
   </main>
   <Footer />
   </>
  )
}
