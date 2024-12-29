import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/img/1.png';

export default function Navbar() {
    const [user, setUser] = useState(null); // Awalnya null
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    // Muat data user dari localStorage saat komponen pertama kali dirender
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                console.error("Failed to parse user data:", e);
                localStorage.removeItem("user"); // Hapus data yang rusak
            }
        }
    }, []);
    

    // Fungsi untuk membuka/menutup dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Fungsi logout
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user"); // Hapus data user dari localStorage
        setUser(null); // Hapus state user
        setIsDropdownOpen(false); // Tutup dropdown
        alert("You have successfully logged out.");
        navigate("/login/LoginPage");
    };

    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <a href="#" className="flex items-center ml-2">
                            <img
                                src={logo}
                                className="h-14 mr-12"
                                alt="Flowbite Logo"
                            />
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                                WMS COSMETIC
                            </span>
                        </a>
                    </div>
                    <div className="flex items-center">
                        {/* Profile Section */}
                        <div className="relative">
                            {user ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={toggleDropdown}
                                        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                    >
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                            alt="User"
                                        />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {isDropdownOpen && (
                                        <div
                                            className="absolute right-0 top-full mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600 z-50"
                                            id="user-dropdown"
                                        >
                                            <div className="px-4 py-3">
                                                <span className="block text-sm text-gray-900 dark:text-white">
                                                    {user.name}
                                                </span>
                                                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                                                    {user.email}
                                                </span>
                                            </div>
                                            <ul className="py-2">
                                                <li>
                                                    <button
                                                        onClick={handleLogout}
                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                    >
                                                        Logout
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <button
  onClick={() => window.location.href = '/login/LoginPage'} // Navigasi dengan window.location
  className="h-[27px] px-5 py-2.5 bg-[#1e429f] text-white text-sm font-bold font-['Poppins'] rounded-lg flex justify-center items-center gap-2 overflow-hidden hover:bg-[#173878] focus:ring-2 focus:ring-[#1e429f] focus:ring-opacity-50"
  style={{ backgroundColor: "#1e429f" }}
>
  Logout
</button>

                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
