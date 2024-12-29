import React, { useState, useEffect } from "react";

export default function EditDataKeluar({ isOpen, onClose, item, onUpdate, kategoriList }) {
    const [formData, setFormData] = useState({
        jumlahKeluar: 0,
        alasan: "",
        tanggalKeluar: "",
    });

    useEffect(() => {
        if (isOpen && item) {
            setFormData({
                jumlahKeluar: item.jumlah_keluar || 0,
                alasan: item.alasan || "",
                tanggalKeluar: item.tanggal_keluar || "",
            });
        }
    }, [isOpen, item]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        const { jumlahKeluar, alasan, tanggalKeluar } = formData;

        if (jumlahKeluar > 0 && alasan.trim() && tanggalKeluar.trim()) {
            onUpdate({
                ...item,
                ...formData,
            });
            alert("Barang berhasil diperbarui!");
            onClose();
        } else {
            alert("Semua field harus diisi dengan benar!");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black-500 bg-opacity-10 overflow-y-auto">
            <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                        Edit Barang Keluar
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
                <form onSubmit={handleSave} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Nama Barang
                        </label>
                        <p className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white">{item?.nama_barang}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Rak
                        </label>
                        <p className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white">{item?.nama_rak}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Bagian Rak
                        </label>
                        <p className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white">{item?.nama_lokasi}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Jumlah Keluar
                        </label>
                        <input
                            type="number"
                            name="jumlahKeluar"
                            value={formData.jumlahKeluar}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                            min="1"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Alasan Keluar
                        </label>
                        <textarea
                            name="alasan"
                            value={formData.alasan}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                            placeholder="Masukkan alasan"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Tanggal Keluar
                        </label>
                        <input
                            type="date"
                            name="tanggalKeluar"
                            value={formData.tanggalKeluar}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-600"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-600"
                            style={{ backgroundColor: "#1e429f" }}
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
