import {
  useGetAllUserdashboardQuery,
  useGetIncomeExpansesTotalBalanceQuery,
} from '../../../../modules/users/api/user.api';
import StatCard from './component/statistic.card';

const formatRupiah = (string: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(string);
};

export default function StatisticSections() {
  const { data: userData } = useGetAllUserdashboardQuery(null);
  const totalUser = userData?.data?.total;

  const { data: incomeExpansesData } =
    useGetIncomeExpansesTotalBalanceQuery(null);
  const totalIncome = incomeExpansesData?.data[0]?.pemasukan;
  const totalExpanses = incomeExpansesData?.data[0]?.pengeluaran;
  const totalBalance = incomeExpansesData?.data[0]?.total_saldo;

  return (
    <section className="flex justify-between space-x-3 ">
      <StatCard title="Total User" amount={totalUser}></StatCard>
      <StatCard title="Pemasukan" amount={formatRupiah(totalIncome)}></StatCard>
      <StatCard
        title="Pengeluaran"
        amount={formatRupiah(totalExpanses)}
      ></StatCard>
      <StatCard
        title="Total Saldo"
        amount={formatRupiah(totalBalance)}
      ></StatCard>
    </section>
  );
}
