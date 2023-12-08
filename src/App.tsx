import React from 'react'
import MainLayout from './components/layout/MainLayout.tsx'
import { Routes, Route } from "react-router-dom"
import VpnPage from './pages/VpnPage/index.tsx'
import StatisticsPage from './pages/StatisticsPage/index.tsx'
import SoftwarePage from './pages/SoftwarePage/index.tsx'
import MapPage from './pages/MapPage/index.tsx'
import ClientsPage from './pages/ClientsPage/index.tsx'

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route path="" element={<VpnPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/sw" element={<SoftwarePage />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </>
  )
}

export default App