import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoAdd } from 'react-icons/io5';
import TableComponent from '../../../components/Table';
import Navbar from '../../../components/Nav';
import Sidebar from '../../../components/Sidebar';
import AddKategoriModal from '../../../components/AddKategoriModal';
import EditKategoriModal from '../../../components/EditKategoriModal';

export default function Kategori() {
    const [kategori, setKategori] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const [selectedKategori, setSelectedKategori] = useState(null);
    const [isDeleteWarningOpen, setIsDeleteWarningOpen] = useState(false);
    const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
    const [kategoriToDelete, setKategoriToDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchKategori = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/kategori');
                setKategori(Array.isArray(response.data) ? response.data : []);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching kategori:', error);
                setError('Failed to fetch kategori');
                setIsLoading(false);
            }
        };

        fetchKategori();

        return () => setIsLoading(false);
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleAddKategori = async (newKategori) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/kategori', newKategori);
            setKategori((prevKategori) => [...prevKategori, response.data]);
            closeModal();
        } catch (error) {
            console.error('Error adding kategori:', error);
            setError('Failed to add kategori');
        }
    };

    const handleEdit = (id) => {
        const kategoriItem = kategori.find((kategori) => kategori.id === id);
        if (kategori) {
            setSelectedKategori(kategori);
            setIsEditModalOpen(true);
        }
    };

    const handleEditKategori = async (updatedKategori) => {
        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/kategori/${updatedKategori.id}`,
                updatedKategori
            );
            setKategori((prevKategori) =>
                prevKategori.map((kategori) =>
                    kategori.id === updatedKategori.id ? response.data : kategori
                )
            );
            setIsEditModalOpen(false);
        } catch (error) {
            console.error('Error editing kategori:', error);
            setError('Failed to update kategori');
        }
    };

    // Confirm Delete
    const confirmDeleteKategori = (id) => {
        setKategoriToDelete(id);
        setIsDeleteWarningOpen(true);
    };

    const deleteKategori = async () => {
        if (!kategoriToDelete) return;
        try {
            await axios.delete(`http://127.0.0.1:8000/api/kategori/${kategoriToDelete}`);
            setKategori((prevKategori) =>
                prevKategori.filter((kategori) => kategori.id !== kategoriToDelete)
            );
            setIsSuccessPopupOpen(true);
            setTimeout(() => {
                setIsSuccessPopupOpen(false);
            }, 3000);
        } catch (error) {
            console.error('Error deleting kategori:', error);
        }
        finally {
            setIsDeleteWarningOpen(false);
            setKategoriToDelete(null);
        }
    };

    const columns = [
        {
            title: "ID",
            key: "id",
            dataIndex: "id",
        },
        {
            title: "Nama Kategori",
            key: "nama_kat",
            dataIndex: "nama_kat",
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
                onClick={() => deleteKategori(row.id)}
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
                    <h1 className="text-2xl font-bold mb-4">Data Kategori</h1>

                    <div
                        className="h-[47px] px-5 py-2.5 rounded-lg justify-center items-center gap-2 inline-flex mb-6"
                        style={{ backgroundColor: "#1e429f" }}
                    >
                        <IoAdd className="w-5 h-5 text-white" />
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-white text-sm font-semibold font-['Poppins'] leading-[21px] cursor-pointer hover:underline"
                        >
                            Tambahkan Kategori
                        </button>
                    </div>

                    {/* Add Kategori Modal */}
                    <AddKategoriModal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        onAddKategori={handleAddKategori}
                    />

                    {/* Error Display */}
                    {error && <div className="text-red-500">{error}</div>}

                    {/* Table of Kategori */}
                    <TableComponent
                        columns={columns}
                        data={kategori}
                        renderActions={renderActions}
                    />

                    {/* Edit Kategori Modal */}
                    <EditKategoriModal
                        supplierData={selectedKategori}
                        isModalOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        onEditKategori={handleEditKategori}
                    />
                    {/* Delete Warning Modal */}
                    {isDeleteWarningOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white p-6 rounded shadow-lg">
                                <h2 className="text-xl font-bold mb-4">Apakah Anda yakin ingin menghapus?</h2>
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => setIsDeleteWarningOpen(false)}
                                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={deleteKategori}
                                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Success Popup */}
                    {isSuccessPopupOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-green-500 p-6 rounded shadow-lg">
                                <h2 className="text-xl font-bold text-white">Data berhasil dihapus!</h2>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
