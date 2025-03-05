import 'aos/dist/aos.css';
import React from 'react';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import CategoriesPage from './components/CategoriesPage';
import AuthCard from './components/AuthCard';
import Login from './components/Login';
import Register from './components/Register';
import { Header, Acceuil , Footer} from './components/Acceuil';
import Profile from './components/Profile';
import { AuthProvider } from './components/AuthContext';
import Panier from './components/Panier';
const App = () => {
    return (
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Acceuil/>} />
            <Route path="/authentification" element={<AuthCard/>} />
            <Route path="/product" element={<CategoriesPage/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/profile" element={<Profile />} /> 
            <Route path="/panier" element={<Panier/>} /> 
            </Routes>
            <Footer/>
        </Router>
        </AuthProvider>
    );
};

export default App;