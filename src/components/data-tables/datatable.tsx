import React, { useEffect, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
} from '@tanstack/react-table';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'; // Adjust based on your file paths
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { useDebounce } from 'use-debounce';
import { Skeleton } from '../ui/skeleton';

enum PaginationAction {
  Previous,
  Next,
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[]; // Use the generic type for columns
  data: T[]; // Data is of generic type T
  totalData: number;
  isLoading: boolean; // Add loading state
  currentPage?: number;
  pageCount?: number;
  onPaginate?: (page: number) => void; // Handle page changes
  onPageSizeChange?: (size: number) => void; // Handle page size changes
  options?: {
    enableGlobalFilter?: boolean;
  };
  rowsPerPageOptions?: number[]; // Options for rows per page
  pageSize?: number; // Initial page size
}

const DataTable = <T extends object>({
  columns,
  data,
  isLoading, // Loading state
  totalData,
  currentPage = 1,
  pageCount = 1,
  onPaginate,
  onPageSizeChange,
  options = {},
  rowsPerPageOptions = [5, 10, 25, 50], // Default rows per page options
  pageSize: initialPageSize = 5, // Default page size of 5
}: DataTableProps<T>) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [debouncedFilter] = useDebounce(globalFilter, 500);
  const [pageSize, setPageSize] = useState(initialPageSize); // Initialize with the passed `pageSize` prop

  // Update the `pageSize` whenever `initialPageSize` changes
  useEffect(() => {
    setPageSize(initialPageSize);
  }, [initialPageSize]);

  const table = useReactTable<T>({
    data,
    columns,
    pageCount,
    state: {
      sorting,
      columnFilters,
      globalFilter: debouncedFilter,
    },
    manualSorting: true,
    manualFiltering: true,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
  });

  const handleGoToPage = (action: PaginationAction) => {
    const newPage =
      action === PaginationAction.Previous ? currentPage - 1 : currentPage + 1;
    if (onPaginate) onPaginate(newPage);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = Number(e.target.value);
    setPageSize(newPageSize);
    if (onPageSizeChange) {
      onPageSizeChange(newPageSize); // Trigger the callback
    }
  };

  return (
    <div>
      {/* Column Dropdown Menu */}
      <div className="flex items-center py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={() => column.toggleVisibility()}
                  className="capitalize"
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Global Filter */}
      {options.enableGlobalFilter && (
        <div className="py-2">
          <Input
            placeholder="Search..."
            type="text"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
      )}

      {/* Data Table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={`
                      ${
                        header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : ''
                      }
                      ${
                        header.column.getIsSorted()
                          ? 'font-bold text-primary'
                          : ''
                      }
                    `}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center">
                      {header.isPlaceholder
                        ? null
                        : typeof header.column.columnDef.header === 'function'
                        ? header.column.columnDef.header(header.getContext())
                        : header.column.columnDef.header}
                      {header.column.getCanSort() && (
                        <span>
                          {header.column.getIsSorted() === 'asc' ? (
                            <ArrowUp />
                          ) : header.column.getIsSorted() === 'desc' ? (
                            <ArrowDown />
                          ) : (
                            <ArrowUpDown />
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {/* Loading Skeleton */}
            {isLoading ? (
              Array(10)
                .fill(null)
                .map((_, idx) => (
                  <TableRow key={`skeleton-${idx}`}>
                    {columns.map((col, colIdx) => (
                      <TableCell key={`skeleton-cell-${colIdx}`}>
                        <Skeleton className="h-6 w-full" />{' '}
                        {/* Loading skeleton */}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
            ) : data.length > 0 ? (
              table
                .getRowModel()
                .rows.slice(0, pageSize)
                .map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={`${row.id}-${cell.id}`}>
                        {typeof cell.column.columnDef.cell === 'function'
                          ? cell.column.columnDef.cell(cell.getContext())
                          : cell.getValue()}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Data not found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination & Rows Per Page Control */}
      <div className="flex items-center justify-between space-x-2 py-4 px-1">
        {/* Rows Per Page Dropdown */}
        <div className="flex items-center space-x-2">
          <span>Show</span>
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="border rounded-md p-2"
          >
            {rowsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span>entries from {totalData} data</span>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center space-x-2">
          <div className="flex-1 pl-1 text-sm text-muted-foreground">
            Showing {currentPage} of {pageCount} pages
          </div>
          <Button
            size="sm"
            variant="outline"
            disabled={currentPage <= 1}
            onClick={() => handleGoToPage(PaginationAction.Previous)}
          >
            Previous
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={currentPage >= pageCount}
            onClick={() => handleGoToPage(PaginationAction.Next)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
