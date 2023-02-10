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
import { Container } from '@chakra-ui/react'
import { AppHeader } from './ui/molecules/AppHeader'

export const App = () => {
    return (
        <div className="App">
            <AppHeader />
            <Container>
                <Routes>
                    <Route path='/' element={<AllDiscrepancies />} />
                    <Route path='/game/:gameId' element={<GameDiscrepancies />} />
                    <Route path='/team/:teamId' element={<TeamDiscrepancies />} />
                    <Route path='/player/:playerId' element={<PlayerDiscrepancies />} />
                </Routes>
            </Container>
        </div>
    )
}
