import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Nav";
import Charts from "../../components/Charts";
import Card from "../../components/Card";
import axios from 'axios';
import dayjs from "dayjs";

export default function ManagerDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [chartData, setChartData] = useState([]);
    const [barangMasuk, setBarangMasuk] = useState(0);
    const [barangKeluar, setBarangKeluar] = useState(0);
    const [notifikasi, setNotifikasi] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [masukRes, keluarRes, rakRes] = await Promise.all([
                    axios.get("http://127.0.0.1:8000/api/barang-masuk"),
                    axios.get("http://127.0.0.1:8000/api/barang-keluar"),
                    axios.get("http://127.0.0.1:8000/api/rak"),
                ]);

                setBarangMasuk(masukRes.data.total);
                setBarangKeluar(keluarRes.data.total);
                setChartData([]);

                // Jumlahkan semua barang masuk berdasarkan 'jumlah_barang_masuk'
                const totalBarangMasuk = masukRes.data.reduce((total, item) => total + item.jumlah_barang_masuk, 0);
                const totalBarangKeluar = keluarRes.data.reduce((total, item) => total + item.jumlah_keluar, 0); // Misalnya, keluarRes punya struktur serupa

                setBarangMasuk(totalBarangMasuk); // Menampilkan total jumlah barang masuk
                setBarangKeluar(totalBarangKeluar); // Menampilkan total jumlah barang keluar

                // Filter data untuk notifikasi
                const today = dayjs();
                const filtered = rakRes.data.filter(item => {
                    const expDate = dayjs(item.exp);
                    return item.jumlah < 50 && expDate.isBefore(today.add(7, 'day'));
                });

                setNotifikasi(filtered);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login/LoginPage");
    };

    return (
        <div className="flex min-h-screen">
            <div className="w-64">
                <Sidebar role="manager" />
            </div>
            <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
                <header className="sticky top-0 shadow z-10">
                    <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                </header>
                <main className="flex-1 pt-16 p-8">
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-4">Notifikasi</h3>
                        {notifikasi.length > 0 ? (
                            <div className="bg-yellow-100 p-4 rounded mb-4">
                                <h4 className="font-semibold">Barang Hampir Habis & Kadaluarsa</h4>
                                <ul className="list-disc list-inside">
                                    {notifikasi.map((item, index) => (
                                        <li key={index}>
                                            {item.nama_barang} - Sisa: {item.jumlah} - Kadaluarsa: {item.exp}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div className="bg-green-100 p-4 rounded">
                                <p>Tidak ada barang yang mendekati kadaluarsa dan hampir habis.</p>
                            </div>
                        )}
                    </div>
                    <div className="bg-white p-6 rounded shadow">
                        <div className="mb-4">
                            <Charts data={chartData} />
                        </div>
                        <div className="flex gap-x-4">
                            <Card
                                title="Barang Masuk"
                                description={`Total: ${barangMasuk}`}
                                href="/barang-masuk"
                            />
                            <Card
                                title="Barang Keluar"
                                description={`Total: ${barangKeluar}`}
                                href="/barang-keluar"
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
