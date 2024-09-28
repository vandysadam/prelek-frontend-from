import { ChevronRight, LayoutDashboard, User } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';
import { Nav } from './ui/nav';
import { NavLink } from 'react-router-dom';
import logoUrl from '/src/images/prelek-logo.png';

export interface SidebarProps {}

export default function Sidebar({}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  function toggleCollapsed() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="relative ">
      <NavLink to="/" className="block">
        <img className="absolute w-full md:mb-8" src={logoUrl} alt="Logo" />
      </NavLink>
      <div className="relative min-w-[90px] border-r px-3 pb-10 pt-24">
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
            },
            {
              title: 'Users',
              label: '9',
              icon: User,
              href: '/users/list',
            },
            {
              title: 'Activity',
              icon: User,
              href: '/activities/list',
            },
          ]}
        />
      </div>
    </div>
  );
}
