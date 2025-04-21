import 'aos/dist/aos.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoriesPage from './components/CategoriesPage';
import AuthCard from './components/AuthCard';
import Login from './components/Login';
import Register from './components/Register';
import { Header, Acceuil, Footer } from './components/Acceuil';
import Profile from './components/Profile';
import { AuthProvider } from './components/AuthContext';
import Panier from './components/Panier';
import PrivateRoute from './routes/PrivateRoute';

const App = () => {
    return (
        <Router> {/* Ajoute le Router ici pour envelopper tes routes */}
            <AuthProvider> {/* Enveloppe avec le AuthProvider si nécessaire */}
                <Header />
                <Routes>
                    <Route path="/" element={<Acceuil />} />
                    <Route path="/authentification" element={<AuthCard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    {/* Routes protégées */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/product" element={<CategoriesPage />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/panier" element={<Panier />} />
                    </Route>
                </Routes>
                <Footer />
            </AuthProvider>
        </Router>
    );
};

export default App;
