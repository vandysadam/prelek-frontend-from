import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../components/ui/card';
import DashboardLayout from '../../layouts/dasboard-layout';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import CustomCard from './component/card.component';
import CustomCardPengeluaran from './component/card.components.pengeluaran';
import CustomCardTotal from './component/card.component.total';
import DataTable from '@/components/data-tables/datatable';
import { ColumnDef } from '@tanstack/react-table';
import { ActivityEntity } from 'modules/activity/dtos/models/entity';
import { useCallback, useEffect, useState } from 'react';
import { useGetAllActivityPaginatedQuery } from '../../../modules/activity/api/activity.api';
import ActivityTableAction from './component/activity.table.action';

export default function ActivityPage() {
  const [userList, setActivityList] = useState<ActivityEntity[]>([]);
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Default page size
  const [searchParams, setSearchParams] = useState(''); // New state for search params
  const [sortBy, setSortBy] = useState<string | null>(null); // Initially null, so no sort is applied
  const [sortDirection, setSortDirection] = useState<string | null>(null); // Initially null, so no sort is applied
  const queryObject = {
    page: currentPage,
    limit: pageSize,
    search_params: searchParams,
    ...(sortBy &&
      sortDirection && { sort_by: sortBy, sort_direction: sortDirection }), // Only include sorting if both values exist
  };

  // Fetch data with dynamic pageSize and currentPage
  const { data, isLoading, refetch } = useGetAllActivityPaginatedQuery(
    queryObject,
    {
      skip: false,
      refetchOnMountOrArgChange: true,
    },
  );

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/activities/add');
  };
  
  const fetchData = useCallback(() => {
    if (data?.data) {
      setActivityList(data.data);
      setTotalData(data.total || 0); 
    }
  }, [data]);

  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  
  useEffect(() => {
    refetch();
  }, [currentPage, pageSize, searchParams, sortBy, sortDirection, refetch]);

  
  const columns: ColumnDef<ActivityEntity>[] = [
    {
      accessorKey: 'title',
      header: 'Judul',
      // cell: (props) => (
      //   <UserAvatarCell
      //     id={props.row.original.user_id}
      //     name={props.row.original.name}
      //   />
      // ),
    },
    { 
      accessorKey: 'description', 
      header: 'Deskripsi', 
    },
    {
      accessorKey: 'start_date', 
      header: 'Tanggal',
    },
    {
      accessorKey: 'actions', // Kolom untuk tindakan (Edit & Delete)
      header: 'Actions',
      cell: (props) => (
        <ActivityTableAction activity={props.row.original} />  
      )
      
    }
    
    // {
    //   accessorKey: 'actions', // Kolom untuk tindakan (Edit & Delete)
    //   header: 'Actions',
    //   cell: (props) => (
    //     <UserTableAction
    //       user={props.row.original}
    //       current_role={currentUser?.roles}
    //     />
    //   ),
    // },
  ];

  return (
    <DashboardLayout>
      <div className="py-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between">
              Activities Kas
              
              <Button
                onClick={handleClick}
                className="flex items-center px-6 py-3  text-white rounded shadow-md  transition-colors duration-300"
              >
                add activity 
              </Button>
              
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            kintil
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CustomCard title={'Pemasukan'} content={''}>
              </CustomCard>

              <CustomCardPengeluaran title={'Pengeluaran'} content={''}>
              </CustomCardPengeluaran>

              <CustomCardTotal title={'Ringkasan'} content={''}>
              </CustomCardTotal>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
