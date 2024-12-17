import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Nav";
import TableComponent from "../../../components/Table";
import AddItemModal from "../../../components/AddItemModal";
import EditItemModal from "../../../components/EditItemModal";
import { IoAdd } from "react-icons/io5";
import axios from 'axios';

export default function PenerimaanBarang() {
    // Data awal
    const initialData = [
        {
            id: 1,
            nama_barang: "Azarine Liptint Cupcake 10ml",
            tanggal_masuk: "2024-12-01",
            kategori: "Lipstick",
            suplier: "PT Wahana",
            stok: "1000",
            exp: "12-2026",
            harga_beli: "500.000",
            gambar: "", // Contoh gambar
        },
        {
            id: 2,
            nama_barang: "Victoria Parfum",
            tanggal_masuk: "2024-12-02",
            kategori: "Parfum",
            suplier: "PT A",
            stok: "500",
            exp: "12-2026",
            harga_beli: "1.000.000",
            gambar: "",
        },
        {
            id: 3,
            nama_barang: "G2GLOW Micellar Water 100ml",
            tanggal_masuk: "2024-12-03",
            kategori: "Micellar Water",
            suplier: "PT B",
            stok: "100",
            exp: "12-2026",
            harga_beli: "500.000",
            gambar: "",
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
        { key: "nama_barang", title: "Nama Barang", dataIndex: "nama_barang" },
        { key: "tanggal_masuk", title: "Tanggal Masuk", dataIndex: "tanggal_masuk" },
        { key: "kategori", title: "Kategori", dataIndex: "kategori" },
        { key: "suplier", title: "Suplier", dataIndex: "suplier" },
        { key: "stok", title: "Stok", dataIndex: "stok" },
        { key: "exp", title: "Expired", dataIndex: "exp" },
        { key: "harga_beli", title: "Harga Beli", dataIndex: "harga_beli" },
        {
            key: "gambar",
            title: "Gambar Produk",
            dataIndex: "gambar",
            render: (text) =>
                text ? (
                    <img
                        src={text}
                        alt="Gambar Produk"
                        className="w-16 h-16 object-cover rounded"
                    />
                ) : (
                    "-"
                ),
        },
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

    // Fungsi untuk edit data
    const handleEdit = (id) => {
        const itemToEdit = data.find((item) => item.id === id);
        if (itemToEdit) {
            setSelectedItem(itemToEdit);
            setEditModalOpen(true);
        }
    };

    // Fungsi untuk delete data
    const handleDelete = (id) => {
        const confirmDelete = window.confirm(
            "Apakah Anda yakin ingin menghapus barang ini?"
        );
        if (confirmDelete) {
            const updatedData = data.filter((item) => item.id !== id);
            setData(updatedData);
        }
    };

    // Fungsi untuk filter data berdasarkan nama_barang
    const handleFilter = (filterValue) => {
        setData(
            initialData.filter((item) =>
                item.nama_barang.toLowerCase().includes(filterValue.toLowerCase())
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
                    <h1 className="text-2xl font-bold mb-4">Barang Masuk</h1>
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
                    <EditItemModal
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
