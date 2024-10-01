import { Loader2 } from 'lucide-react';
import DashboardLayout from '../layouts/dasboard-layout';

const DashboardLoaderPage: React.FC = () => {
  return (
    <DashboardLayout>
      <span className="flex flex-row items-center justify-center">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Please wait
      </span>
    </DashboardLayout>
  );
};

export default DashboardLoaderPage;
