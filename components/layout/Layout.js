import React from 'react'
import Link from 'next/link'
import Header from './Header'

const Layout = ({children}) => {
  return (
    <>  
        <Header />

        <main>
            {children}
        </main>
    </>
    
  )
}

export default Layout