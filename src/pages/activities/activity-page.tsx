import { ColumnDef } from '@tanstack/react-table';
import { useState, useCallback, useEffect } from 'react';
import { useGetAllUserPaginatedQuery } from '../../../modules/users/api/user.api';
import { User } from '../../../modules/users/dtos/models/entity';
import DataTable from '../../components/data-tables/datatable';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../components/ui/card';
import DashboardLayout from '../../layouts/dasboard-layout';
import { formatRupiah } from '../../utils/format.rupiah';

import { Pencil, Plus, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import UserAvatarCell from '../users/components/user.avatar.cell';

export default function ActivityPage() {
  const [userList, setUserList] = useState<User[]>([]);
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Default page size
  const [searchParams, setSearchParams] = useState(''); // New state for search params
  const [sortBy, setSortBy] = useState<string | null>(null); // Initially null, so no sort is applied
  const [sortDirection, setSortDirection] = useState<string | null>(null); // Initially null, so no sort is applied

  // Build query object conditionally based on whether sortBy and sortDirection are set
  const queryObject = {
    page: currentPage,
    limit: pageSize,
    search_params: searchParams,
    ...(sortBy &&
      sortDirection && { sort_by: sortBy, sort_direction: sortDirection }), // Only include sorting if both values exist
  };

  // Fetch data with dynamic pageSize and currentPage
  const { data, isLoading, refetch } = useGetAllUserPaginatedQuery(
    queryObject,
    {
      skip: false,
      refetchOnMountOrArgChange: true,
    },
  );

  const navigate = useNavigate();
  const handleClick = () => {
    // Navigasi ke /users/add
    navigate('/activities/add');
  };
  // Fetch data and update states when API response changes
  const fetchData = useCallback(() => {
    if (data?.data) {
      setUserList(data.data);
      setTotalData(data.total || 0); // Set total number of entries
    }
  }, [data]);

  // Effect to update when data changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Refetch data when page, page size, or sorting changes
  useEffect(() => {
    refetch();
  }, [currentPage, pageSize, searchParams, sortBy, sortDirection, refetch]);

  // Column definitions for the table
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'name',
      header: 'User',
      cell: (props) => (
        <UserAvatarCell
          id={props.row.original.user_id}
          name={props.row.original.name}
        />
      ),
    },
    { accessorKey: 'house_number', header: 'No Rumah' },
    {
      accessorKey: 'wallet.balance',
      header: 'Balance',
      cell: (props) => formatRupiah(props.row.original?.wallet?.balance ?? 0), // Apply Rupiah formatting
    },
    {
      accessorKey: 'actions', // Kolom untuk tindakan (Edit & Delete)
      header: 'Actions',
      cell: (props) => (
        <div className="flex space-x-2">
          <Link
            className="text-blue-500 hover:underline"
            to={`/users/edit/${props.row.original.user_id}`}
          >
            <Pencil size="17" className="inline mr-1" />
          </Link>
          <button
            className="text-red-500 hover:underline"
            // onClick={() => handleDelete(props.row.original.user_id)}
          >
            <Trash2 size="17" className="inline mr-1" />
          </button>
        </div>
      ),
    },
  ];
  // const handleEdit = (userId: string) => {
  //   navigate(`/users/edit/${row.original.userId}`);
  //   console.log(userId); // Navigasi ke halaman edit
  // };

  return (
    <DashboardLayout>
      <div className="py-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between">
              Activities
              <Plus
                onClick={handleClick}
                className="cursor-pointer hover:text-blue-500 transition-colors duration-300"
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={userList} // Pass fetched user data
              isLoading={isLoading} // Show loading state
              currentPage={currentPage}
              pageCount={Math.ceil(totalData / pageSize)} // Calculate page count from totalData and pageSize
              pageSize={pageSize}
              totalData={totalData} // Pass total number of entries
              onPageSizeChange={setPageSize} // Handler for changing page size
              onPaginate={setCurrentPage} // Handler for changing current page
              onSearchChange={setSearchParams} // Handler for changing search query
              onSortChange={(sortBy, sortDirection) => {
                setSortBy(sortBy);
                setSortDirection(sortDirection);
              }} // Sorting is only applied when header is clicked
              options={{
                enableGlobalFilter: true,
              }}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
