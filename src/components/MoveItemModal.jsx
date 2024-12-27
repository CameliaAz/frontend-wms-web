import React, { useState } from "react";


function MoveItemModal({ isOpen, onClose, onMove, onEdit, onDelete, item, locations }) {
    const [formData, setFormData] = useState({
        lokasi_asal: item?.lokasi || "",
        lokasi_tujuan: "",
        jumlah: item?.stok || 0,
        tanggal: "",
        deskripsi: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleMoveClick = () => {
        if (formData.jumlah <= 0) {
            alert("Jumlah harus lebih besar dari 0");
            return;
        }

        if (item?.stok < formData.jumlah) {
            alert("Jumlah yang dipindahkan melebihi stok yang tersedia");
            return;
        }

        const lokasiTujuan = locations.find((loc) => loc.lokasi === formData.lokasi_tujuan);
        if (!lokasiTujuan) {
            alert("Lokasi tujuan tidak ditemukan");
            return;
        }

        const updatedItem = { ...item, stok: item.stok - formData.jumlah };
        const updatedLokasiTujuan = {
            ...lokasiTujuan,
            stok: lokasiTujuan.stok + formData.jumlah,
        };

        onMove(updatedItem, updatedLokasiTujuan);
        onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleMoveClick();
    };

    if (!isOpen) return null;

    // Filter lokasi tujuan untuk hanya menampilkan lokasi kosong
    const availableLocations = locations.filter((loc) => loc.stok === 0);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-4xl w-full">
                <h1 className="text-2xl font-bold text-center mb-8">Pemindahan Lokasi Barang</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-xl font-bold mb-4">Lokasi Asal</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Nama Produk</label>
                            <input
                                type="text"
                                value={item?.nama_produk || ""}
                                className="w-full p-2 border rounded"
                                readOnly
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Jumlah Stok Produk</label>
                            <input
                                type="text"
                                value={item?.stok || 0}
                                className="w-full p-2 border rounded"
                                readOnly
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Lokasi Asal</label>
                            <input
                                type="text"
                                value={formData.lokasi_asal}
                                className="w-full p-2 border rounded"
                                readOnly
                            />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-4">Lokasi Tujuan</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Nama Produk</label>
                            <input
                                type="text"
                                value={item?.nama_produk || ""}
                                className="w-full p-2 border rounded"
                                readOnly
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Jumlah Pemindahan Stok Produk</label>
                            <input
                                type="number"
                                name="jumlah"
                                value={formData.jumlah}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                min="1"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Lokasi Tujuan</label>
                            <select
                                name="lokasi_tujuan"
                                value={formData.lokasi_tujuan}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Pilih Lokasi</option>
                                {availableLocations.map((loc) => (
                                    <option key={loc.id} value={loc.lokasi}>
                                        {loc.lokasi}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center space-x-4 mt-8">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Pindahkan
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-white text-blue-700 border border-blue-700 px-4 py-2 rounded"
                    >
                        Batalkan
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MoveItemModal;
