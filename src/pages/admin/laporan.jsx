import React, { useState, useEffect } from "react";

// URL API untuk mendapatkan data barang masuk dan keluar
const API_BARANG_MASUK = "http://localhost:8000/api/barang-masuk";
const API_BARANG_KELUAR = "http://localhost:8000/api/barang-keluar";

const LaporanBarang = () => {
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

  // Fungsi untuk print laporan
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Laporan Barang Masuk dan Keluar</h1>

      {/* Filter Tanggal */}
      <div className="flex gap-4 mb-4">
        <div>
          <label htmlFor="startDate" className="block">Tanggal Mulai</label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block">Tanggal Akhir</label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          onClick={() => {}}
          className="p-2 bg-blue-500 text-white rounded-md"
        >
          Terapkan Filter
        </button>
      </div>

      {/* Tabel Data Barang */}
      <table className="min-w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-300">Nama Barang</th>
            <th className="px-4 py-2 border border-gray-300">Jenis</th>
            <th className="px-4 py-2 border border-gray-300">Tanggal</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-2 border border-gray-300">{item.namaBarang}</td>
              <td className="px-4 py-2 border border-gray-300">{item.jenis}</td>
              <td className="px-4 py-2 border border-gray-300">{item.tanggal}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tombol Print */}
      <button
        onClick={handlePrint}
        className="p-2 bg-green-500 text-white rounded-md"
      >
        Print Laporan
      </button>
    </div>
  );
};

export default LaporanBarang;
