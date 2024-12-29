import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Nav";
import TableComponent from "../../../components/Table";
import AddItemLokasi from "../../../components/AddItemLokasi";
import EditLokasiModal from "../../../components/EditLokasiModal";
import MoveItemModal from "../../../components/MoveItemModal";
import DataKeluar from "../../../components/AddDataKeluar";
import { IoAdd } from "react-icons/io5";

export default function LokasiBarang() {
    const [data, setData] = useState([]);
    const [locations, setLocations] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isMoveModalOpen, setMoveModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isKeluarkanModalOpen, setKeluarkanModalOpen] = useState(false);
    const [lokasiTujuan, setLokasiTujuan] = useState([]);



    const columns = [
        { key: "id", title: "ID", dataIndex: "id" },
        { key: "nama_barang", title: "Nama Barang", dataIndex: "nama_barang" },
        { key: "tgl_masuk", title: "Tanggal Masuk", dataIndex: "tgl_masuk" },
        { key: "nama_kat", title: "Kategori", dataIndex: "nama_kat" },
        { key: "jumlah_barang_masuk", title: "Stok", dataIndex: "jumlah_barang_masuk" },
        { key: "exp", title: "Expired", dataIndex: "exp" },
        { key: "nama_rak", title: "Lokasi Barang", dataIndex: "nama_rak" },
        { key: "nama_lokasi", title: "Bagian Rak", dataIndex: "nama_lokasi" },
    ];

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/rak')  // Ganti URL ini sesuai kebutuhan
            .then((response) => {
                setLocations(response.data);
                setLokasiTujuan(response.data.filter(loc => !loc.isFilled));
            })
            .catch((error) => console.error('Error fetching locations:', error));
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get("http://127.0.0.1:8000/api/barang-masuk")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    const handleOpenModal = () => setModalOpen(true);

    const handleAdd = (newItem) => {
        axios.post("http://127.0.0.1:8000/api/barang-masuk", newItem)
            .then((response) => {
                setData((prevData) => [...prevData, response.data]);
                setModalOpen(false);
                alert("Data berhasil ditambahkan!");
            })
            .catch((error) => console.error("Error adding data:", error));
    };

    const handleDelete = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/barang-masuk/${id}`)
            .then(() => {
                setData((prevData) => prevData.filter((item) => item.id !== id));
                alert("Data berhasil dihapus!");
            })
            .catch((error) => console.error("Error deleting data:", error));
    };

    const handleEditClick = (item) => {
        setSelectedItem(item);
        setEditModalOpen(true);
    };

    const handleMoveClick = (item) => {
        setSelectedItem(item);
        setMoveModalOpen(true);
    };


    const handleKeluarkanClick = (item) => {
        setSelectedItem(item);
        setKeluarkanModalOpen(true);
    };

    const renderActions = (row) => (
        <div className="flex gap-2">
            <button
                onClick={() => handleDelete(row.id)}
                className="h-[22px] px-2.5 py-[5px] font-medium text-white bg-red-700 rounded border-2 border-red-400 hover:underline"
            >
                Hapus
            </button>
            <button
                onClick={() => handleMoveClick(row)}
                className="h-[22px] px-2.5 py-[5px] font-medium text-white bg-blue-700 rounded border-2 border-blue-400 hover:underline"
            >
                Pindahkan
            </button>
            <button
                onClick={() => handleKeluarkanClick(row)}
                className="h-[22px] px-2.5 py-[5px] font-medium text-white bg-yellow-600 rounded border-2 border-yellow-400 hover:underline"
            >
                Keluarkan
            </button>
        </div>
    );

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
                <div className="flex-1 p-8 overflow-x-auto">
                    <h1 className="text-2xl font-bold mb-4">Lokasi Barang</h1>

                    {/* Button Tambahkan Data */}
                    {/* <div
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
                    </div> */}

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

                    <MoveItemModal
                        item={selectedItem}
                        onMove={handleMoveClick}
                        onClose={() => setMoveModalOpen(false)}
                        lokasiTujuan={lokasiTujuan}  // Kirim lokasi tujuan ke modal
                        isOpen={isMoveModalOpen}
                    />


                    {/* Edit Item Modal */}
                    {isEditModalOpen && selectedItem && (
                        <EditLokasiModal
                            item={selectedItem}
                            onEdit={(updatedItem) => {
                                axios.put(`http://127.0.0.1:8000/api/rak/${updatedItem.id}`, updatedItem)
                                    .then((response) => {
                                        setData((prevData) =>
                                            prevData.map((item) =>
                                                item.id === updatedItem.id ? response.data : item
                                            )
                                        );
                                        setEditModalOpen(false);
                                        alert("Data berhasil diubah!");
                                    })
                                    .catch((error) =>
                                        console.error("Error updating data:", error)
                                    );
                            }}
                            onClose={() => setEditModalOpen(false)}
                        />
                    )}

                    {/* Move Item Modal */}
                    {isMoveModalOpen && selectedItem && (
                        <MoveItemModal
                            item={selectedItem}
                            onMove={(updatedItem) => {
                                axios.put(`http://127.0.0.1:8000/api/rak/${updatedItem.id}`, updatedItem)
                                    .then((response) => {
                                        setData((prevData) =>
                                            prevData.map((item) =>
                                                item.id === updatedItem.id ? response.data : item
                                            )
                                        );
                                        setMoveModalOpen(false);
                                        alert("Data berhasil dipindahkan!");
                                    })
                                    .catch((error) =>
                                        console.error("Error moving data:", error)
                                    );
                            }}
                            onClose={() => setMoveModalOpen(false)}
                        />
                    )}
                    {isKeluarkanModalOpen && selectedItem && (
                        <DataKeluar
                            item={selectedItem}
                            isOpen={isKeluarkanModalOpen}
                            onClose={() => setKeluarkanModalOpen(false)}
                            onKeluarkan={(updatedItem) => {
                                axios.post(`http://127.0.0.1:8000/api/barang-keluar`, updatedItem)
                                    .then((response) => {
                                        setData((prevData) =>
                                            prevData.map((item) =>
                                                item.id === updatedItem.id ? response.data : item
                                            )
                                        );
                                        setKeluarkanModalOpen(false);
                                        alert("Data berhasil dikeluarkan!");
                                    })
                                    .catch((error) =>
                                        console.error("Error releasing data:", error)
                                    );
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
