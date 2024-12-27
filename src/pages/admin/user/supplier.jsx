import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoAdd } from 'react-icons/io5';
import TableComponent from '../../../components/Table';
import Navbar from '../../../components/Nav';
import Sidebar from '../../../components/Sidebar';
import AddSupplierModal from '../../../components/AddSupplierModal';
import EditSupplierModal from '../../../components/EditSupplierModal';

export default function Supplier() {
    const [suppliers, setSuppliers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [isDeleteWarningOpen, setIsDeleteWarningOpen] = useState(false);
    const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
    const [supplierToDelete, setSupplierToDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/supplier');
                setSuppliers(Array.isArray(response.data) ? response.data : []);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching suppliers:', error);
                setError('Failed to fetch suppliers');
                setIsLoading(false);
            }
        };

        fetchSuppliers();
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Add Supplier
    const handleAddSupplier = (newSupplier) => {
        setSuppliers((prevSuppliers) => [...prevSuppliers, newSupplier]);
    };

    // Edit Supplier
    const handleEdit = (id) => {
        const supplier = suppliers.find((supplier) => supplier.id === id);
        if (supplier) {
            setSelectedSupplier(supplier);
            setIsEditModalOpen(true);
        }
    };

    const handleEditSupplier = async (updatedSupplier) => {
        setIsLoading(true);
        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/supplier/${updatedSupplier.id}`,
                updatedSupplier
            );
            setSuppliers((prevSuppliers) =>
                prevSuppliers.map((supplier) =>
                    supplier.id === updatedSupplier.id ? response.data : supplier
                )
            );
            setIsEditModalOpen(false);
        } catch (error) {
            console.error('Error editing supplier:', error);
            setError('Error editing supplier');
        } finally {
            setIsLoading(false);
        }
    };

    // Confirm Delete
    const confirmDeleteSupplier = (id) => {
        setSupplierToDelete(id);
        setIsDeleteWarningOpen(true);
    };

    const deleteSupplier = async () => {
        if (!supplierToDelete) return;
        try {
            await axios.delete(`http://127.0.0.1:8000/api/supplier/${supplierToDelete}`);
            setSuppliers((prevSuppliers) =>
                prevSuppliers.filter((supplier) => supplier.id !== supplierToDelete)
            );
            setIsSuccessPopupOpen(true);
            setTimeout(() => {
                setIsSuccessPopupOpen(false);
            }, 3000);
        } catch (error) {
            console.error('Error deleting supplier:', error);
        } finally {
            setIsDeleteWarningOpen(false);
            setSupplierToDelete(null);
        }
    };

    const columns = [
        {
            title: "ID",
            key: "id",
            dataIndex: "id",
        },
        {
            title: "Nama Supplier",
            key: "nama_sup",
            dataIndex: "nama_sup",
        },
        {
            title: "Telepon",
            key: "telepon",
            dataIndex: "telepon",
        },
        {
            title: "Alamat",
            key: "alamat",
            dataIndex: "alamat",
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
                onClick={() => confirmDeleteSupplier(row.id)}
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
                    <h1 className="text-2xl font-bold mb-4">Data Supplier</h1>
                    <div
                        className="h-[47px] px-5 py-2.5 rounded-lg justify-center items-center gap-2 inline-flex mb-6"
                        style={{ backgroundColor: "#1e429f" }}
                    >
                        <IoAdd className="w-5 h-5 text-white" />
                        <button
                            onClick={openModal}
                            className="text-white text-sm font-semibold font-['Poppins'] leading-[21px] cursor-pointer hover:underline"
                        >
                            Tambahkan Supplier
                        </button>
                    </div>

                    {/* Add Supplier Modal */}
                    <AddSupplierModal
                        isModalOpen={isModalOpen}
                        onClose={closeModal}
                        onAddSupplier={handleAddSupplier}
                    />

                    {/* Render Table */}
                    <TableComponent
                        columns={columns}
                        data={suppliers}
                        renderActions={renderActions}
                    />

                    {/* Edit Supplier Modal */}
                    <EditSupplierModal
                        supplierData={selectedSupplier}
                        isModalOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        onEditSupplier={handleEditSupplier}
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
                                        onClick={deleteSupplier}
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
