import React, { useState, useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import { MdClose } from "react-icons/md";  // Make sure to import MdClose
import axios from "axios";

const AddBarangModal = ({ onAddBarang }) => {
    const [formData, setFormData] = useState({
        nama_barang: "",
        varian: "",
        ukuran: "",
        deskripsi: "",
        harga_jual: "",
        kategori: "",
    });
    const [gambar, setGambar] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [kategoriList, setKategoriList] = useState([]);

    // Fetch data kategori when modal is opened
    useEffect(() => {
        if (isModalOpen) {
            const fetchKategori = async () => {
                try {
                    const response = await axios.get("http://127.0.0.1:8000/api/kategori");
                    setKategoriList(response.data);
                } catch (error) {
                    console.error("Error fetching kategori:", error);
                }
            };
            fetchKategori();
        }
    }, [isModalOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setGambar(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.keys(formData).forEach((key) => data.append(key, formData[key]));
        if (gambar) data.append("gambar", gambar);

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/barang", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            onAddBarang(response.data);  // Add new data to parent
            setIsModalOpen(false);  // Close modal on successful submit
        } catch (error) {
            console.error("Error adding barang:", error);
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

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="relative p-2 max-w-[90%] max-h-[90vh] overflow-x-auto bg-white rounded-lg shadow-lg dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-['Poppins'] font-bold text-gray-900 dark:text-white">
                                Penambahan Data Barang
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}  // Close modal on click
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <MdClose className="w-3 h-3" />
                            </button>
                        </div>
                        <div className="p-2">
                        <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                        <div>
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
                            <div >
                                <label className="block text-gray-700">Varian</label>
                                <input
                                    type="text"
                                    name="varian"
                                    value={formData.varian}
                                    onChange={handleChange}
                                    className="border w-full p-2 rounded"
                                    placeholder="Masukkan varian barang"
                                />
                            </div>
                            <div >
                                <label className="block text-gray-700">Ukuran</label>
                                <input
                                    type="text"
                                    name="ukuran"
                                    value={formData.ukuran}
                                    onChange={handleChange}
                                    className="border w-full p-2 rounded"
                                    placeholder="Masukkan ukuran barang"
                                />
                            </div>
                            <div >
                                <label className="block text-gray-700">Deskripsi</label>
                                <textarea
                                    name="deskripsi"
                                    value={formData.deskripsi}
                                    onChange={handleChange}
                                    className="border w-full p-2 rounded"
                                    placeholder="Masukkan deskripsi barang"
                                />
                            </div>
                            <div >
                                <label className="block text-gray-700">Harga Jual</label>
                                <input
                                    type="number"
                                    name="harga_jual"
                                    value={formData.harga_jual}
                                    onChange={handleChange}
                                    className="border w-full p-2 rounded"
                                    placeholder="Masukkan harga jual barang"
                                    required
                                />
                            </div>
                            <div >
                                <label className="block text-gray-700">Kategori</label>
                                <select
                                    name="kategori"
                                    value={formData.kategori}
                                    onChange={handleChange}
                                    className="border w-full p-2 rounded"
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
                            <div >
                                <label className="block text-gray-700">Gambar</label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="w-full"
                                    accept="image/*"
                                />
                            </div>
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
                                    Tambahkan Produk
                                </button>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddBarangModal;
