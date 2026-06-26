import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        CustomPrint
      </Link>
      <div className="nav-links">
        <Link to="/">Accueil</Link>
        <Link to="/produits">Produits</Link>
        <Link to="/personnaliser">Personnaliser</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}