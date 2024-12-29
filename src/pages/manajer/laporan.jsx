import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Nav";

// URL API untuk mendapatkan data barang masuk dan keluar
const API_BARANG_MASUK = "http://localhost:8000/api/barang-masuk";
const API_BARANG_KELUAR = "http://localhost:8000/api/barang-keluar";

const LaporanBarang = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [barangMasuk, setBarangMasuk] = useState([]);
  const [barangKeluar, setBarangKeluar] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Mengambil data barang masuk dan keluar dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resMasuk = await fetch(API_BARANG_MASUK);
        const resKeluar = await fetch(API_BARANG_KELUAR);
        const dataMasuk = await resMasuk.json();
        const dataKeluar = await resKeluar.json();

        setBarangMasuk(dataMasuk);
        setBarangKeluar(dataKeluar);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Menggabungkan barang masuk dan keluar
  useEffect(() => {
    const combinedData = [...barangMasuk, ...barangKeluar];
    if (startDate && endDate) {
      setFilteredData(
        combinedData.filter(
          (item) => item.tanggal >= startDate && item.tanggal <= endDate
        )
      );
    } else {
      setFilteredData(combinedData);
    }
  }, [startDate, endDate, barangMasuk, barangKeluar]);

  // Menghitung total harga
  const calculateTotalPrice = () => {
    return filteredData.reduce((total, item) => total + (item.harga || 0), 0);
  };

  // Fungsi untuk format bulan dan tahun
  const formatMonthYear = (date) => {
    const monthNames = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const month = new Date(date).getMonth();
    const year = new Date(date).getFullYear();
    return `${monthNames[month]} ${year}`;
  };

  // Fungsi untuk print laporan
  const handlePrint = () => {
    const noPrintElements = document.querySelectorAll(".no-print");
    noPrintElements.forEach((el) => (el.style.display = "none"));
    window.print();
    noPrintElements.forEach((el) => (el.style.display = ""));
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className={`w-64 ${isSidebarOpen ? "no-print" : ""}`}>
        <Sidebar role="manager" />
      </div>

      <div className={`flex-1 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <header className={`sticky top-0 shadow z-10 bg-white no-print`}>
          <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        </header>
        <main className="pt-20 p-8">
          {/* Nama Laporan */}
          <div className="laporan-header">
            <h1 className="text-2xl font-bold mb-4">
              Laporan Barang Masuk dan Keluar{" "}
              {startDate && endDate
                ? `Bulan ${formatMonthYear(startDate)}`
                : "Semua Periode"}
            </h1>
          </div>

          {/* Filter Tanggal */}
          <div className="flex gap-4 mb-4">
            <div>
              <label htmlFor="startDate" className="block">
                Tanggal Mulai
              </label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block">
                Tanggal Akhir
              </label>
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Tabel Data Barang */}
          <table className="min-w-full border-collapse border border-gray-300 mb-4">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-gray-300">Nama Barang</th>
                <th className="px-4 py-2 border border-gray-300">
                  Masuk/Keluar
                </th>
                <th className="px-4 py-2 border border-gray-300">
                  Tanggal Masuk
                </th>
                <th className="px-4 py-2 border border-gray-300">
                  Tanggal Keluar
                </th>
                <th className="px-4 py-2 border border-gray-300">Harga Beli</th>
                <th className="px-4 py-2 border border-gray-300">Harga Jual</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.nama_barang}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.alasan}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.tgl_masuk}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.tanggal_keluar}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.harga ? item.harga.toLocaleString() : "0"}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.harga_jual ? item.harga_jual.toLocaleString() : "0"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Menampilkan Total Harga */}
          {filteredData.length > 0 && (
            <div className="mt-4 text-lg font-semibold">
              Total Harga: {calculateTotalPrice().toLocaleString()}
            </div>
          )}

          {/* Tombol Print */}
          <button
            onClick={handlePrint}
            className="p-2 bg-green-500 text-white rounded-md"
          >
            Print Laporan
          </button>
        </main>
      </div>
    </div>
  );
};

export default LaporanBarang;
