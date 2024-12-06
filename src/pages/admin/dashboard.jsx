import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Nav";
import Charts from "../../components/Charts";
import Card from "../../components/Card";

export default function AdminDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-64">
                    <Sidebar />
                </div>

            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
                {/* Navbar */}
                <header className="sticky top-0 shadow z-10">
                    <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                </header>

                {/* Content Area */}
                <main className="flex-1 pt-16 p-8">
                    <div className="bg-white p-6 rounded shadow">
                        <div className="mb-4">
                            <Charts />
                        </div>
                        <div className="flex gap-x-4">
                            <Card title="Barang Masuk" description="50" href="#" />
                            <Card title="Barang Keluar" description="20" href="#" />
                        </div>
                    </div>
                </main>

            </div>
        </div>
    );
}
