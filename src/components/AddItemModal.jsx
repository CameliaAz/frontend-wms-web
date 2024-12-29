import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoAdd } from "react-icons/io5";
import { MdClose } from "react-icons/md";

export default function AddItemModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        idBarang: "",
        idRak: "",
        idSupplier: "",
        idKategori: "", 
        idAdmin: "",
        jumlahBarangMasuk: "",
        expired: "",
        tanggalMasuk: "",
        harga: "",
        total: "",
    });
    const [barangList, setBarangList] = useState([]);
    const [rakList, setRakList] = useState([]);
    const [supplierList, setSupplierList] = useState([]);
    const [kategoriList, setKategoriList] = useState([]); // Added state for categories
    const [adminList, setAdminList] = useState([]);

    useEffect(() => {
        // Fetch barang list, rak list, supplier list, and admin list
        const fetchData = async () => {
            try {
                const barangResponse = await axios.get("http://127.0.0.1:8000/api/barang");
                const rakResponse = await axios.get("http://127.0.0.1:8000/api/rak");
                const supplierResponse = await axios.get("http://127.0.0.1:8000/api/supplier");
                const adminResponse = await axios.get("http://127.0.0.1:8000/api/users");
                const kategoriResponse = await axios.get("http://127.0.0.1:8000/api/kategori"); // Fetch categories

                setBarangList(Array.isArray(barangResponse.data) ? barangResponse.data : []);
                setRakList(Array.isArray(rakResponse.data) ? rakResponse.data : []);
                setSupplierList(Array.isArray(supplierResponse.data) ? supplierResponse.data : []);
                setAdminList(Array.isArray(adminResponse.data) ? adminResponse.data : []);
                setKategoriList(Array.isArray(kategoriResponse.data) ? kategoriResponse.data : []); // Set categories
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submit logic here
        console.log(formData);
        onClose(); // Close the modal after submitting the form
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="relative p-2 max-w-[90%] max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-['Poppins'] font-bold text-gray-900 dark:text-white">
                        Penambahan Data Barang Masuk
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        <MdClose className="w-3 h-3" />
                    </button>
                </div>

                <div className="p-2">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Nama Barang Dropdown */}
                            <div>
                                <label htmlFor="idBarang" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    Nama Barang
                                </label>
                                <select
                                    id="idBarang"
                                    name="idBarang"
                                    value={formData.idBarang}
                                    onChange={handleChange}
                                    className="block w-full p-2.5 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                >
                                    <option value="" disabled>Pilih Barang</option>
                                    {Array.isArray(barangList) && barangList.map((barang) => (
                                        <option key={barang.id} value={barang.id}>
                                            {barang.nama_barang}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Nama Rak Dropdown */}
                            <div>
                                <label htmlFor="idRak" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    Nama Rak
                                </label>
                                <select
                                    id="idRak"
                                    name="idRak"
                                    value={formData.idRak}
                                    onChange={handleChange}
                                    className="block w-full p-2.5 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                >
                                    <option value="" disabled>Pilih Rak</option>
                                    {Array.isArray(rakList) && rakList.map((rak) => (
                                        <option key={rak.id} value={rak.id}>
                                            {rak.nama_rak}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Nama Supplier Dropdown */}
                            <div>
                                <label htmlFor="idSupplier" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    Nama Supplier
                                </label>
                                <select
                                    id="idSupplier"
                                    name="idSupplier"
                                    value={formData.idSupplier}
                                    onChange={handleChange}
                                    className="block w-full p-2.5 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                >
                                    <option value="" disabled>Pilih Supplier</option>
                                    {Array.isArray(supplierList) && supplierList.map((supplier) => (
                                        <option key={supplier.id} value={supplier.id}>
                                            {supplier.nama_sup}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Kategori Dropdown */}
                            <div>
                                <label htmlFor="idKategori" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    Kategori
                                </label>
                                <select
                                    id="idKategori"
                                    name="idKategori"
                                    value={formData.idKategori}
                                    onChange={handleChange}
                                    className="block w-full p-2.5 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                >
                                    <option value="" disabled>Pilih Kategori</option>
                                    {Array.isArray(kategoriList) && kategoriList.map((kategori) => (
                                        <option key={kategori.id} value={kategori.id}>
                                            {kategori.nama_kat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Nama Admin Dropdown */}
                            <div>
                                <label htmlFor="idAdmin" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    Nama Admin
                                </label>
                                <select
                                    id="idAdmin"
                                    name="idAdmin"
                                    value={formData.idAdmin}
                                    onChange={handleChange}
                                    className="block w-full p-2.5 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                >
                                    <option value="" disabled>Pilih Admin</option>
                                    {Array.isArray(adminList) && adminList.map((admin) => (
                                        <option key={admin.id} value={admin.id}>
                                            {admin.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Jumlah Barang Masuk */}
                            <div>
                                <label htmlFor="jumlahBarangMasuk" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    Jumlah Barang Masuk
                                </label>
                                <input
                                    type="number"
                                    id="jumlahBarangMasuk"
                                    name="jumlahBarangMasuk"
                                    value={formData.jumlahBarangMasuk}
                                    onChange={handleChange}
                                    className="block w-full p-2.5 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Masukkan jumlah barang masuk"
                                    required
                                />
                            </div>

                            {/* Expired */}
                            <div>
                                <label htmlFor="expired" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    Expired
                                </label>
                                <input
                                    type="date"
                                    id="expired"
                                    name="expired"
                                    value={formData.expired}
                                    onChange={handleChange}
                                    className="block w-full p-2.5 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>

                            {/* Tanggal Masuk */}
                            <div>
                                <label htmlFor="tanggalMasuk" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    Tanggal Masuk
                                </label>
                                <input
                                    type="date"
                                    id="tanggalMasuk"
                                    name="tanggalMasuk"
                                    value={formData.tanggalMasuk}
                                    onChange={handleChange}
                                    className="block w-full p-2.5 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>

                            {/* Harga */}
                            <div>
                                <label htmlFor="harga" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    Harga
                                </label>
                                <input
                                    type="number"
                                    id="harga"
                                    name="harga"
                                    value={formData.harga}
                                    onChange={handleChange}
                                    className="block w-full p-2.5 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Masukkan harga produk"
                                    required
                                />
                            </div>

                            {/* Total */}
                            <div>
                                <label htmlFor="total" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    Total
                                </label>
                                <input
                                    type="number"
                                    id="total"
                                    name="total"
                                    value={formData.total}
                                    onChange={handleChange}
                                    className="block w-full p-2.5 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Masukkan total harga"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex justify-between mt-4">
                            <button
                                type="submit"
                                className="w-[139px] h-[45px] text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                                style={{ backgroundColor: "#1e429f" }}
                            >
                                Tambah
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-[139px] h-[45px] text-blue-800 border-2 border-blue-800 rounded-lg hover:bg-blue-600 font-medium text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700"
                            >
                                Batalkan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
