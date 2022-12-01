import React from 'react'
import Request from '../Request/Request'
import Sidebar from './Sidebar'

function Page() {

    return (
        <div className='main-page'>
                <Sidebar/>
                <Request/>
        </div>
    )
}

export default Page