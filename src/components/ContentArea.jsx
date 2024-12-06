import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "Mon", uv: 400 },
    { name: "Tue", uv: 300 },
    { name: "Wed", uv: 200 },
    { name: "Thu", uv: 278 },
    { name: "Fri", uv: 189 },
    { name: "Sat", uv: 239 },
    { name: "Sun", uv: 349 },
];

export default function a() {
    return (
            <div className="flex min-h-screen">

                {/* Main Content */}
                <div className="flex-1 p-6 bg-gray-50">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Users Summary */}
                        <div className="col-span-1 lg:col-span-2 p-6 bg-white rounded-lg shadow-lg">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-800">32.4k</h2>
                                    <p className="text-gray-500">Users this week</p>
                                </div>
                                <div className="text-green-500 font-semibold text-lg">+12%</div>
                            </div>
                            {/* Line Chart */}
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={data}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="uv" stroke="#1a56db" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Performance Overview */}
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Overall Performance</h3>
                            <p className="text-gray-500">Everything is on track for the month!</p>
                        </div>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                        {/* Card: Total Sales */}
                        <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center">
                            <h4 className="text-lg font-semibold text-gray-700">Total Sales</h4>
                            <p className="text-2xl font-bold text-gray-800">$5,000</p>
                        </div>
                        {/* Card: Active Users */}
                        <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center">
                            <h4 className="text-lg font-semibold text-gray-700">Active Users</h4>
                            <p className="text-2xl font-bold text-gray-800">120</p>
                        </div>
                        {/* Card: New Orders */}
                        <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center">
                            <h4 className="text-lg font-semibold text-gray-700">New Orders</h4>
                            <p className="text-2xl font-bold text-gray-800">18</p>
                        </div>
                        {/* Card: Feedback */}
                        <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center">
                            <h4 className="text-lg font-semibold text-gray-700">Feedback</h4>
                            <p className="text-2xl font-bold text-gray-800">30</p>
                        </div>
                    </div>
                </div>
            </div>
    )
}