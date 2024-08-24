// pages/Dashboard.tsx

import DashboardLayout from '../layouts/dasboard-layout';

export interface DashboardProps {}

export default function Dashboard({}: DashboardProps) {
  return (
    <DashboardLayout>
      {/* Add some Lorem Ipsum placeholder content */}
      <div className="p-4 bg-gray-100 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Dashboard Content</h2>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          venenatis eros vel metus volutpat, in luctus dolor blandit. Nulla
          facilisi. Sed sit amet risus at risus malesuada consequat. Etiam ac
          hendrerit metus, a vestibulum ligula. Suspendisse potenti. Ut varius
          mi vel augue finibus, nec fermentum libero pretium. Donec auctor dui
          id turpis condimentum, et ullamcorper lectus fermentum.
        </p>
        <p className="mt-4 text-gray-700">
          Integer nec urna non ipsum fermentum aliquet. Mauris non mi quis justo
          pretium congue. Phasellus a justo nec lorem tincidunt dignissim. Ut
          tincidunt vehicula metus, et lacinia ex tincidunt non. Aenean euismod,
          justo sit amet vehicula viverra, mi lacus egestas est, ac aliquam
          libero mi a orci. Curabitur nec leo ac nulla tincidunt pretium. Cras
          non ligula at eros sodales lacinia. Fusce nec dapibus metus.
        </p>
      </div>
    </DashboardLayout>
  );
}
