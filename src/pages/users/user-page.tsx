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

export default function UserPage() {
  const [userList, setUserList] = useState<User[]>([]);
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Default page size

  // Fetch data with dynamic pageSize and currentPage
  const { data, isLoading, refetch } = useGetAllUserPaginatedQuery(
    { page: currentPage, limit: pageSize }, // Pass page and limit
    { skip: false, refetchOnMountOrArgChange: true },
  );

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

  // Refetch data when page or page size changes
  useEffect(() => {
    refetch();
  }, [currentPage, pageSize, refetch]);

  // Column definitions for the table
  const columns: ColumnDef<User>[] = [
    { accessorKey: 'user_id', header: 'User Id' },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'roles', header: 'Roles' },
  ];

  return (
    <DashboardLayout>
      <div className="py-12">
        <Card>
          <CardHeader>
            <CardTitle>Users List</CardTitle>
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
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
