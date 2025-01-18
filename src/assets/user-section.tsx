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
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authSlice } from '../../modules/auth/auth.slice';
import { useTypedSelector } from '../../store';

export default function UserSection() {
  let currentUser = useTypedSelector((state) => state.authSlice.user);

  if (!currentUser) {
    currentUser = {
      id: 'test123',
      name: 'John Doe',
      email: 'johndoe@me.com',
      roles: 'ADMIN',
      house_number: 0,
    };
  }

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    currentUser?.name ?? 'John Doe',
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
              alt={`${currentUser.name}'s avatar`}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">{currentUser.name}</p>
              <p className="text-sm text-gray-500">{currentUser.roles}</p>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {currentUser.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {currentUser.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* <DropdownMenuGroup>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>New Team</DropdownMenuItem>
          </DropdownMenuGroup> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
