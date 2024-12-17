import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Nav";
import TableComponent from "../../../components/Table";
import AddItemModal from "../../../components/AddItemModal";
import EditItemKeluar from "../../../components/EditItemKeluar";
import { IoAdd } from "react-icons/io5";
import axios from 'axios';

export default function BarangKeluar() {
    // Data awal
    const initialData = [
        {
            id: 1,
            nama_produk: "Azarine Liptint Cupcake 10ml",
            kategori: "Lipstick",
            jumlah_keluar: 50,
            tanggal_keluar: "2024-12-10",
            lokasi_asal: "Gudang A",
            tujuan_keluar: "Pemindahan ke Gudang B",
            deskripsi: "Pemindahan untuk stok area Timur"
        },
        {
            id: 2,
            nama_produk: "Victoria Parfum",
            kategori: "Parfum",
            jumlah_keluar: 20,
            tanggal_keluar: "2024-12-11",
            lokasi_asal: "Rak 3",
            tujuan_keluar: "Retur ke Supplier",
            deskripsi: "Retur karena barang cacat"
        },
    ];

    const [data, setData] = useState(initialData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Konfigurasi kolom
    const columns = [
        { key: "id", title: "ID", dataIndex: "id" },
        { key: "nama_produk", title: "Nama Produk", dataIndex: "nama_produk" },
        { key: "kategori", title: "Kategori", dataIndex: "kategori" },
        { key: "jumlah_keluar", title: "Jumlah Keluar", dataIndex: "jumlah_keluar" },
        { key: "tanggal_keluar", title: "Tanggal Keluar", dataIndex: "tanggal_keluar" },
        { key: "lokasi_asal", title: "Lokasi Asal", dataIndex: "lokasi_asal" },
        { key: "tujuan_keluar", title: "Tujuan Barang Keluar", dataIndex: "tujuan_keluar" },
        { key: "deskripsi", title: "Deskripsi", dataIndex: "deskripsi" },
    ];

    // Fungsi untuk merender tombol aksi
    const renderActions = (row) => (
        <div className="flex gap-2">
            <button
                onClick={() => handleEdit(row.id)}
                className="h-[22px] px-2.5 py-[5px] font-medium text-white bg-green-800 rounded border-2 border-green-400 hover:underline"
            >
                Edit
            </button>
            <button
                onClick={() => handleDelete(row.id)}
                className="h-[22px] px-2.5 py-[5px] font-medium text-white bg-red-700 rounded border-2 border-red-400 hover:underline"
            >
                Delete
            </button>
        </div>
    );

    const handleEdit = (id) => {
        const itemToEdit = data.find((item) => item.id === id);
        if (itemToEdit) {
            setSelectedItem(itemToEdit);
            setEditModalOpen(true);
        }
    };
    

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus data ini?");
        if (confirmDelete) {
            const updatedData = data.filter((item) => item.id !== id);
            setData(updatedData);
        }
    };

    const handleFilter = (filterValue) => {
        setData(
            initialData.filter((item) =>
                item.nama_produk.toLowerCase().includes(filterValue.toLowerCase())
            )
        );
    };

    return (
        <>
            {/* Navbar */}
            <div className="fixed top-0 left-0 w-full z-10">
                <Navbar />
            </div>

            {/* Content Wrapper */}
            <div className="flex min-h-screen pt-16">
                {/* Sidebar */}
                <div className="w-64 bg-gray-800 text-white">
                    <Sidebar role="admin" />
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8">
                    <h1 className="text-2xl font-bold mb-4">Barang Keluar</h1>
                    <div
                        className="h-[47px] px-5 py-2.5 rounded-lg justify-center items-center gap-2 inline-flex mb-6"
                        style={{ backgroundColor: "#1e429f" }}
                    >
                        <IoAdd className="w-5 h-5 text-white" />
                        <button
                            onClick={openModal}
                            className="text-white text-sm font-semibold font-['Poppins'] leading-[21px] cursor-pointer hover:underline"
                        >
                            Tambahkan Data
                        </button>
                        <AddItemModal isOpen={isModalOpen} onClose={closeModal} />
                    </div>
                    <EditItemKeluar
                        isOpen={isEditModalOpen}
                        onClose={() => setEditModalOpen(false)}
                        item={selectedItem}
                        onUpdate={(updatedItem) => {
                            setData((prevData) =>
                                prevData.map((item) =>
                                    item.id === updatedItem.id ? updatedItem : item
                                )
                            );
                            setEditModalOpen(false);
                        }}
                    />

                    {/* Tabel dengan actions dan filter */}
                    <TableComponent
                        columns={columns}
                        data={data}
                        renderActions={renderActions}
                        filterKey="nama_barang"
                        onFilter={handleFilter}
                    />
                </div>
            </div>
        </>
    );
}
