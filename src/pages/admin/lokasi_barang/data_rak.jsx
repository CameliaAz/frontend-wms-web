import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../../components/Nav';
import Sidebar from '../../../components/Sidebar';
import TableComponent from '../../../components/Table';
import AddRakModal from '../../../components/AddRak';
import { IoAdd } from "react-icons/io5";

export default function Rak() {
    const [rak, setRak] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const [selectedRak, setSelectedRak] = useState(null);
    const navigate = useNavigate();

    // Fetch Data Rak
    useEffect(() => {
        const fetchRak = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/rak');
                if (Array.isArray(response.data)) {
                    setRak(response.data); // Sesuai struktur dari backend
                } else {
                    setError('Data format is invalid');
                }
            } catch (error) {
                console.error('Error fetching rak:', error);
                setError('Failed to fetch rak');
            } finally {
                setIsLoading(false);
            }
        };
        fetchRak();
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleAddRak = async (newRak) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/rak', newRak);
            setRak((prevRak) => [...prevRak, response.data]);
            closeModal();
        } catch (error) {
            console.error('Error adding rak:', error);
            setError('Failed to add rak');
        }
    };

    const handleEdit = (id) => {
        const rakItem = rak.find((rak) => rak.id === id);
        if (rakItem) {
            setSelectedRak(rakItem);
            setIsEditModalOpen(true);
        }
    };

    const handleEditRak = async (updatedRak) => {
        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/rak/${updatedRak.id}`,
                updatedRak
            );
            setRak((prevRak) =>
                prevRak.map((rak) =>
                    rak.id === updatedRak.id ? response.data : rak
                )
            );
            setIsEditModalOpen(false);
        } catch (error) {
            console.error('Error editing rak:', error);
            setError('Failed to update rak');
        }
    };

    const deleteRak = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/rak/${id}`);
            setRak((prevRak) => prevRak.filter((rak) => rak.id !== id));
        } catch (error) {
            console.error('Error deleting rak:', error);
            setError('Failed to delete rak');
        }
    };

    const columns = [
        {
            title: "ID",
            key: "id",
            dataIndex: "id",
        },
        {
            title: "Nama Barang",
            key: "nama_barang",
            dataIndex: "nama_barang",
        },
        {
            title: "Nama Rak",
            key: "nama_rak",
            dataIndex: "nama_rak",
        },
        {
            title: "Lokasi Rak",
            key: "nama_lokasi",
            dataIndex: "nama_lokasi",
        },
        {
            title: "Stok",
            key: "jumlah",
            dataIndex: "jumlah",
        },
        {
            title: "EXP",
            key: "exp",
            dataIndex: "exp",
        },
        {
            title: "Status",
            key: "status",
            dataIndex: "status",
            render: (text, row) => (
                <span
                    className={`px-2 py-1 rounded ${row.status === 'available' ? 'bg-green-200' : 'bg-red-200'}`}
                >
                    {row.status || 'unknown'}
                </span>
            ),
        },
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
                onClick={() => deleteRak(row.id)}
                className="h-[22px] px-2.5 py-[5px] font-medium text-white bg-red-700 rounded border-2 border-red-400 hover:underline"
            >
                Delete
            </button>
        </div>
    );

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <div className="fixed top-0 left-0 w-full z-10">
                <Navbar />
            </div>

            <div className="flex min-h-screen pt-16">
                <div className="w-64 bg-gray-800 text-white">
                    <Sidebar role="admin" />
                </div>

                <div className="flex-1 p-8">
                    <h1 className="text-2xl font-bold mb-4">Data Rak</h1>
                    <div
                        className="h-[47px] px-5 py-2.5 rounded-lg justify-center items-center gap-2 inline-flex mb-6"
                        style={{ backgroundColor: "#1e429f" }}
                    >
                        <IoAdd className="w-5 h-5 text-white" />
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-white text-sm font-semibold font-['Poppins'] leading-[21px] cursor-pointer hover:underline"
                        >
                            Tambahkan Rak
                        </button>
                    </div>

                    {/* Add Rak Modal */}
                    <AddRakModal 
                        isOpen={isModalOpen} 
                        onClose={closeModal} 
                        onAddRak={handleAddRak}
                    />

                    {/* Error Display */}
                    {error && <div className="text-red-500">{error}</div>}

                    {/* Table of Rak */}
                    <TableComponent 
                        columns={columns} 
                        data={rak} 
                        renderActions={renderActions} 
                    />
                </div>
            </div>
        </>
    );
}
