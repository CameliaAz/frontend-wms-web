import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoAdd } from "react-icons/io5";
import AddUserModal from "../../../components/AddUserModal";
import EditUserModal from "../../../components/EditUserModal";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Nav";
import TableComponent from "../../../components/Table";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleAddUser = async (newUser) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/users", newUser);
            setUsers([...users, response.data.user]);
            setIsAddModalOpen(false);
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    const handleEditUser = async (updatedUser) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/users/${updatedUser.id}`, updatedUser);
            const updatedData = response.data.user;

            // Update state `users`
            setUsers((prevUsers) =>
                prevUsers.map((user) => (user.id === updatedData.id ? updatedData : user))
            );

            // Tutup modal
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };


    const handleEdit = (id) => {
        const user = users.find((user) => user.id === id);
        if (user) {
            setSelectedUser(user);
            setIsEditModalOpen(true); // Buka modal
        }
    };


    const handleDeleteUser = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/users/${id}`);
                setUsers(users.filter((user) => user.id !== id));
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

    const columns = [
        {
            title: "ID",
            key: "id",
            dataIndex: "id",
        },
        {
            title: "Name",
            key: "name",
            dataIndex: "name",
        },
        {
            title: "Email",
            key: "email",
            dataIndex: "email",
        },
        {
            title: "Role",
            key: "role",
            dataIndex: "role",
        },
    ];

    const renderActions = (row) => (
        <div className="flex gap-2">
            <button
                onClick={() => handleEditUser(row.id)}
                className="h-[22px] px-2.5 py-[5px] font-medium text-white bg-green-800 rounded border-2 border-green-400 hover:underline"
            >
                Edit
            </button>
            <button
                onClick={() => handleDeleteUser(row.id)}
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
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Data User</h1>
                    </div>
                      <div
                                            className="h-[47px] px-5 py-2.5 rounded-lg justify-center items-center gap-2 inline-flex mb-6"
                                            style={{ backgroundColor: "#1e429f" }}
                                        >
                                            <IoAdd className="w-5 h-5 text-white" />
                                            <button
                                                onClick={() => setIsAddModalOpen(true)}
                                                className="text-white text-sm font-semibold font-['Poppins'] leading-[21px] cursor-pointer hover:underline"
                                            >
                                                Tambahkan User
                                            </button>
                                        </div>
                    

                    <TableComponent columns={columns} data={users} renderActions={renderActions} />

                    <AddUserModal
                        isOpen={isAddModalOpen}
                        onClose={() => setIsAddModalOpen(false)}
                        onAddUser={handleAddUser}
                    />

                    <EditUserModal
                        isOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        user={selectedUser}
                        onEditUser={handleEditUser}
                    />

                </div>
            </div>
        </>
    );
}
