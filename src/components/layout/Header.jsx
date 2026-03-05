import { useAuth } from "../../context/AuthContext.jsx";
import "./Header.css";

export default function Header({ tab, onTabChange, favCount, onAuthClick }) {
    const { user, logout } = useAuth();

    return (
        <header className="header">
            <div className="header-inner">

                <div className="logo">
                    <span className="logo-icon">◈</span>
                    <span className="logo-text">Reel<em>Reads</em></span>
                </div>

                <nav className="nav">
                    <button
                        className={`nav-btn ${tab === "search" ? "active" : ""}`}
                        onClick={() => onTabChange("search")}
                    >
                        Discover
                    </button>
                    <button
                        className={`nav-btn ${tab === "library" ? "active" : ""}`}
                        onClick={() => user ? onTabChange("library") : onAuthClick()}
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
