import { FC } from 'react';

interface UserAvatarCellProps {
  id: string;
  name: string;
}

// Smaller avatar component for table cells
const UserAvatarCell: FC<UserAvatarCellProps> = ({ name, id }) => {
  // Generate avatar URL using the ui-avatars API
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name,
  )}&background=random&color=fff&size=32`;

  return (
    <div className="flex items-center space-x-2">
      {/* Avatar Image */}
      <img
        src={avatarUrl}
        alt={`${name}'s avatar`}
        className="w-10 h-10 rounded-full border-1 border-black" // Smaller size for table cells
      />
      {/* User name next to the avatar */}
      <div className="flex flex-col">
        <p className="text-base font-medium leading-tight">{name}</p>
        <p className="text-xs text-gray-500">{id}</p>
        {/* Optionally display email */}
      </div>
    </div>
  );
};

export default UserAvatarCell;
