import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

const TableComponent = () => {
  return (
    <div className="overflow-x-auto relative">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 bg-gray-100 grid grid-cols-5 border border-gray-300 pointer-events-none">
        {/* Garis bantu untuk mengecek keselarasan */}
        <div className="border-r border-gray-300"></div>
        <div className="border-r border-gray-300"></div>
        <div className="border-r border-gray-300"></div>
        <div className="border-r border-gray-300"></div>
      </div>

      {/* Tabel */}
      <Table className="relative z-10">
        {/* Table Header */}
        <TableHead>
          <TableRow>
            <TableHeadCell>Product Name</TableHeadCell>
            <TableHeadCell>Color</TableHeadCell>
            <TableHeadCell>Category</TableHeadCell>
            <TableHeadCell>Price</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Edit</span>
            </TableHeadCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          <TableRow>
            <TableCell>Apple MacBook Pro 17"</TableCell>
            <TableCell>Silver</TableCell>
            <TableCell>Laptop</TableCell>
            <TableCell>$2999</TableCell>
            <TableCell>
              <a href="#" className="font-medium text-blue-600 hover:underline">
                Edit
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Microsoft Surface Pro</TableCell>
            <TableCell>White</TableCell>
            <TableCell>Tablet</TableCell>
            <TableCell>$1999</TableCell>
            <TableCell>
              <a href="#" className="font-medium text-blue-600 hover:underline">
                Edit
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Magic Mouse 2</TableCell>
            <TableCell>Black</TableCell>
            <TableCell>Accessories</TableCell>
            <TableCell>$99</TableCell>
            <TableCell>
              <a href="#" className="font-medium text-blue-600 hover:underline">
                Edit
              </a>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default TableComponent;
