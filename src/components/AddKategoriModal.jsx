import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AddKategoriModal = ({ isModalOpen, onClose, onAddKategori }) => {
    const [formData, setFormData] = useState({ nama_kat: ''});
    const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting form data:", formData);
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/kategori', formData);
            console.log("API Response:", response);
            if (response.data && response.data.data) {
                onAddKategori(response.data.data);
                onClose(); // Tutup modal
                setIsSuccessPopupOpen(true);
                setTimeout(() => {
                    setIsSuccessPopupOpen(false);
                    navigate('/admin/user/kategori'); // Navigate to the home page or any other desired page
                }, 3000);
                onClose(); // Tutup modal setelah popup sukses
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-1/2">
                        <h2 className="text-xl font-bold mb-4">Tambah Kategori</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Nama Kategori</label>
                                <input
                                    type="text"
                                    name="nama_kat"
                                    value={formData.nama_kat}
                                    onChange={handleChange}
                                    className="border w-full p-2 rounded"
                                    placeholder="Masukkan Nama Kategori"
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
                                    Tambah Kategori
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddKategoriModal;
