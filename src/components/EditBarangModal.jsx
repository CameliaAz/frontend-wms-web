import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Pastikan axios diimport

const EditBarangModal = ({ isOpen, onClose, barangId }) => {
    const [formData, setFormData] = useState({
        nama_barang: '',
        varian: '',
        ukuran: '',
        deskripsi: '',
        harga_jual: '',
        kategori: '',
        gambar: null
    });
    const [kategoriList, setKategoriList] = useState([]);  // Data kategori
    const [gambar, setGambar] = useState(null); // Untuk file gambar
    const navigate = useNavigate();

    useEffect(() => {
        if (barangId) {
            fetchBarang();
            fetchKategori();
        }
    }, [barangId]);

    // Fetch data kategori
    const fetchKategori = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/kategori");
            setKategoriList(response.data);
        } catch (error) {
            console.error("Error fetching kategori:", error);
        }
    };

    // Fetch data barang yang akan diedit
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

        const data = new FormData();
        Object.keys(formData).forEach((key) => data.append(key, formData[key]));
        if (gambar) data.append("gambar", gambar);

        try {
            await axios.put(`http://127.0.0.1:8000/api/barang/${barangId}`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
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

    const handleFileChange = (e) => {
        setGambar(e.target.files[0]);
    };

    if (!isOpen) return null;  // If modal is not open, return nothing

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
                        <label className="block mb-2 font-semibold">Varian</label>
                        <input
                            type="text"
                            name="varian"
                            value={formData.varian}
                            onChange={handleChange}
                            className="w-full border px-4 py-2 rounded"
                            placeholder="Masukkan varian barang"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold">Ukuran</label>
                        <input
                            type="text"
                            name="ukuran"
                            value={formData.ukuran}
                            onChange={handleChange}
                            className="w-full border px-4 py-2 rounded"
                            placeholder="Masukkan ukuran barang"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold">Deskripsi</label>
                        <textarea
                            name="deskripsi"
                            value={formData.deskripsi}
                            onChange={handleChange}
                            className="w-full border px-4 py-2 rounded"
                            placeholder="Masukkan deskripsi barang"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold">Harga Jual</label>
                        <input
                            type="number"
                            name="harga_jual"
                            value={formData.harga_jual}
                            onChange={handleChange}
                            className="w-full border px-4 py-2 rounded"
                            placeholder="Masukkan harga jual barang"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold">Kategori</label>
                        <select
                            name="kategori"
                            value={formData.kategori}
                            onChange={handleChange}
                            className="w-full border px-4 py-2 rounded"
                            required
                        >
                            <option value="">Pilih Kategori</option>
                            {kategoriList.map((kategori) => (
                                <option key={kategori.id} value={kategori.id}>
                                    {kategori.nama_kat}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold">Gambar</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="w-full"
                            accept="image/*"
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
