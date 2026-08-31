import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Navbar } from './Navbar'
import { HomePage } from './HomePage'
import { ProduitsPage } from './ProduitsPage'
import { PersonnaliserPage } from './PersonnaliserPage'
import { PersonnaliserProduitPage } from './PersonnaliserProduitPage'
import { ContactPage } from './ContactPage'
import { Footer } from './Footer'

function App() {
  return (
    <div className="font-sans antialiased min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/produits" element={<ProduitsPage />} />
          <Route path="/personnaliser" element={<PersonnaliserPage />} />
          <Route path="/personnaliser/:productId/:templateId" element={<PersonnaliserProduitPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
