// components/Header.tsx

import UserSection from '../assets/user-section';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-300">
      <div className="flex items-center">
        {/* Add other elements here, e.g., search bar, notifications, etc. */}
      </div>
      {/* Additional header content like a search bar or user profile icon */}
      <UserSection />
    </header>
  );
}
