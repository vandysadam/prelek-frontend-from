import { Inbox, Send, ArchiveX, Trash2, Archive, File } from 'lucide-react';
import { Nav } from './ui/nav';

export interface SidebarProps {}

export default function Sidebar({}: SidebarProps) {
  return (
    <div>
      <Nav
        isCollapsed={false}
        links={[
          {
            title: 'Inbox',
            label: '128',
            icon: Inbox,
            variant: 'default',
          },
          {
            title: 'Drafts',
            label: '9',
            icon: File,
            variant: 'ghost',
          },
          {
            title: 'Sent',
            label: '',
            icon: Send,
            variant: 'ghost',
          },
          {
            title: 'Junk',
            label: '23',
            icon: ArchiveX,
            variant: 'ghost',
          },
          {
            title: 'Trash',
            label: '',
            icon: Trash2,
            variant: 'ghost',
          },
          {
            title: 'Archive',
            label: '',
            icon: Archive,
            variant: 'ghost',
          },
        ]}
      />
    </div>
  );
}
