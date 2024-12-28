import React, { useState, useEffect } from "react";

export default function EditItemModal({ isOpen, onClose, item, onUpdate, kategoriList }) {
    const [formData, setFormData] = useState({
        id: "",
        nama_produk: "",
        kategori: "",
        jumlah_keluar: "",
        tanggal_keluar: "",
        lokasi_asal: "",
        tujuan_keluar: "",
    });

    useEffect(() => {
        if (item) {
            // Update formData with item values
            setFormData({
                id: item.id,
                nama_produk: item.barang ? item.barang.nama_barang : "", // Accessing barang.nama
                kategori: item.kategori ? item.kategori.id : "", // Storing the category ID
                jumlah_keluar: item.jumlah || "", // Accessing jumlah
                tanggal_keluar: item.tanggal_keluar || "", // Accessing created_at
                lokasi_asal: item.rak ? item.rak.nama_rak : "", // Accessing rak.nama_rak
                tujuan_keluar: item.alasan || "", // Accessing alasan
            });
        }
    }, [item]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onUpdate(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-100 flex items-center justify-center z-50">
            {/* Modal Content */}
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Edit Data Barang Keluar</h2>
                <div className="flex flex-col gap-4">
                    <input
                        name="nama_produk"
                        value={formData.nama_produk}
                        onChange={handleChange}
                        placeholder="Nama Produk"
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div>
                        <label className="block mb-2 font-semibold">Kategori</label>
                        <select
                            name="kategori"
                            value={formData.kategori}
                            onChange={handleChange}
                            className="w-full border px-4 py-2 rounded"
                            required
                        >
                            <option value="">Pilih Kategori</option>
                            {kategoriList.map((kategori) => (
                                <option key={kategori.id} value={kategori.id}>
                                    {kategori.nama_kat}
                                </option>
                            ))}
                        </select>
                    </div>
                    <input
                        name="jumlah_keluar"
                        value={formData.jumlah_keluar}
                        onChange={handleChange}
                        placeholder="Jumlah Keluar"
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        name="tanggal_keluar"
                        value={formData.tanggal_keluar}
                        onChange={handleChange}
                        placeholder="Tanggal Keluar"
                        type="date"
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        name="lokasi_asal"
                        value={formData.lokasi_asal}
                        onChange={handleChange}
                        placeholder="Lokasi Asal"
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        name="tujuan_keluar"
                        value={formData.tujuan_keluar}
                        onChange={handleChange}
                        placeholder="Tujuan Keluar"
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Simpan
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Batal
                    </button>
                </div>
            </div>
        </div>
    );
}
