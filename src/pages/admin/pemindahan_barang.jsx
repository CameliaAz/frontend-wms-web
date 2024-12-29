import axios from "axios";
import React, { useState, useEffect } from "react";
import TableComponent from "../../components/Table";
import { IoAdd } from "react-icons/io5";
import Navbar from "../../components/Nav";
import Sidebar from "../../components/Sidebar";
import EditMoveItemModal from "../../components/EditMoveItemModal";
import MoveItemModal from "../../components/MoveItemModal";

const PemindahanBarang = () => {
    const [data, setData] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Fetch data saat komponen dimuat
    useEffect(() => {
        fetchItems();
    }, []);

    // Fungsi untuk mengambil data barang
    const fetchItems = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/barang-pindah");
            console.log(response.data); // Verifikasi struktur data
            setData(response.data);
        } catch (error) {
            console.error("Failed to fetch items:", error);
        }
    };

    // Fungsi untuk menghapus item
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/barang-pindah/${id}`);
            setData(data.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Failed to delete item:", error);
        }
    };

    // Fungsi untuk menambahkan item
    const handleAddItem = async (newItem) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/barang-pindah", newItem);
            setData([...data, response.data]);
        } catch (error) {
            console.error("Failed to add item:", error);
        }
    };

    // Fungsi untuk memperbarui item
    const handleUpdateItem = async (updatedItem) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/barang-pindah/${updatedItem.id}`, updatedItem);
            setData(data.map((item) => (item.id === updatedItem.id ? response.data : item)));
            setEditModalOpen(false);
        } catch (error) {
            console.error("Failed to update item:", error);
        }
    };

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    // Kolom yang akan ditampilkan di tabel
    const columns = [
        { key: "id", title: "ID", dataIndex: "id" },
        { key: "nama_barang", title: "Nama Barang", dataIndex: "nama_barang" },
        { key: "nama_rak", title: "Lokasi Asal", dataIndex: "nama_rak" },
        { key: "nama_rak", title: "Lokasi Tujuan", dataIndex: "nama_rak" },
        { key: "jumlah", title: "Jumlah", dataIndex: "jumlah_pindah" },
        { key: "name", title: "Admin", dataIndex: "name" },
    ];

    // Fungsi untuk merender aksi edit dan hapus
    const renderActions = (row) => (
        <div className="flex gap-2">
            <button
                onClick={() => {
                    setSelectedItem(row);
                    setEditModalOpen(true);
                }}
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
                    <h1 className="text-2xl font-bold mb-4">Riwayat Pemindahan Barang</h1>

                    {/* <div
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
                    </div> */}

                    {/* Tabel */}
                    <TableComponent
                        columns={columns}
                        data={data}
                        renderActions={renderActions}
                    />

                    {/* Modal untuk menambahkan dan mengedit item */}
                    <MoveItemModal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        onSubmit={handleAddItem}
                    />

                    <EditMoveItemModal
                        isOpen={isEditModalOpen}
                        onClose={() => setEditModalOpen(false)}
                        item={selectedItem}
                        onUpdate={handleUpdateItem}
                    />
                </div>
            </div>
        </>
    );
};

export default PemindahanBarang;
