import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Nav";
import Charts from "../../components/Charts";
import Card from "../../components/Card";
import axios from 'axios';

export default function AdminDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [chartData, setChartData] = useState([]);
    const [barangMasuk, setBarangMasuk] = useState(0);
    const [barangKeluar, setBarangKeluar] = useState(0);
    const [barangHampirHabis, setBarangHampirHabis] = useState([]);
    const [barangKadaluarsa, setBarangKadaluarsa] = useState([]);

    useEffect(() => {
        // Fetch data from API
        const fetchData = async () => {
            try {
                const [masukRes, keluarRes, topProductRes, lowStockRes, expiredRes] = await Promise.all([
                    axios.get("http://127.0.0.1:8000/api/barang-masuk"),
                    axios.get("http://127.0.0.1:8000/api/barang-keluar"),
                    axios.get("/api/top-products"),
                    axios.get("http://127.0.0.1:8000/api/rak"),
                    axios.get("http://127.0.0.1:8000/api/rak"),
                ]);

                setBarangMasuk(masukRes.data.total);
                setBarangKeluar(keluarRes.data.total);
                setChartData(topProductRes.data);
                setBarangHampirHabis(lowStockRes.data);
                setBarangKadaluarsa(expiredRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/");
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-64">
                <Sidebar role="admin" />
            </div>

            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
                {/* Navbar */}
                <header className="sticky top-0 shadow z-10">
                    <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                </header>

                {/* Content Area */}
                <main className="flex-1 pt-16 p-8">
                <div className="mt-8">
                            <h3 className="text-xl font-semibold mb-4">Notifikasi</h3>
                            <div className="bg-yellow-100 p-4 rounded mb-4">
                                <h4 className="font-semibold">Barang Hampir Habis</h4>
                                <ul className="list-disc list-inside">
                                    {Array.isArray(barangHampirHabis) && barangHampirHabis.length > 0 ? (
                                        barangHampirHabis.map((item, index) => (
                                            <li key={index}>{item.nama_barang} - Sisa: {item.jumlah}</li>
                                        ))
                                    ) : (
                                        <li>Data tidak tersedia</li>
                                    )}
                                </ul>
                            </div>

                            <div className="bg-red-100 p-4 rounded">
                                <h4 className="font-semibold">Barang Kadaluarsa</h4>
                                <ul className="list-disc list-inside">
                                    {Array.isArray(barangKadaluarsa) && barangKadaluarsa.length > 0 ? (
                                        barangKadaluarsa.map((item, index) => (
                                            <li key={index}>
                                                {item.nama_barang} - Kadaluarsa: {item.exp}
                                            </li>
                                        ))
                                    ) : (
                                        <li>Data tidak tersedia</li>
                                    )}
                                </ul>
                            </div>

                        </div>
                    <div className="bg-white p-6 rounded shadow">
                        <div className="mb-4">
                            <Charts data={chartData} />
                        </div>
                        <div className="flex gap-x-4">
                            <Card title="Barang Masuk" description={barangMasuk} />
                            <Card title="Barang Keluar" description={barangKeluar} />
                        </div>
                        
                    </div>
                </main>
            </div>
        </div>
    );
}
