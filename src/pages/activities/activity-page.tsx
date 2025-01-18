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

export default function ActivityPage() {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/activities/add');
  };
  

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
