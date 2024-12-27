import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Make sure axios is imported

const EditBarangModal = ({ isOpen, onClose, barangId }) => {
    const [formData, setFormData] = useState({ nama_barang: '', harga: '', stok: '' });
    const navigate = useNavigate();

    useEffect(() => {
        if (barangId) {
            fetchBarang();
        }
    }, [barangId]);

    const fetchBarang = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/barang/${barangId}`);
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching barang:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/api/barang/${barangId}`, formData);
            navigate('/barang');  // Navigate to barang list
            onClose();  // Close the modal
        } catch (error) {
            console.error('Error updating barang:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    if (!isOpen) return null;  // If the modal is not open, return nothing

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
            <div className="bg-white p-6 rounded shadow-lg w-1/2">
                <h2 className="text-2xl font-bold mb-4">Edit Barang</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2 font-semibold">Nama Barang</label>
                        <input
                            type="text"
                            name="nama_barang"
                            value={formData.nama_barang}
                            onChange={handleChange}
                            className="w-full border px-4 py-2 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold">Harga</label>
                        <input
                            type="number"
                            name="harga"
                            value={formData.harga}
                            onChange={handleChange}
                            className="w-full border px-4 py-2 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold">Stok</label>
                        <input
                            type="number"
                            name="stok"
                            value={formData.stok}
                            onChange={handleChange}
                            className="w-full border px-4 py-2 rounded"
                            required
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                            style={{ backgroundColor: "#1e429f" }}
                        >
                            Simpan Perubahan
                        </button>
                        <button
                            type="button"
                            onClick={onClose}  // Close modal when Cancel button is clicked
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-full"
                        >
                            Batalkan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBarangModal;
