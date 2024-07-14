import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import About from './About';
import Contact from './Contact';
import SignUp from './Signup'; // Corrected import path
import Catalog from './BookCatalog'; // Adjusted import path

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/SignUp" element={<SignUp />} /> {/* Ensure correct case */}
        <Route path="/Catalog" element={<Catalog />} /> {/* Adjusted route path */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
