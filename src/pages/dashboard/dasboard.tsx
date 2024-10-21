import DashboardLayout from '../../layouts/dasboard-layout';
import StatisticSections from './statistic-sections/statistic-serctions';
import MonthlyIncomeSections from './monthly-income-sections/monthly-income-sections';
import AllCashflowSections from './piechart-section/piechart-section';
import BarChartMultipleSection from './monthly-cashflow-section/monthly-cashflow';
import { ChartConfig } from '../../components/ui/chart';

const chartDatas3 = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

const chartConfigs3 = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
  label: {
    color: 'hsl(var(--background))',
  },
} satisfies ChartConfig;

export interface DashboardProps {}

export default function Dashboard({}: DashboardProps) {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <StatisticSections />
        <MonthlyIncomeSections />
      </div>
      <div
        className="flex
       justify-between space-x-3"
      >
        <AllCashflowSections />
        <BarChartMultipleSection />
      </div>
    </DashboardLayout>
  );
}
