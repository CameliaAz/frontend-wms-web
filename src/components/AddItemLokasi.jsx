import React, { useState, useEffect } from "react";

function AddItemLokasi({ isOpen, onClose, onAdd, locations, onEdit }) {
    const [formData, setFormData] = useState({
        nama_produk: "",
        tanggal_masuk: "",
        kategori: "",
        stok: 0,
        exp: "",
        lokasi: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onAdd) {
            onAdd(formData);
            alert("Data berhasil ditambahkan!");
        } else if (onEdit) {
            onEdit(formData);
            alert("Data berhasil diperbarui!");
        }
        setFormData({ nama_produk: "", kategori: "", stok: 0, exp: "", lokasi: "" });
        onClose();
    };

    useEffect(() => {
        if (!isOpen) {
            setFormData({ nama_produk: "", kategori: "", stok: 0, exp: "", lokasi: "" });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50 overflow-y-auto">
            <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                        {onAdd ? "Tambah Lokasi Barang" : "Edit Lokasi Barang"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Nama Produk
                        </label>
                        <input
                            type="text"
                            name="nama_produk"
                            value={formData.nama_produk}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                            placeholder="Masukkan nama produk"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Tanggal Masuk
                        </label>
                        <input
                            type="date"
                            name="tanggal_masuk"
                            value={formData.tanggal_masuk}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Kategori
                        </label>
                        <input
                            type="text"
                            name="kategori"
                            value={formData.kategori}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                            placeholder="Masukkan kategori"
                            required
                        />
                    </div>
    
                    <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Jumlah Barang
                        </label>
                        <input
                            type="number"
                            name="stok"
                            value={formData.jumlah}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            min="1"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Lokasi
                        </label>
                        <select
                            name="lokasi"
                            value={formData.lokasi}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                            required
                        >
                            <option value="">Pilih Lokasi</option>
                            {locations?.map((loc) => (
                                <option key={loc.id} value={loc.lokasi}>
                                    {loc.lokasi}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Tanggal Kedaluwarsa
                        </label>
                        <input
                            type="date"
                            name="exp"
                            value={formData.exp}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Tambah
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddItemLokasi;
