import { ColumnDef } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllUserPaginatedQuery } from '../../../modules/users/api/user.api';
import { User } from '../../../modules/users/dtos/models/entity';
import { useTypedSelector } from '../../../store';
import DataTable from '../../components/data-tables/datatable';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../components/ui/tooltip';
import DashboardLayout from '../../layouts/dasboard-layout';
import { formatRupiah } from '../../utils/format.rupiah';
import UserAvatarCell from './components/user.avatar.cell';
import UserTableAction from './components/user.table.action';

export default function UserPage() {
  const currentUser = useTypedSelector((state) => state.authSlice.user);
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
    navigate('/users/add');
  };
  
  const fetchData = useCallback(() => {
    if (data?.data) {
      setUserList(data.data);
      setTotalData(data.total || 0); 
    }
  }, [data]);

  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  
  useEffect(() => {
    refetch();
  }, [currentPage, pageSize, searchParams, sortBy, sortDirection, refetch]);

  
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
      cell: (props) => formatRupiah(props.row.original?.wallet?.balance ?? 0), // Rupiah formatting
    },
    {
      accessorKey: 'actions', // Kolom untuk tindakan (Edit & Delete)
      header: 'Actions',
      cell: (props) => (
        <UserTableAction
          user={props.row.original}
          current_role={currentUser?.roles}
        />
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="py-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between">
              Users List
              {currentUser?.roles === 'ADMIN' && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Plus
                        onClick={handleClick}
                        className="cursor-pointer hover:text-blue-500 transition-colors duration-300"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add User</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
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
