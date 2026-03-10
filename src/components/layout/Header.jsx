import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Header.scss";

export default function Header({ favCount, onAuthClick }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Close menu on route change
    useEffect(() => { setMenuOpen(false); }, [location]);

    // Close menu on outside click
    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleLibraryClick = () => {
        setMenuOpen(false);
        if (!user) {
            onAuthClick();
        } else {
            navigate("/library");
        }
    };

    return (
        <header className="header">
            <div className="header-inner">

                {/* Logo */}
                <NavLink to="/" className="logo">
                    <span className="logo-icon">◈</span>
                    <span className="logo-text">Reel<em>Reads</em></span>
                </NavLink>

                {/* Desktop nav — hidden on mobile */}
                <nav className="nav nav--desktop">
                    <NavLink
                        to="/"
                        className={({ isActive }) => `nav-btn ${isActive ? "active" : ""}`}
                    >
                        Discover
                    </NavLink>
                    <button
                        className={`nav-btn ${location.pathname === "/library" ? "active" : ""}`}
                        onClick={handleLibraryClick}
                    >
                        My Library
                        {favCount > 0 && <span className="badge">{favCount}</span>}
                    </button>
                </nav>

                <div className="header-right">
                    {/* Auth — always visible */}
                    <div className="header-auth">
                        {user ? (
                            <div className="user-chip">
                                <span>{user.name}</span>
                                <button className="logout-btn" onClick={logout}>Sign Out</button>
                            </div>
                        ) : (
                            <button className="btn-primary small" onClick={onAuthClick}>
                                Sign In
                            </button>
                        )}
                    </div>

                    {/* Hamburger — only on mobile */}
                    <button
                        className={`burger ${menuOpen ? "open" : ""}`}
                        onClick={() => setMenuOpen(o => !o)}
                        aria-label="Toggle menu"
                        ref={menuRef}
                    >
                        <span /><span /><span />
                    </button>
                </div>

            </div>

            {/* Mobile dropdown */}
            <div className={`nav-mobile ${menuOpen ? "nav-mobile--open" : ""}`}>
                <NavLink
                    to="/"
                    className={({ isActive }) => `nav-mobile__link ${isActive ? "active" : ""}`}
                    onClick={() => setMenuOpen(false)}
                >
                    Discover
                </NavLink>
                <button
                    className={`nav-mobile__link ${location.pathname === "/library" ? "active" : ""}`}
                    onClick={handleLibraryClick}
                >
                    My Library
                    {favCount > 0 && <span className="badge">{favCount}</span>}
                </button>
            </div>
        </header>
    );
}