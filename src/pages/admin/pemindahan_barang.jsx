import React, { useState } from "react";
import TableComponent from "../../components/Table";
import { IoAdd } from "react-icons/io5";
import Navbar from "../../components/Nav";
import Sidebar from "../../components/Sidebar";
import EditItemModal from "../../components/EditItemModal";
import MoveItemModal from "../../components/MoveItemModal";
import axios from 'axios';

const initialData = [
    {
        id: 1,
        itemName: "Azzarine", // Nama Barang
        date: "09-12-2024", // Tanggal Masuk
        sourceLocation: "Rak B Bawah", // Lokasi Asal
        targetLocation: "Rak A Atas", // Lokasi Tujuan
        quantity: 100, // Quantity
        admin: "A", // Admin
    },
    {
        id: 2,
        itemName: "Maybelline", // Nama Barang
        date: "10-12-2024", // Tanggal Masuk
        sourceLocation: "Rak B Atas", // Lokasi Asal
        targetLocation: "Rak B Tengah", // Lokasi Tujuan
        quantity: 200, // Quantity
        admin: "B", // Admin
    },
    {
        id: 3,
        itemName: "L'Oreal", // Nama Barang
        date: "11-12-2024", // Tanggal Masuk
        sourceLocation: "Rak C Atas", // Lokasi Asal
        targetLocation: "Rak C Bawah", // Lokasi Tujuan
        quantity: 150, // Quantity
        admin: "C", // Admin
    },
    {
        id: 4,
        itemName: "Revlon", // Nama Barang
        date: "12-12-2024", // Tanggal Masuk
        sourceLocation: "Rak D Bawah", // Lokasi Asal
        targetLocation: "Rak D Atas", // Lokasi Tujuan
        quantity: 80, // Quantity
        admin: "D", // Admin
    },
    // Tambah data lainnya jika perlu
];

const PemindahanBarang = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [data, setData] = useState(initialData);




    const columns = [
        { key: "id", title: "ID", dataIndex: "id" },
        { key: "itemName", title: "Nama Barang", dataIndex: "itemName" }, // Corrected column name
        { key: "date", title: "Tanggal Masuk", dataIndex: "date" }, // Corrected column name
        { key: "sourceLocation", title: "Lokasi Asal", dataIndex: "sourceLocation" }, // Corrected column name
        { key: "targetLocation", title: "Lokasi Tujuan", dataIndex: "targetLocation" }, // Corrected column name
        { key: "quantity", title: "Quantity", dataIndex: "quantity" }, // Corrected column name
        { key: "admin", title: "Admin", dataIndex: "admin" }, // Corrected column name
    ];

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
                Hapus
            </button>
            <button
                onClick={() => handleMoveClick(row.id)}
                className="h-[22px] px-2.5 py-[5px] font-medium text-white bg-blue-700 rounded border-2 border-blue-400 hover:underline"
            >
                Pindahkan
            </button>
        </div>
    );

    const handleEdit = (item) => {
        setSelectedItem(item);
        setEditModalOpen(true);
    };

    const handleDelete = (id) => {
        setData((prevData) => prevData.filter((item) => item.id !== id));
    };

    const handleFilter = (key, value) => {
        // Implementasi logika filter di sini
        console.log(`Filtering by ${key}: ${value}`);
    };

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

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
                    <h1 className="text-2xl font-bold mb-4">Riwayat Pemindahan Barang</h1>

                    {/* Filter dan Pencarian
                    <div className="flex flex-wrap gap-4 mb-6">
                        <input
                            type="text"
                            placeholder="Nama Barang"
                            className="border border-gray-300 p-2 rounded w-1/4"
                            onChange={(e) => handleFilter("itemName", e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Lokasi Asal/Tujuan"
                            className="border border-gray-300 p-2 rounded w-1/4"
                            onChange={(e) => handleFilter("location", e.target.value)}
                        />
                        <input
                            type="date"
                            className="border border-gray-300 p-2 rounded w-1/4"
                            onChange={(e) => handleFilter("date", e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Admin"
                            className="border border-gray-300 p-2 rounded w-1/4"
                            onChange={(e) => handleFilter("admin", e.target.value)}
                        />
                    </div> */}

                    {/* Tambah Pemindahan Barang */}
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
                        <MoveItemModal isOpen={isModalOpen} onClose={closeModal} />
                    </div>

                    {/* Tabel */}
                    <TableComponent
                        columns={columns}
                        data={data}
                        renderActions={renderActions}
                        filterKey="nama_barang"
                        onFilter={handleFilter}
                    />

                    {/* Edit Modal */}
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
                </div>
            </div>
        </>
    );
};

export default PemindahanBarang;
