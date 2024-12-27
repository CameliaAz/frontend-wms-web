import React, { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const EditUserModal = ({ isOpen, onClose, user, onEditUser }) => {
    const [form, setForm] = useState({ id: "", name: "", email: "", password: "", role: "" });
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (user && isOpen) {
            setForm(user); // Pastikan form diupdate saat modal dibuka
        }
    }, [user, isOpen]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onEditUser(form); // Memanggil fungsi untuk mengedit user
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-[500px] p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-[#021639] mb-4 text-center">Edit User</h2>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label className="text-[#021639] text-sm font-bold">Masukkan Email</label>
                        <input
                            type="email"
                            placeholder="admin@gmail.com"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full h-[40px] px-3 py-2 bg-gray-50 rounded border border-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[#021639] text-sm font-bold">Masukkan Nama</label>
                        <input
                            type="text"
                            placeholder="Admin 1"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full h-[40px] px-3 py-2 bg-gray-50 rounded border border-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[#021639] text-sm font-bold">Masukkan Role</label>
                        <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            className="w-full h-[40px] px-3 py-2 bg-gray-50 rounded border border-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[#021639] text-sm font-bold">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Kosongkan jika tidak ingin mengubah"
                                value={showPassword ? form.password : ""}
                                name="password"
                                onChange={handleChange}
                                className="w-full h-[40px] px-3 py-2 bg-gray-50 rounded border border-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition text-sm"
                    >
                        Batalkan
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 text-white rounded-lg bg-blue-700 hover:bg-blue-800 transition text-sm"
                    >
                        Simpan Perubahan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditUserModal;
