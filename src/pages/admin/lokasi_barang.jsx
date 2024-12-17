import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Nav";
import TableComponent from "../../components/Table";
import AddItemLokasi from "../../components/AddItemLokasi";
import EditLokasiModal from "../../components/EditLokasiModal";
import MoveItemModal from "../../components/MoveItemModal";
import { IoAdd } from "react-icons/io5";
import axios from 'axios';

export default function LokasiBarang() {
    const initialData = [
        {
            id: 1,
            nama_barang: "Azzarine",
            tanggal_masuk: "09-12-2024",
            kategori: "Lipstick",
            stok: "10000",
            exp: "12-2026",
            lokasi: "Rak A Atas",
        },
    ];

    const initialLocations = [
        { id: 1, lokasi: "Rak A Atas", isFilled: true },
        { id: 2, lokasi: "Rak A Tengah", isFilled: false },
        { id: 3, lokasi: "Rak A Bawah", isFilled: false },
    ];

    const [isModalOpen, setModalOpen] = useState(false);
    const [data, setData] = useState(initialData);
    const [locations, setLocations] = useState(initialLocations);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isMoveModalOpen, setMoveModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const columns = [
        { key: "id", title: "ID", dataIndex: "id" },
        { key: "nama_barang", title: "Nama Barang", dataIndex: "nama_barang" },
        { key: "tanggal_masuk", title: "Tanggal Masuk", dataIndex: "tanggal_masuk" },
        { key: "kategori", title: "Kategori", dataIndex: "kategori" },
        { key: "stok", title: "Stok", dataIndex: "stok" },
        { key: "exp", title: "Expired", dataIndex: "exp" },
        { key: "lokasi", title: "Lokasi Barang", dataIndex: "lokasi" },
    ];

    const handleOpenModal = () => setModalOpen(true);

    const handleEditClick = (item) => {
        setSelectedItem(item); // Menetapkan item yang dipilih untuk diubah
        setEditModalOpen(true); // Membuka modal Edit
    };

    const handleMoveClick = (item) => {
        setSelectedItem(item); // Menetapkan item yang dipilih untuk dipindahkan
        setMoveModalOpen(true); // Membuka modal Pindahkan
    };

    const renderActions = (row) => (
        <div className="flex gap-2">
            <button
                onClick={() => handleEditClick(row)} // Memanggil handleEditClick dengan row yang dipilih
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
                onClick={() => handleMoveClick(row)} // Memanggil handleMoveClick dengan row yang dipilih
                className="h-[22px] px-2.5 py-[5px] font-medium text-white bg-blue-700 rounded border-2 border-blue-400 hover:underline"
            >
                Pindahkan
            </button>
        </div>
    );

    const handleAdd = (newItem) => {
        setData((prevData) => [
            ...prevData,
            { id: prevData.length + 1, ...newItem },
        ]);
        setModalOpen(false);
        alert("Data berhasil ditambahkan!");
    };

    const handleDelete = (id) => {
        const deletedItem = data.find((item) => item.id === id);
        if (deletedItem) {
            setLocations((prevLocations) =>
                prevLocations.map((loc) =>
                    loc.lokasi === deletedItem.lokasi ? { ...loc, isFilled: false } : loc
                )
            );
        }
        setData((prevData) => prevData.filter((item) => item.id !== id));
    };

    return (
        <div>
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
                    <h1 className="text-2xl font-bold mb-4">Lokasi Barang</h1>

                    {/* Button Tambahkan Data */}
                    <div
                        className="h-[47px] px-5 py-2.5 rounded-lg justify-center items-center gap-2 inline-flex mb-6"
                        style={{ backgroundColor: "#1e429f" }}
                    >
                        <IoAdd className="w-5 h-5 text-white" />
                        <button
                            onClick={handleOpenModal}
                            className="text-white text-sm font-semibold font-['Poppins'] leading-[21px] cursor-pointer hover:underline"
                        >
                            Tambahkan Data
                        </button>
                    </div>

                    {/* Table Component */}
                    <TableComponent
                        columns={columns}
                        data={data}
                        renderActions={renderActions}
                    />

                    {/* Add Item Modal */}
                    {isModalOpen && (
                        <AddItemLokasi
                            isOpen={isModalOpen}
                            onClose={() => setModalOpen(false)}
                            onAdd={handleAdd}
                            locations={locations.filter((loc) => !loc.isFilled)}
                        />
                    )}

                    {/* Edit Item Modal */}
                    {isEditModalOpen && selectedItem && (
                        <EditLokasiModal
                            item={selectedItem}
                            locations={locations.filter(
                                (loc) => !loc.isFilled || loc.lokasi === selectedItem.lokasi
                            )}
                            onEdit={handleAdd} // Menangani logika pengeditan di sini
                            onClose={() => setEditModalOpen(false)}
                        />
                    )}

                    {/* Move Item Modal */}
                    {isMoveModalOpen && selectedItem && (
                        <MoveItemModal
                            item={selectedItem}
                            locations={locations.filter(
                                (loc) => !loc.isFilled || loc.lokasi === selectedItem.lokasi
                            )}
                            onMove={handleAdd} // Menangani logika pemindahan di sini
                            onClose={() => setMoveModalOpen(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
