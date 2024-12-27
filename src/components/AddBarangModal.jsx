import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoAdd } from 'react-icons/io5';

const AddBarangModal = ({ onAddBarang }) => {
    const [formData, setFormData] = useState({ nama_barang: '', harga: '', stok: '' });
    const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal
    const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false); // State untuk popup sukses
    const navigate = useNavigate();

    // Fungsi untuk menangani perubahan input
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
            await axios.post('http://127.0.0.1:8000/api/barang', formData);
            onAddBarang(formData); // Pastikan ini dipanggil untuk update data barang di parent
            setIsModalOpen(false); // Tutup modal setelah berhasil menyimpan
            setIsSuccessPopupOpen(true); // Tampilkan popup sukses
            setTimeout(() => {
                setIsSuccessPopupOpen(false); // Menyembunyikan popup setelah 3 detik
                navigate('/'); // Arahkan ke halaman utama atau halaman barang
            }, 3000);
        } catch (error) {
            console.error('Error adding barang:', error);
        }
    };

    return (
        <div>
            <div
                className="h-[47px] px-5 py-2.5 rounded-lg justify-center items-center gap-2 inline-flex mb-6"
                style={{ backgroundColor: "#1e429f" }}
            >
                <IoAdd className="w-5 h-5 text-white" />
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-white text-sm font-semibold font-['Poppins'] leading-[21px] cursor-pointer hover:underline"
                >
                    Tambahkan Barang
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-1/2">
                        <h2 className="text-xl font-bold mb-4">Tambah Barang</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Nama Barang</label>
                                <input
                                    type="text"
                                    name="nama_barang"
                                    value={formData.nama_barang}
                                    onChange={handleChange}
                                    className="border w-full p-2 rounded"
                                    placeholder="Masukkan nama barang"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Harga</label>
                                <input
                                    type="number"
                                    name="harga"
                                    value={formData.harga}
                                    onChange={handleChange}
                                    className="border w-full p-2 rounded"
                                    placeholder="Masukkan harga barang"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Stok</label>
                                <input
                                    type="number"
                                    name="stok"
                                    value={formData.stok}
                                    onChange={handleChange}
                                    className="border w-full p-2 rounded"
                                    placeholder="Masukkan stok barang"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="text-white px-4 py-2 rounded hover:bg-blue-600"
                                    style={{ backgroundColor: "#1e429f" }}
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Popup Success */}
            {isSuccessPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-green-500 p-6 rounded shadow-lg">
                        <h2 className="text-xl font-bold text-white">Barang Berhasil Ditambahkan!</h2>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddBarangModal;
