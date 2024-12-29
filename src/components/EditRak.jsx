import React, { useState, useEffect } from "react";
import axios from "axios";

function EditRak({ isOpen, onClose, onUpdateRak, rakId }) {
    const [formData, setFormData] = useState({
        nama_rak: "",
        nama_lokasi: "",
        status: "available", // default status
    });
    const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);

    // Fetch data rak berdasarkan rakId saat modal dibuka
    useEffect(() => {
        const fetchRak = async () => {
            if (!rakId) return; // Jika rakId tidak ada, hentikan eksekusi
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/rak/${rakId}`);
                if (response.data) {
                    setFormData({
                        nama_rak: response.data.nama_rak || "",
                        nama_lokasi: response.data.nama_lokasi || "",
                        status: response.data.status || "available",
                    });
                }
            } catch (error) {
                console.error("Error fetching rak data:", error);
                alert("Gagal memuat data rak!");
            }
        };
        fetchRak();
    }, [rakId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Mengirim data yang diperbarui ke API
            const response = await axios.put(`http://127.0.0.1:8000/api/rak/${rakIdd}`, formData );
            if (response.data) {
                onUpdateRak(response.data); // Perbarui data di komponen induk
                setIsSuccessPopupOpen(true); // Tampilkan popup sukses
                setTimeout(() => {
                    setIsSuccessPopupOpen(false);
                }, 3000);
                onClose(); // Tutup modal
            }
        } catch (error) {
            console.error("Error updating rak:", error);
            alert("Gagal mengupdate rak!");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-y-auto">
            <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-bold">Edit Rak</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm h-8 w-8 inline-flex justify-center items-center"
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
                        <label className="block text-sm font-medium">Nama Rak</label>
                        <input
                            type="text"
                            name="nama_rak"
                            value={formData.nama_rak}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Masukkan nama rak"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Lokasi Rak</label>
                        <input
                            type="text"
                            name="nama_lokasi"
                            value={formData.nama_lokasi}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Contoh: Tengah"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Status Rak</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg"
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
                            Update Rak
                        </button>
                    </div>
                </form>
                {isSuccessPopupOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-green-500 text-white p-4 rounded-lg">
                            Data berhasil diupdate!
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EditRak;
