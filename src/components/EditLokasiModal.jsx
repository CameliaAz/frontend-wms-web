import React, { useState, useEffect } from "react";

export default function EditLokasiModal({ isOpen, onClose, item, onUpdate }) {
    const [formData, setFormData] = useState({
        nama_produk: "",
        kategori: "",
        stok: 0,
        exp: "",
        lokasi: "",
    });

    useEffect(() => {
        // Mengisi form dengan data item yang akan diedit
        if (item) {
            setFormData({
                nama_produk: item.nama_barang,
                kategori: item.nama_kat,
                stok: item.jumlah,
                exp: item.exp,
                lokasi: item.nama_rak,
            });
        }
    }, [item]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({ ...item, ...formData }); // Mengirim data yang telah diperbarui
        onClose(); // Menutup modal setelah update
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-lg font-bold mb-4">Edit Barang</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Nama Barang</label>
                        <input
                            type="text"
                            name="nama_produk"
                            value={formData.nama_produk}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Kategori</label>
                        <input
                            type="text"
                            name="kategori"
                            value={formData.kategori}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Stok</label>
                        <input
                            type="number"
                            name="stok"
                            value={formData.stok}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Expired</label>
                        <input
                            type="date"
                            name="exp"
                            value={formData.exp}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Lokasi Barang</label>
                        <input
                            type="text"
                            name="lokasi"
                            value={formData.lokasi}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
