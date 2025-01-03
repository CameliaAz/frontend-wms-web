import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Nav";
import TableComponent from "../../../components/Table";
import AddItemModal from "../../../components/AddItemModal";
import EditItemModal from "../../../components/EditItemModal";
import { IoAdd } from "react-icons/io5";
import axios from 'axios';

export default function BarangMasuk() {
    const [data, setData] = useState([]); // Start with empty data
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Fetch data from the backend when the component is mounted
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/barang-masuk')  // Replace with your actual backend URL
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the data:", error);
            });
    }, []); // Empty dependency array means this effect runs once when the component is mounted

    // Konfigurasi kolom
    const columns = [
        { 
            key: "id", 
            title: "ID", 
            dataIndex: "id",  // Match nested structure from backend
        },
        { 
            key: "nama_barang", 
            title: "Nama Barang", 
            dataIndex: "nama_barang",  // Match nested structure from backend
        },
        { 
            key: "tanggal_masuk", 
            title: "Tanggal Masuk", 
            dataIndex: "tgl_masuk", // Assuming this is the field for the entry date
            render: (text) => text ? new Date(text).toLocaleDateString() : '-' // Format date
        },
        { 
            key: "nama_rak", 
            title: "Rak", 
            dataIndex: "nama_rak", // Assuming this is the field for the entry date
        },
        { 
            key: "nama_lokasi", 
            title: "Bagian Rak", 
            dataIndex: "nama_lokasi", // Assuming this is the field for the entry date
        },
        { 
            key: "kategori", 
            title: "Kategori", 
            dataIndex: "nama_kat"  // Assuming this is a direct field or replace with nested property
        },
        { 
            key: "suplier", 
            title: "Suplier", 
            dataIndex: "nama_sup"  // Match nested structure from backend
        },
        { 
            key: "stok", 
            title: "Stok", 
            dataIndex: "jumlah_barang_masuk"  // Match to the field for stock quantity
        },
        { 
            key: "exp", 
            title: "Expired", 
            dataIndex: "exp", // Assuming this is the correct field name for expiry date
            render: (text) => text || '-'  // Display expired date or fallback
        },
        { 
            key: "harga_beli", 
            title: "Harga Beli", 
            dataIndex: "harga",  // Match with the backend response for purchase price
            render: (text) => text ? `Rp ${parseFloat(text).toLocaleString()}` : '-'  // Format price
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
            axios.delete(`http://127.0.0.1:8000/api/barang-masuk/${id}`)  // Ensure API URL matches
                .then(() => {
                    setData(data.filter(item => item.id !== id));
                })
                .catch(error => {
                    console.error("There was an error deleting the data:", error);
                });
        }
    };

    // Fungsi untuk filter data berdasarkan nama_barang
    const handleFilter = (filterValue) => {
        setData(
            data.filter((item) =>
                item.barang.nama_barang.toLowerCase().includes(filterValue.toLowerCase())  // Filtering based on nama_barang
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
                <div className="flex-1 p-8 overflow-x-auto">
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
