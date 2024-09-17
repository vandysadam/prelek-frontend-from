// components/UserSection.tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authSlice } from '../../modules/auth/auth.slice';

interface UserSectionProps {
  name: string;
  role: string;
  email: string;
}

export default function UserSection({
  name = 'John Doe',
  role = 'Admin',
  email = 'a@a.com',
}: UserSectionProps) {
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name ?? 'John Doe',
  )}&background=random&color=fff&size=36`;
  const dispatch = useDispatch();
  const router = useNavigate();

  const handleLogout = () => {
    console.log('logout');

    dispatch(authSlice.actions.logout());

    router('/login');
  };

  return (
    <div className="flex items-center justify-end space-x-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center cursor-pointer space-x-3">
            <img
              src={avatarUrl}
              alt={`${name}'s avatar`}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">{name}</p>
              <p className="text-sm text-gray-500">{role}</p>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>New Team</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
