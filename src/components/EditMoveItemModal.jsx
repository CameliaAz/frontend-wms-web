import React, { useState, useEffect } from "react";

export default function EditMoveItemModal({ item, isOpen, onClose, onEdit, lokasiTujuan }) {
    const [formData, setFormData] = useState({
        lokasiTujuan: "",
    });

    useEffect(() => {
        if (item) {
            setFormData({
                lokasiTujuan: item.lokasiTujuan || "",
            });
        }
    }, [item]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleEdit = (e) => {
        e.preventDefault();

        if (formData.lokasiTujuan.trim()) {
            onEdit({
                ...item,
                lokasiTujuan: formData.lokasiTujuan,
            });
            alert("Barang berhasil diperbarui!");
            onClose();
        } else {
            alert("Lokasi tujuan harus dipilih!");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black-500 bg-opacity-10 overflow-y-auto">
            <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                        Edit Barang Pindah
                    </h2>
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
                <form onSubmit={handleEdit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Nama Barang
                        </label>
                        <p className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white">{item?.nama_barang}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Lokasi Asal
                        </label>
                        <p className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white">{item?.id_lokasi_sumber}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Jumlah Barang
                        </label>
                        <p className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white">{item?.jumlah_pindah}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Lokasi Tujuan
                        </label>
                        <select
                            name="lokasiTujuan"
                            value={formData.lokasiTujuan}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                            required
                        >
                            <option value="">Pilih Rak</option>
                            {lokasiTujuan?.map((lokasi) => (
                                <option key={lokasi.id} value={lokasi.nama_rak}>
                                    {lokasi.nama_rak}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Bagian Rak
                        </label>
                        <select
                            name="lokasiTujuan"
                            value={formData.lokasiTujuan}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                            required
                        >
                            <option value="">Pilih Bagian Rak</option>
                            {lokasiTujuan?.map((lokasi) => (
                                <option key={lokasi.id} value={lokasi.nama_lokasi}>
                                    {lokasi.nama_lokasi}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-600"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Simpan Perubahan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
