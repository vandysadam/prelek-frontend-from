import { ChevronRight, LayoutDashboard, User } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';
import { Nav } from './ui/nav';

export interface SidebarProps {}

export default function Sidebar({}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  function toggleCollapsed() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="relative min-w-[80px] border-r px-3 pb-10 pt-24">
      <div className="absolute right-[-20px] top-7">
        <Button
          variant="secondary"
          className="rounded-full p-2"
          onClick={toggleCollapsed}
        >
          <ChevronRight
            className={`transform transition-transform duration-300 ${
              isCollapsed ? 'rotate-0' : 'rotate-180'
            }`}
          />
        </Button>
      </div>
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: 'Dashboard',
            label: '128',
            icon: LayoutDashboard,
            href: '/',
            variant: 'default',
          },
          {
            title: 'Users',
            label: '9',
            icon: User,
            href: '/users/list',
            variant: 'ghost',
          },
        ]}
      />
    </div>
  );
}
