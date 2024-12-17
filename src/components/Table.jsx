import React, {useState} from "react";

const Table = ({ columns, data, renderActions, filterKey, onFilter }) => {
  const [filterValue, setFilterValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterValue(value);
    onFilter(value);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {/* Filter Input */}
      {filterKey && (
        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder={`Type to filter ${filterKey}`}
            value={filterValue}
            onChange={handleFilterChange}
            className="px-4 py-2 w-1/3 max-w-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      {/* Table */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead
          className="text-xs text-white uppercase dark:bg-gray-700 dark:text-gray-400 rounded-tr-lg rounded-tl-lg"
          style={{ backgroundColor: "#1e429f" }}
        >
          <tr>
            {columns.map((col) => (
              <th key={col.key} scope="col" className="px-6 py-3">
                {col.title}
              </th>
            ))}
            {renderActions && <th scope="col" className="px-6 py-3">Action</th>}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (renderActions ? 1 : 0)} className="text-center py-4">
                No data available
              </td>
            </tr>
          ) : (
            paginatedData.map((row) => (
              <tr
                key={row.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4">
                    {row[col.dataIndex] || "-"}
                  </td>
                ))}
                {renderActions && (
                  <td className="px-6 py-4">
                    {renderActions(row)}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="Page navigation example" className="flex justify-center mt-4">
          <ul className="flex items-center -space-x-px h-10 text-base">
            <li>
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  currentPage === 1 && "cursor-not-allowed opacity-50"
                }`}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => setCurrentPage(index + 1)}
                  className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                    currentPage === index + 1
                      ? "z-10 text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                      : "text-gray-500 bg-white"
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  currentPage === totalPages && "cursor-not-allowed opacity-50"
                }`}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Table;
