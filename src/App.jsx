import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import Header from "./components/layout/Header.jsx";
import DetailModal from "./components/modals/DetailModal.jsx";
import AuthModal from "./components/modals/AuthModal.jsx";
import DiscoverPage from "./pages/DiscoverPage.jsx";
import LibraryPage from "./pages/LibraryPage.jsx";
import { getFavorites, addFavorite, removeFavorite } from "./api/api.js";
import "./styles/global.scss";

function AppContent() {
    const { user, token } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showAuth, setShowAuth] = useState(false);

    useEffect(() => {
        if (!token) { setFavorites([]); return; }
        getFavorites(token).then(setFavorites).catch(() => { });
    }, [token]);

    const handleFavoriteToggle = async (item) => {
        if (!token) { setShowAuth(true); return; }

        const id = item.imdbID || item.id;
        const isFav = favorites.some((f) => f.mediaId === id);

        try {
            if (isFav) {
                await removeFavorite(token, id);
                setFavorites((prev) => prev.filter((f) => f.mediaId !== id));
            } else {
                const fav = await addFavorite(token, {
                    mediaId: id,
                    mediaType: item.type === "book" ? "book" : "movie",
                    title: item.Title || item.title,
                    poster: item.Poster || item.thumbnail,
                    year: item.Year || item.publishedDate?.slice(0, 4),
                });
                setFavorites((prev) => [...prev, fav]);
            }
        } catch (e) {
            console.error(e.message);
        }
    };

    return (
        <>
            <Header
                favCount={favorites.length}
                onAuthClick={() => setShowAuth(true)}
            />

            <main>
                <Routes>
                    {/* Public route */}
                    <Route
                        path="/"
                        element={
                            <DiscoverPage
                                favorites={favorites}
                                onFavoriteToggle={handleFavoriteToggle}
                                onCardClick={setSelectedItem}
                            />
                        }
                    />

                    {/* Protected route — redirect to home if not logged in */}
                    <Route
                        path="/library"
                        element={
                            user ? (
                                <LibraryPage
                                    favorites={favorites}
                                    onFavoriteToggle={handleFavoriteToggle}
                                    onCardClick={setSelectedItem}
                                />
                            ) : (
                                <Navigate to="/" replace />
                            )
                        }
                    />

                    {/* Catch-all */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>

            {selectedItem && (
                <DetailModal
                    item={selectedItem}
                    token={token}
                    onClose={() => setSelectedItem(null)}
                />
            )}

            {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
        </>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </BrowserRouter>
    );
}