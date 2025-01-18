import DashboardLayout from '../../layouts/dasboard-layout';
import StatisticSections from './statistic-sections/statistic-serctions';
import MonthlyIncomeSections from './monthly-income-sections/monthly-income-sections';
import AllCashflowSections from './piechart-section/piechart-section';


export interface DashboardProps {}

export default function Dashboard({}: DashboardProps) {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <StatisticSections />
        <MonthlyIncomeSections />
        <AllCashflowSections />
      </div>
      {/* <div
        className="flex
       justify-between space-x-3"
      >
        
        <BarChartMultipleSection />
      </div> */}
    </DashboardLayout>
  );
}
