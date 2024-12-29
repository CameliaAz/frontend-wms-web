import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Unauthorized from './pages/Unauthorized';
import LoginPage from './pages/login/LoginPage';
import Sidebar from './components/Sidebar';
import AdminDashboard from './pages/admin/dashboard';
import AdminBarangMasuk from './pages/admin/transaksi_barang/barang_masuk';
import AdminBarangKeluar from './pages/admin/transaksi_barang/barang_keluar';
import AdminLokasiBarang from './pages/admin/lokasi_barang/lokasi_barang';
import AdminPemindahanBarang from './pages/admin/pemindahan_barang';
import AdminCRUDRak from './pages/admin/lokasi_barang/data_rak';
import AdminCRUDUser from './pages/admin/user/user';
import AdminCRUDSupplier from './pages/admin/user/supplier';
import AdminCRUDKategori from './pages/admin/user/kategori';
import AdminCRUDBarang from './pages/admin/barang/barang';
import ManajerDashboard from './pages/manajer/dashboard';
import ManajerLaporan from './pages/manajer/laporan';
import Navbar from './components/Nav';

const App = () => {
  const [userRole, setUserRole] = useState(null);

  // Fetch the user role from localStorage
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role) {
      setUserRole(role);
    }
  }, []);

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/login/LoginPage" />} />
        {/* Public Route */}
        <Route path="/login/LoginPage" element={<LoginPage />} />
        <Route path="/Unauthorized" element={<Unauthorized />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute allowedRoles={['admin','manager']} />}>
          <Route
            path="/*"
            element={
              <div className="app-container">
                <Navbar />
                <Sidebar role={userRole} />
                <div className="content-area">
                  <Routes>
                    {/* Admin Routes */}
                    {userRole === 'admin' && (
                      <>
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        <Route path="/admin/transaksi_barang/barang_masuk" element={<AdminBarangMasuk />} />
                        <Route path="/admin/transaksi_barang/barang_keluar" element={<AdminBarangKeluar />} />
                        <Route path="/admin/lokasi_barang/lokasi_barang" element={<AdminLokasiBarang />} />
                        <Route path="/admin/pemindahan_barang" element={<AdminPemindahanBarang />} />
                        <Route path="/admin/user/user" element={<AdminCRUDUser />} />
                        <Route path="/admin/user/supplier" element={<AdminCRUDSupplier />} />
                        <Route path="/admin/user/kategori" element={<AdminCRUDKategori />} />
                        <Route path="/admin/barang/barang" element={<AdminCRUDBarang />} />
                        <Route path="/admin/lokasi_barang/data_rak" element={<AdminCRUDRak />} />
                      </>
                    )}

                    {/* Manager Routes */}
                    {userRole === 'manager' && (
                      <>
                        <Route path="/manajer/dashboard" element={<ManajerDashboard />} />
                        <Route path="/manajer/laporan" element={<ManajerLaporan />} />
                      </>
                    )}
                  </Routes>
                </div>
              </div>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;