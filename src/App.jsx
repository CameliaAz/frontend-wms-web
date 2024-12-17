import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';
import AdminDashboard from './pages/admin/dashboard';
import AdminBarangMasuk from "./pages/admin/transaksi_barang/barang_masuk";
import AdminBarangKeluar from "./pages/admin/transaksi_barang/barang_keluar";
import AdminLokasiBarang from './pages/admin/lokasi_barang';
import AdminPemindahanBarang from './pages/admin/pemindahan_barang';
import ManajerDashboard from './pages/manajer/dashboard';
import Navbar from './components/Nav';

const App = () => {
  const userRole = 'admin'; // Ini bisa didapatkan dari API atau state management

  return (
    <Router>
  <Routes>
    {/* Route Login */}
    <Route path="/login" element={<LoginPage />} />

    {/* Private Routes */}
    <Route
      path="/*"
      element={
  
          <div className="app-container">
            <Navbar />
            <Sidebar role={userRole} />
            <div className="content-area">
              <Routes>
                <Route 
                path="/admin/dashboard" 
                element={<AdminDashboard />} 
                />
                <Route
                  path="/admin/transaksi_barang/barang_masuk"
                  element={<AdminBarangMasuk />}
                />
                <Route
                  path="/admin/transaksi_barang/barang_keluar"
                  element={<AdminBarangKeluar />}
                />
                <Route
                  path="/admin/lokasi_barang"
                  element={<AdminLokasiBarang />}
                />
                <Route
                  path="/admin/pemindahan_barang"
                  element={<AdminPemindahanBarang />}
                />
                 <Route 
                path="/manajer/dashboard" 
                element={<ManajerDashboard />} 
                />
                <Route 
                path="/manajer/laporan" 
                element={<ManajerDashboard />} 
                />
              </Routes>
            </div>
          </div>
      }
    />
  </Routes>
</Router>
  );
};

export default App;
