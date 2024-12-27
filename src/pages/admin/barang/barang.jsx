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
                console.log(response.data); // Memeriksa struktur data dari API
                if (Array.isArray(response.data.data)) {
                    setBarang(response.data.data);  // Mengakses array 'data'
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

    const deleteBarang = async (id) => {
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
        key: "nama",  // Ganti 'nama_barang' menjadi 'nama'
        dataIndex: "nama",  // Ganti 'nama_barang' menjadi 'nama'
    },
    {
        title: "Harga",
        key: "harga_beli",  // Ganti 'harga' menjadi 'harga_beli'
        dataIndex: "harga_beli",  // Ganti 'harga' menjadi 'harga_beli'
    },
    {
        title: "Kategori ID",
        key: "kategori_id",
        dataIndex: "kategori_id",  // Menambahkan kategori_id
        render: (text, record) => record.kategori.id, // Menampilkan kategori.id
    },
    {
        title: "Supplier ID",
        key: "supplier_id",
        dataIndex: "supplier_id",  // Menambahkan supplier_id
        render: (text, record) => record.supplier.id, // Menampilkan supplier.id
    },
    {
        title: "Expired",
        key: "expired",
        dataIndex: "expired",  // Menambahkan expired
    },  
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => handleEdit(record.id)}
                        className="h-[22px] px-2.5 py-[5px] font-medium text-white bg-green-800 rounded border-2 border-green-400 hover:underline"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => deleteBarang(record.id)}
                        className="h-[22px] px-2.5 py-[5px] font-medium text-white bg-red-700 rounded border-2 border-red-400 hover:underline"
                    >
                        Delete
                    </button>
                </div>
            ),
        }
    ];

    if (isLoading) {
        return <div>Loading...</div>;
    }

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
