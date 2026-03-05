import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { loginUser, registerUser } from "../../api/api.js";
import "./AuthModal.css";

export default function AuthModal({ onClose }) {
    const { login } = useAuth();
    const [mode, setMode] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async () => {
        setError("");
        setLoading(true);
        try {
            const data = mode === "login"
                ? await loginUser(email, password)
                : await registerUser(name, email, password);
            login(data.user, data.token);
            onClose();
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="auth-modal" onClick={(e) => e.stopPropagation()}>

                <button className="auth-modal__close" onClick={onClose}>✕</button>
                <h2 className="auth-modal__heading">
                    {mode === "login" ? "Welcome Back" : "Create Account"}
                </h2>

                <div className="auth-modal__tabs">
                    <button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>Log In</button>
                    <button className={mode === "register" ? "active" : ""} onClick={() => setMode("register")}>Sign Up</button>
                </div>

                {mode === "register" && (
                    <input className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                )}
                <input className="input" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="input" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} />

                {error && <p className="form-error">{error}</p>}

                <button className="btn-primary" onClick={submit} disabled={loading}>
                    {loading ? "Please wait…" : mode === "login" ? "Log In" : "Create Account"}
                </button>

            </div>
        </div>
    );
}
