import React from 'react'
import { Route, Routes } from 'react-router-dom'

import {
    AllDiscrepancies
} from './pages/all-discrepancies/AllDiscrepancies'

export const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<AllDiscrepancies />} />
                <Route path='/game/:gameId' element={<p>game's discrepancies</p>} />
                <Route path='/team/:teamId' element={<p>teams's discrepancies</p>} />
                <Route path='/player/:playerId' element={<p>player's discrepancies</p>} />
            </Routes>
        </div>
    )
}
