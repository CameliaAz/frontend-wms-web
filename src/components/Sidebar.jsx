import React from 'react';
import { Link } from 'react-router-dom';
import { BiArchiveIn, BiArchiveOut, BiArchive } from "react-icons/bi";
import { TbReportAnalytics } from "react-icons/tb";
import { IoPieChartOutline } from "react-icons/io5";
import { FaBoxOpen } from "react-icons/fa";

const Sidebar = ({ role }) => {
    // Daftar menu berdasarkan role
    const menu = role === 'admin'
        ? [
            { name: 'Dashboard', path: '/admin/dashboard', icon: IoPieChartOutline },
            { name: 'Barang Masuk', path: '/admin/transaksi_barang/barang_masuk', icon: BiArchiveIn },
            { name: 'Lokasi Barang', path: '/admin/lokasi_barang', icon: BiArchive },
            { name: 'Pemindahan Barang', path: '/admin/pemindahan_barang', icon: BiArchiveOut },
            { name: 'Barang Keluar', path: '/admin/transaksi_barang/barang_keluar', icon: FaBoxOpen },
            // { name: 'Laporan', path: '/admin/laporan', icon: TbReportAnalytics },
        ]
        : [
            { name: 'Dashboard', path: '/manajer/dashboard', icon: IoPieChartOutline },
            { name: 'Laporan', path: '/manajer/laporan', icon: TbReportAnalytics },
        ];

    return (
        <aside
            id="logo-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
            aria-label="Sidebar"
        >
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    {menu.map((item, index) => (
                        <li key={index}>
                            <Link
                                to={item.path}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <item.icon
                                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                />
                                <span className="flex-1 ms-3 whitespace-nowrap">{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
