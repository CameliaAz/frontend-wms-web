import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { MdClose } from "react-icons/md";

export default function AddItemModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        namaProduk: "",
        kategori: "",
        expired: "",
        tanggalPenerimaan: "",
        harga: "",
        jumlah: "",
        kode: "",
        deskripsi: "",
        foto: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            foto: file,
        }));
    };

    const handleSubmit = () => {
        // Handle form submit logic
        console.log(formData);
        onClose();  // Close the modal after submitting the form
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow-lg dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-['Poppins'] font-bold text-gray-900 dark:text-white">Penambahan Data Barang</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                <div className="p-2">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                        <div>
                                <label htmlFor="fotoProduk" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    Foto Produk
                                </label>
                                <input
                                    type="file"
                                    id="fotoProduk"
                                    name="fotoProduk"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    aria-describedby="user_avatar_help"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="namaProduk" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    Nama Produk
                                </label>
                                <input
                                    type="text"
                                    id="namaProduk"
                                    name="namaProduk"
                                    value={formData.namaProduk}
                                    onChange={handleChange}
                                    className="block w-full p-2.5  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Masukkan nama produk"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="ukuranProduk" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    Ukuran
                                </label>
                                <input
                                    type="text"
                                    id="ukuranProduk"
                                    name="ukuranProduk"
                                    value={formData.ukuranProduk}
                                    onChange={handleChange}
                                    className="block w-full p-2.5 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Masukkan nama produk"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="varianProduk" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    Varian
                                </label>
                                <input
                                    type="text"
                                    id="varianProduk"
                                    name="varianProduk"
                                    value={formData.varianProduk}
                                    onChange={handleChange}
                                    className="block w-full p-2.5 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Masukkan nama produk"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="suplierProduk" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    Suplier Produk
                                </label>
                                <input
                                    type="text"
                                    id="suplierProduk"
                                    name="suplierProduk"
                                    value={formData.suplierProduk}
                                    onChange={handleChange}
                                    className="block w-full p-2.5 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Masukkan supplier produk"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="namaKategori" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    Nama Kategori
                                </label>
                                <select
                                    id="namaKategori"
                                    name="namaKategori"
                                    value={formData.kategori}
                                    onChange={handleChange}
                                    className="block w-full p-2.5 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                >
                                    <option value="kategori" disabled>
                                        Pilih kategori
                                    </option>
                                    <option value="kategori1">Parfum</option>
                                    <option value="kategori2">Micellar Water</option>
                                    <option value="kategori3">Handbody</option>
                                    {/* Tambahkan kategori lain sesuai kebutuhan */}
                                </select>
                            </div>


                            <div>
                                <label htmlFor="expiredProduk" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    Expired Produk
                                </label>
                                <input
                                    type="date"
                                    id="expiredProduk"
                                    name="expiredProduk"
                                    value={formData.expiredProduk}
                                    onChange={handleChange}
                                    className="block w-full p-2.5 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="tanggalPenerimaan" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    Tanggal Penerimaan Produk
                                </label>
                                <input
                                    type="date"
                                    id="tanggalPenerimaan"
                                    name="tanggalPenerimaan"
                                    value={formData.tanggalPenerimaan}
                                    onChange={handleChange}
                                    className="block w-full p-2.5 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="hargaProduk" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    Harga Produk
                                </label>
                                <input
                                    type="number"
                                    id="hargaProduk"
                                    name="hargaProduk"
                                    value={formData.hargaProduk}
                                    onChange={handleChange}
                                    className="block w-full p-2.5 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Masukkan harga produk"
                                    required
                                />
                            </div>


                            <div>
                                <label htmlFor="jumlahPenerimaan" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    Jumlah Penerimaan Produk
                                </label>
                                <input
                                    type="number"
                                    id="jumlahPenerimaan"
                                    name="jumlahPenerimaan"
                                    value={formData.jumlahPenerimaan}
                                    onChange={handleChange}
                                    className="block w-full p-2.5 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Masukkan stok produk"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="kodeProduk" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    Kode Produk
                                </label>
                                <input
                                    type="text"
                                    id="kodeProduk"
                                    name="kodeProduk"
                                    value={formData.kodeProduk}
                                    onChange={handleChange}
                                    className="block w-full p-2.5 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Masukkan kode produk"
                                    required
                                />
                            </div>

                        </div>

                        <div>
                                <label htmlFor="deskripsiProduk" className="block text-sm font-medium text-gray-900 dark:text-white">
                                    Deskripsi Produk
                                </label>
                                <textarea
                                    id="deskripsiProduk"
                                    name="deskripsiProduk"
                                    value={formData.deskripsiProduk}
                                    onChange={handleChange}
                                    rows="4"
                                    className="block w-full p-2.5 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Write text here ..."
                                    required
                                ></textarea>
                            </div>

                        <div className="flex justify-between mt-4">
                            <button
                                type="submit"
                                className="w-[139px] h-[45px] text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
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
