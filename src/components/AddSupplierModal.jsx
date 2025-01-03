import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoAdd } from 'react-icons/io5';

const AddSupplierModal = ({ isModalOpen, onClose, onAddSupplier }) => {
    const [formData, setFormData] = useState({ nama_sup: '', telepon: '', alamat: '' });
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
            const response = await axios.post('http://127.0.0.1:8000/api/supplier', formData);
            console.log("API Response:", response);
            if (response.data && response.data.data) {
                onAddSupplier(response.data.data);
                setIsSuccessPopupOpen(true); // Tampilkan popup sukses terlebih dahulu
                setTimeout(() => {
                    setIsSuccessPopupOpen(false);
                    navigate('/admin/user/supplier');
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
                        <h2 className="text-xl font-bold mb-4">Tambah Supplier</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Nama Supplier</label>
                                <input
                                    type="text"
                                    name="nama_sup"
                                    value={formData.nama_sup}
                                    onChange={handleChange}
                                    className="border w-full p-2 rounded"
                                    placeholder="Masukkan Nama Supplier"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Telepon</label>
                                <input
                                    type="number"
                                    name="telepon"
                                    value={formData.telepon}
                                    onChange={handleChange}
                                    className="border w-full p-2 rounded"
                                    placeholder="Masukkan No. Telepon"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Alamat</label>
                                <input
                                    type="text"
                                    name="alamat"
                                    value={formData.alamat}
                                    onChange={handleChange}
                                    className="border w-full p-2 rounded"
                                    placeholder="Masukkan Alamat Supplier"
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
                                    className="px-4 py-2 text-white rounded hover:bg-blue-700 transition text-sm"
                                    style={{ backgroundColor: "#1e429f" }}
                                >
                                    Tambah Supplier
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AddSupplierModal;
