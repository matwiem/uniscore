import React from 'react'
import { Route, Routes } from 'react-router-dom'

import {
    AllDiscrepancies
} from './pages/AllDiscrepancies'
import {
    PlayerDiscrepancies
} from './pages/PlayerDiscrepancies'
import { TeamDiscrepancies } from './pages/TeamDiscrepancies'
import { GameDiscrepancies } from './pages/GameDiscrepancies'

export const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<AllDiscrepancies />} />
                <Route path='/game/:gameId' element={<GameDiscrepancies />} />
                <Route path='/team/:teamId' element={<TeamDiscrepancies />} />
                <Route path='/player/:playerId' element={<PlayerDiscrepancies />} />
            </Routes>
        </div>
    )
}
