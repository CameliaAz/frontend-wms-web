import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditKategoriModal = ({ kategoriData, isModalOpen, onClose, onEditKategori }) => {
    const [formData, setFormData] = useState({ nama_kat: ''});

    useEffect(() => {
        if (kategoriData) {
            setFormData(kategoriData);
        }
    }, [kategoriData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/kategori/${formData.id}`, formData);
            onEditKategori(response.data.data);
            onClose(); // Tutup modal setelah sukses
        } catch (error) {
            console.error("Update error:", error);
        }
    };

    return (
        isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded shadow-lg w-1/2">
                    <h2 className="text-xl font-bold mb-4">Edit Kategori</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Nama Kategori</label>
                            <input
                                type="text"
                                name="nama_kat"
                                value={formData.nama_kat}
                                onChange={handleChange}
                                className="border w-full p-2 rounded"
                                placeholder="Masukkan nama kategori"
                                required
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
                            >
                                Update Kategori
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default EditKategoriModal;
