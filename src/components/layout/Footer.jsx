import { NavLink } from "react-router-dom";
import "./Footer.scss";

export default function Footer({ onAuthClick }) {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer__inner">

                {/* Brand */}
                <div className="footer__brand">
                    <NavLink to="/" className="footer__logo">
                        <span className="footer__logo-icon">◈</span>
                        <span className="footer__logo-text">Reel<em>Reads</em></span>
                    </NavLink>
                    <p className="footer__tagline">
                        Find. Watch. <em>Review.</em>
                    </p>
                </div>

                {/* Nav columns */}
                <nav className="footer__nav">
                    <div className="footer__col">
                        <p className="footer__col-heading">Navigate</p>
                        <NavLink to="/" className="footer__link">Discover</NavLink>
                        <button className="footer__link" onClick={onAuthClick}>My Library</button>
                        <button className="footer__link" onClick={onAuthClick}>Sign In</button>
                    </div>
                    <div className="footer__col">
                        <p className="footer__col-heading">Connect</p>
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="footer__link">GitHub ↗</a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer__link">LinkedIn ↗</a>
                    </div>
                </nav>

            </div>

            {/* Bottom bar */}
            <div className="footer__bottom">
                <p>© {year} ReelReads · Built by Divya N</p>
                <p className="footer__bottom-tech">React · Node.js · MongoDB</p>
            </div>
        </footer>
    );
}