import React from "react";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Nav";
import TableComponent from "../../../components/Table";

export default function PenerimaanBarang() {
    return (
        <>
            {/* Navbar */}
            <div className="fixed top-0 left-0 w-full z-10">
                <Navbar />
            </div>

            {/* Content Wrapper */}
            <div className="flex min-h-screen pt-16">
                {/* Sidebar */}
                <div className="w-64 bg-gray-800 text-white">
                    <Sidebar />
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8">
                <h1 className="text-2xl font-bold mb-4">Product Table</h1>
                <TableComponent />
                </div>
            </div>
        </>
    );
}
