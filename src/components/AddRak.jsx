import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function AddRak({ isOpen, onClose, onAddRak }) {
    const [formData, setFormData] = useState({
        nama_rak: "",
        nama_lokasi: "",
        status: "available", // default status rak adalah available
    });
    const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
    const navigate = useNavigate();


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Mengirim data rak ke API
            const response = await axios.post("http://127.0.0.1:8000/api/rak", formData);
            if (response.data && response.data.data) {
                onAddRak(response.data.data);
                setIsSuccessPopupOpen(true); // Tampilkan popup sukses terlebih dahulu
                setTimeout(() => {
                    setIsSuccessPopupOpen(false);
                    navigate('/admin/lokasi_barang/data_rak');
                }, 3000);
                onClose(); // Tutup modal setelah popup sukses
            };
        } catch (error) {
            alert("Gagal menambahkan rak!");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black-500 bg-opacity-50 overflow-y-auto">
            <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                        Tambah Rak
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
                            Nama Rak
                        </label>
                        <input
                            type="text"
                            name="nama_rak"
                            value={formData.nama_rak}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                            placeholder="Masukkan nama rak"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Lokasi Rak
                        </label>
                        <input
                            type="text"
                            name="nama_lokasi"
                            value={formData.nama_lokasi}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                            placeholder="Contoh: Tengah"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Status Rak
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                            required
                        >
                            <option value="available">Available</option>
                            <option value="not_available">Not Available</option>
                        </select>
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
                            Tambah Rak
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddRak;
