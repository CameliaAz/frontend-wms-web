import React, { useState, useEffect } from "react";

export default function EditItemModal({ isOpen, onClose, item, onUpdate }) {
    const [formData, setFormData] = useState({
        id: "",
        nama_produk: "",
        kategori: "",
        jumlah_keluar: "",
        tanggal_keluar: "",
        lokasi_asal: "",
        tujuan_keluar: "",
        deskripsi: "",
    });

    useEffect(() => {
        if (item) {
            setFormData(item);
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
                    <input
                        name="kategori"
                        value={formData.kategori}
                        onChange={handleChange}
                        placeholder="Kategori"
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
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
                    <textarea
                        name="deskripsi"
                        value={formData.deskripsi}
                        onChange={handleChange}
                        placeholder="Deskripsi"
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
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
