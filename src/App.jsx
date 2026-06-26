import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Navbar } from './Navbar'
import { HomePage } from './HomePage'
import { ProduitsPage } from './ProduitsPage'
import { PersonnaliserPage } from './PersonnaliserPage'
import { PersonnaliserProduitPage } from './PersonnaliserProduitPage'
import { ContactPage } from './ContactPage'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/produits" element={<ProduitsPage />} />
          <Route path="/personnaliser" element={<PersonnaliserPage />} />
          <Route path="/personnaliser/:productId/:templateId" element={<PersonnaliserProduitPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
