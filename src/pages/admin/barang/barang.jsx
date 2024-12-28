import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoAdd } from 'react-icons/io5';
import TableComponent from '../../../components/Table';
import Navbar from '../../../components/Nav';
import Sidebar from '../../../components/Sidebar';
import AddBarangModal from '../../../components/AddBarangModal';
import EditBarangModal from '../../../components/EditBarangModal';

export default function Barang() {
    const [barang, setBarang] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const [selectedBarang, setSelectedBarang] = useState(null);
    const navigate = useNavigate();

    // Fetching barang data when component mounts
    useEffect(() => {
        const fetchBarang = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/barang');
                if (Array.isArray(response.data)) {
                    setBarang(response.data); // Sesuai struktur dari backend
                } else {
                    setError('Data format is invalid');
                }
            } catch (error) {
                console.error('Error fetching barang:', error);
                setError('Failed to fetch barang');
            } finally {
                setIsLoading(false);
            }
        };
        fetchBarang();
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleAddBarang = async (newBarang) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/barang', newBarang);
            setBarang((prevBarang) => [...prevBarang, response.data]);
            closeModal();
        } catch (error) {
            console.error('Error adding barang:', error);
            setError('Failed to add barang');
        }
    };

    const handleEdit = (id) => {
        const barangItem = barang.find((barang) => barang.id === id);
        if (barangItem) {
            setSelectedBarang(barangItem);
            setIsEditModalOpen(true);
        }
    };

    const handleEditBarang = async (updatedBarang) => {
        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/barang/${updatedBarang.id}`,
                updatedBarang
            );
            setBarang((prevBarang) =>
                prevBarang.map((barang) =>
                    barang.id === updatedBarang.id ? response.data : barang
                )
            );
            setIsEditModalOpen(false);
        } catch (error) {
            console.error('Error editing barang:', error);
            setError('Failed to update barang');
        }
    };

    const handledeleteBarang = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/barang/${id}`);
            setBarang((prevBarang) =>
                prevBarang.filter((barang) => barang.id !== id)
            );
        } catch (error) {
            console.error('Error deleting barang:', error);
            setError('Failed to delete barang');
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
            dataIndex: "nama_barang", // Sesuaikan dengan backend
        },
        {
            title: "Varian",
            key: "varian",
            dataIndex: "varian",
        },
        {
            title: "Ukuran",
            key: "ukuran",
            dataIndex: "ukuran",
        },
        {
            title: "Deskripsi",
            key: "deskripsi",
            dataIndex: "deskripsi",
        },
        {
            title: "Harga Jual",
            key: "harga_jual",
            dataIndex: "harga_jual",
        },
        {
            title: "Kategori",
            key: "nama_kat",
            dataIndex: "nama_kat", // Menampilkan nama kategori dari join
        },
        {
            title: "Gambar",
            key: "gambar",
            dataIndex: "gambar",
            render: (text, record) =>
                record.gambar ? (
                    <img
                        src={record.gambar}
                        alt="Foto Barang"
                        style={{ width: 50, height: 50, objectFit: "cover" }}
                    />
                ) : (
                    "Tidak ada gambar"
                ),
        },
        
    ];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const renderActions = (row) => (
        <div className="flex gap-2">
            <button
                onClick={() => handleEditBarang(row.id)}
                className="h-[22px] px-2.5 py-[5px] font-medium text-white bg-green-800 rounded border-2 border-green-400 hover:underline"
            >
                Edit
            </button>
            <button
                onClick={() => handleDeleteBarang(row.id)}
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

                <div className="flex-1 p-8">
                    <h1 className="text-2xl font-bold mb-4">Data Barang</h1>

                    {/* Add Barang Modal */}
                    <AddBarangModal 
                        isOpen={isModalOpen} 
                        onClose={closeModal} 
                        onAddBarang={handleAddBarang}
                    />

                    {/* Error Display */}
                    {error && <div className="text-red-500">{error}</div>}

                    {/* Table of Barang */}
                    <TableComponent 
                        columns={columns} 
                        data={barang}
                        rowKey="id" // Ensure each row has a unique key
                        renderActions={renderActions}
                    />

                    {/* Edit Barang Modal */}
                    <EditBarangModal
                        isOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        barang={selectedBarang}
                        onEditUser={handleEditBarang}
                    />
                </div>
            </div>
        </>
    );
}
