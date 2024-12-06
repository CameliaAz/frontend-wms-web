// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar'; // Pastikan Anda memiliki komponen Sidebar
import AdminDashboard from './pages/admin/dashboard'; // Admin Dashboard
import AdminBarangMasuk from "./pages/admin/transaksi_barang/barang_masuk";
// import AdminBarangKeluar from "./pages/admin/transaksi_barang/barang_keluar";
import ManagerDashboard from './pages/manajer/dashboard'; // Manager Dashboard
import Navbar from './components/Nav';

const App = () => {
  const userRole = 'admin'; // Ini bisa didapatkan dari API atau state management

  return (
    <Router>
      {/* Sidebar Dinamis berdasarkan Role */}
      <div className="app-container">
        <Navbar />
        <Sidebar role={userRole} /> {/* Sidebar berubah berdasarkan role */}

        <div className="content-area">
          <Routes>
            {/* Admin Routes */}
            {userRole === 'admin' && (
              <>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/transaksi_barang/barang_masuk" element={<AdminBarangMasuk />} />
                {/* <Route path="/admin/transaksi_barang/barang_keluar" element={<AdminBarangKeluar />} /> */}
                
              </>
            )}

            {/* Manajer Routes */}
            {userRole === 'manajer' && (
              <>
                <Route path="/manajer/dashboard" element={<ManagerDashboard />} />
                <Route path="/manajer/laporan" element={<div>Report</div>} /> {/* Ganti dengan komponen yang sesuai */}
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
