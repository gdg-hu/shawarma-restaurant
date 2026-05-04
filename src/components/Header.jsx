import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: '/', label: '🚪 المدخل' },
    { to: '/menu', label: '📋 القائمة' },
    { to: '/about', label: '📜 شهادة الصحة' },
    { to: '/login', label: '🔐 الباب الخلفي' },
    { to: '/register', label: '📝 تسجيل موظف' },
  ];

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo">
          <span className="logo-icon">🥙</span>
          <span className="logo-text">أبو شاورما</span>
        </Link>

        <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`nav-link ${location.pathname === to ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          className="burger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
