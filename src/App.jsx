import { useEffect } from 'react'
import { useLocation, Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { Navbar } from './Navbar'
import { HomePage } from './HomePage'
import { ProduitsPage } from './ProduitsPage'
import { PersonnaliserProduitPage } from './PersonnaliserProduitPage'
import { ContactPage } from './ContactPage'
import { Footer } from './Footer'

import { AProposPage } from './AProposPage'
import { AdminHistoryPage } from './AdminHistoryPage'
import { PageTransition } from '@/components/PageTransition'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  const location = useLocation()

  return (
    <div className="font-sans antialiased min-h-screen flex flex-col bg-background text-foreground">
      <div key={`progress-${location.pathname}`} className="top-progress-bar" />
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
            <Route path="/produits" element={<PageTransition><ProduitsPage /></PageTransition>} />
            <Route path="/personnaliser" element={<Navigate to="/produits" replace />} />
            <Route path="/personnaliser/:productId/:templateId" element={<PageTransition><PersonnaliserProduitPage /></PageTransition>} />
            <Route path="/apropos" element={<PageTransition><AProposPage /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
            <Route path="/admin/historique" element={<PageTransition><AdminHistoryPage /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default App

