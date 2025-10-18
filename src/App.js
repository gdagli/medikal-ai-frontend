import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';       // pages klasöründen import ettik
import ProjectsPage from './pages/ProjectsPage'; // pages klasöründen import ettik
import AnalysisPage from './pages/AnalysisPage';
import ContactPage from './pages/ContactPage';   // pages klasöründen import ettik
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projeler" element={<ProjectsPage />} />
          <Route path="/analiz" element={<AnalysisPage />} />
          <Route path="/iletisim" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;