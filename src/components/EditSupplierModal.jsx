import React, { useState, useEffect } from 'react';
import axios from 'axios';


const EditSupplierModal = ({ supplierData, isModalOpen, onClose, onEditSupplier }) => {
    const [formData, setFormData] = useState({ nama_sup: '', telepon: '', alamat: '' });

    useEffect(() => {
        if (supplierData) {
            setFormData(supplierData);
        }
    }, [supplierData]);


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
            const response = await axios.put(`http://127.0.0.1:8000/api/supplier/${formData.id}`, formData);
            onEditSupplier(response.data.data);
            onClose(); // Tutup modal setelah sukses
        } catch (error) {
            console.error("Update error:", error);
        }
    };

    return (
        isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded shadow-lg w-1/2">
                    <h2 className="text-xl font-bold mb-4">Edit Supplier</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Nama Supplier</label>
                            <input
                                type="text"
                                name="nama_sup"
                                value={formData.nama_sup}
                                onChange={handleChange}
                                className="border w-full p-2 rounded"
                                placeholder="Enter supplier name"
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
                                placeholder="Enter contact details"
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
                                placeholder="Enter address"
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
                                Update Supplier
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default EditSupplierModal;
