import Sidebar from '../components/sidebar';

export interface DashboardProps {}

export default function Dashboard({}: DashboardProps) {
  return (
    <>
      <Sidebar />
      <h1>Dashboard</h1>
    </>
  );
}
