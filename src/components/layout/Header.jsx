import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Header.scss";

export default function Header({ favCount, onAuthClick }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLibraryClick = () => {
        if (!user) {
            onAuthClick();
        } else {
            navigate("/library");
        }
    };

    return (
        <header className="header">
            <div className="header-inner">

                <NavLink to="/" className="logo">
                    <span className="logo-icon">◈</span>
                    <span className="logo-text">Reel<em>Reads</em></span>
                </NavLink>

                <nav className="nav">
                    <NavLink
                        to="/"
                        className={({ isActive }) => `nav-btn ${isActive ? "active" : ""}`}
                    >
                        Discover
                    </NavLink>
                    <button
                        className={`nav-btn ${window.location.pathname === "/library" ? "active" : ""}`}
                        onClick={handleLibraryClick}
                    >
                        My Library
                        {favCount > 0 && <span className="badge">{favCount}</span>}
                    </button>
                </nav>

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

            </div>
        </header>
    );
}