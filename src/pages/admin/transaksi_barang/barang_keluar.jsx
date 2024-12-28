import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Nav";
import TableComponent from "../../../components/Table";
import AddDataKeluar from "../../../components/AddDataKeluar";
import EditItemKeluar from "../../../components/EditItemKeluar";
import { IoAdd } from "react-icons/io5";
import axios from "axios";

export default function BarangKeluar() {
    const [kategoriData, setKategoriData] = useState([]);
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Fetch data from backend
    const fetchData = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/barang-keluar");
            console.log(response.data); // Debug log to check response structure
            setData(response.data); // Update the state with the fetched data
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Modal handlers
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Add new data to the backend
    const handleAdd = async (newItem) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/barang-keluar", newItem);
            setData((prevData) => [...prevData, response.data.barang_keluar]);
        } catch (error) {
            console.error("Error adding data:", error);
        }
    };

    // Open the edit modal with the selected item
    const handleEdit = (id) => {
        const itemToEdit = data.find((item) => item.id === id);
        if (itemToEdit) {
            setSelectedItem(itemToEdit);
            setEditModalOpen(true);
        }
    };

    // Update data in the backend
    const handleUpdate = async (updatedItem) => {
        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/barang-keluar/${updatedItem.id}`,
                updatedItem
            );
            setData((prevData) =>
                prevData.map((item) => (item.id === updatedItem.id ? response.data.barang_keluar : item))
            );
            setEditModalOpen(false);
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };

    // Delete item from the backend
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus data ini?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/barang-keluar/${id}`);
                setData((prevData) => prevData.filter((item) => item.id !== id));
            } catch (error) {
                console.error("Error deleting data:", error);
            }
        }
    };

    // Filter data based on search input
    const handleFilter = (filterValue) => {
        setData((prevData) =>
            prevData.filter((item) =>
                item.barang.nama.toLowerCase().includes(filterValue.toLowerCase())
            )
        );
    };

    // Columns definition for table
    const columns = [
        { key: "id", title: "ID", dataIndex: "id" },
        { key: "nama_barang", title: "Nama Barang", dataIndex: "nama_barang" }, // Accessing barang.nama
        { key: "kategori", title: "Kategori", dataIndex: "nama_kat" }, // Accessing kategori.nama_kategori
        { key: "jumlah_keluar", title: "Jumlah Keluar", dataIndex: "jumlah_keluar" }, // Accessing jumlah
        { key: "tanggal_keluar", title: "Tanggal Keluar", dataIndex: "tanggal_keluar" }, // Assuming created_at holds the date
        { key: "nama_rak", title: "Lokasi Asal", dataIndex: "nama_rak" }, // Accessing rak.nama_rak
        { key: "tujuan_keluar", title: "Alasan Keluar", dataIndex: "alasan" }, // Accessing alasan
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

    return (
        <>
            <div className="fixed top-0 left-0 w-full z-10">
                <Navbar />
            </div>
            <div className="flex min-h-screen pt-16">
                <div className="w-64 bg-gray-800 text-white">
                    <Sidebar role="admin" />
                </div>
                <div className="flex-1 p-8 overflow-x-auto">
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
                        <AddDataKeluar isOpen={isModalOpen} onClose={closeModal} onAdd={handleAdd} />
                    </div>
                    <EditItemKeluar
                        isOpen={isEditModalOpen}
                        onClose={() => setEditModalOpen(false)}
                        item={selectedItem}
                        onUpdate={handleUpdate}
                        kategoriList={kategoriData}
                    />
                    <TableComponent
                        columns={columns}
                        data={data}
                        filterKey="barang.nama_barang" // Matching filter to correct field structure
                        onFilter={handleFilter}
                        renderActions={renderActions}
                    />
                </div>
            </div>
        </>
    );
}
