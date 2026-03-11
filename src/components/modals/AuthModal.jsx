import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { loginUser, registerUser } from "../../api/api.js";
import "./AuthModal.scss";

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function AuthModal({ onClose }) {
    const { login } = useAuth();
    const [mode, setMode] = useState("login");
    const [view, setView] = useState("auth"); // "auth" | "forgot"

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errors, setErrors] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [resetSent, setResetSent] = useState(false);

    const switchMode = (m) => {
        setMode(m);
        setErrors({});
        setError("");
        setConfirmPassword("");
    };

    const validate = () => {
        const e = {};
        if (mode === "register" && !name.trim()) e.name = "Name is required";
        if (!email.trim()) e.email = "Email is required";
        else if (!validateEmail(email)) e.email = "Enter a valid email address";
        if (!password) e.password = "Password is required";
        else if (password.length < 6) e.password = "Password must be at least 6 characters";
        if (mode === "register" && password !== confirmPassword)
            e.confirmPassword = "Passwords do not match";
        return e;
    };

    const submit = async () => {
        const fieldErrors = validate();
        if (Object.keys(fieldErrors).length > 0) return setErrors(fieldErrors);

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

    const submitReset = async () => {
        if (!validateEmail(email)) return setErrors({ email: "Enter a valid email address" });
        // TODO: call your forgot-password API here e.g. await requestPasswordReset(email)
        setResetSent(true);
    };

    // ── Forgot Password View ──────────────────────────────────────────────────
    if (view === "forgot") return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
                <button className="auth-modal__close" onClick={onClose}>✕</button>
                <h2 className="auth-modal__heading">Reset Password</h2>
                <p className="auth-modal__subtext">
                    Enter your email and we'll send you a reset link.
                </p>

                {resetSent ? (
                    <p className="form-success">✓ Reset link sent — check your inbox.</p>
                ) : (
                    <>
                        <input
                            className={`input ${errors.email ? "input--error" : ""}`}
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); setErrors({}); }}
                        />
                        {errors.email && <p className="form-error">{errors.email}</p>}
                        <button className="btn-primary" onClick={submitReset}>
                            Send Reset Link
                        </button>
                    </>
                )}

                <button className="auth-modal__link" onClick={() => { setView("auth"); setResetSent(false); setErrors({}); }}>
                    ← Back to log in
                </button>
            </div>
        </div>
    );

    // ── Main Auth View ────────────────────────────────────────────────────────
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
                <button className="auth-modal__close" onClick={onClose}>✕</button>
                <h2 className="auth-modal__heading">
                    {mode === "login" ? "Welcome Back" : "Create Account"}
                </h2>

                <div className="auth-modal__tabs">
                    <button className={mode === "login" ? "active" : ""} onClick={() => switchMode("login")}>Log In</button>
                    <button className={mode === "register" ? "active" : ""} onClick={() => switchMode("register")}>Sign Up</button>
                </div>

                {mode === "register" && (
                    <>
                        <input
                            className={`input ${errors.name ? "input--error" : ""}`}
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <p className="form-error">{errors.name}</p>}
                    </>
                )}

                <input
                    className={`input ${errors.email ? "input--error" : ""}`}
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="form-error">{errors.email}</p>}

                <input
                    className={`input ${errors.password ? "input--error" : ""}`}
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && submit()}
                />
                {errors.password && <p className="form-error">{errors.password}</p>}

                {mode === "register" && (
                    <>
                        <input
                            className={`input ${errors.confirmPassword ? "input--error" : ""}`}
                            placeholder="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && submit()}
                        />
                        {errors.confirmPassword && <p className="form-error">{errors.confirmPassword}</p>}
                    </>
                )}

                {mode === "login" && (
                    <button
                        className="auth-modal__link"
                        onClick={() => { setView("forgot"); setErrors({}); setError(""); }}
                    >
                        Forgot password?
                    </button>
                )}

                {error && <p className="form-error">{error}</p>}

                <button className="btn-primary" onClick={submit} disabled={loading}>
                    {loading ? "Please wait…" : mode === "login" ? "Log In" : "Create Account"}
                </button>
            </div>
        </div>
    );
}