import React, { useState } from "react";
import axios from "axios";

export default function AddDtaKeluar({ isOpen, onClose, onAdd }) {
    const [namaProduk, setNamaProduk] = useState("");
    const [kategori, setKategori] = useState("");
    const [jumlahKeluar, setJumlahKeluar] = useState("");
    const [tanggalKeluar, setTanggalKeluar] = useState("");
    const [lokasiAsal, setLokasiAsal] = useState("");
    const [tujuanKeluar, setTujuanKeluar] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Pastikan semua field sudah terisi
        if (!namaProduk || !kategori || !jumlahKeluar || !tanggalKeluar || !lokasiAsal || !tujuanKeluar) {
            alert("Semua field harus diisi!");
            return;
        }

        const newItem = {
            nama_produk: namaProduk,
            kategori,
            jumlah_keluar: jumlahKeluar,
            tanggal_keluar: tanggalKeluar,
            lokasi_asal: lokasiAsal,
            tujuan_keluar: tujuanKeluar,
        };

        onAdd(newItem); // Panggil fungsi onAdd untuk menambahkan data
        onClose(); // Tutup modal setelah data ditambahkan
    };

    if (!isOpen) return null; // Tidak menampilkan modal jika isOpen false

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Tambah Barang Keluar</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="nama_produk" className="block text-sm font-medium text-gray-700">
                            Nama Produk
                        </label>
                        <input
                            type="text"
                            id="nama_produk"
                            value={namaProduk}
                            onChange={(e) => setNamaProduk(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="kategori" className="block text-sm font-medium text-gray-700">
                            Kategori
                        </label>
                        <input
                            type="text"
                            id="kategori"
                            value={kategori}
                            onChange={(e) => setKategori(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="jumlah_keluar" className="block text-sm font-medium text-gray-700">
                            Jumlah Keluar
                        </label>
                        <input
                            type="number"
                            id="jumlah_keluar"
                            value={jumlahKeluar}
                            onChange={(e) => setJumlahKeluar(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="tanggal_keluar" className="block text-sm font-medium text-gray-700">
                            Tanggal Keluar
                        </label>
                        <input
                            type="date"
                            id="tanggal_keluar"
                            value={tanggalKeluar}
                            onChange={(e) => setTanggalKeluar(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lokasi_asal" className="block text-sm font-medium text-gray-700">
                            Lokasi Asal
                        </label>
                        <input
                            type="text"
                            id="lokasi_asal"
                            value={lokasiAsal}
                            onChange={(e) => setLokasiAsal(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="tujuan_keluar" className="block text-sm font-medium text-gray-700">
                            Alasan Keluar
                        </label>
                        <input
                            type="text"
                            id="tujuan_keluar"
                            value={tujuanKeluar}
                            onChange={(e) => setTujuanKeluar(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
