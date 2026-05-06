import React from 'react'
import UserNavbar from '../_components/UserNavbar'
import UserFooter from '../_components/UserFooter'

const layout = ({ children }: { children: React.ReactNode }) => {
    return <>
        {<UserNavbar />}
        {children}
        {<UserFooter />}
    </>
}

export default layout