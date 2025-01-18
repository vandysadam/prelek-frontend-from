import { FC, useState } from 'react';
import { RoleType, User } from '../../../../modules/users/dtos/models/entity';

import { CircleDollarSign, Pencil, QrCode, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../components/ui/tooltip';
import QRCodeModal from '../user-qrcode';

interface UserAvatarCellProps {
  user: User;
  current_role: RoleType | undefined;
}
  

 

const UserTableAction: FC<UserAvatarCellProps> = ({
  user,
  current_role,
}: UserAvatarCellProps) => {
  
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const handleOpenQRModal = () => {
    setIsQRModalOpen(true);
  };

  const handleCloseQRModal = () => {
    setIsQRModalOpen(false);
  };
  
  return (
    <div className="flex space-x-2">
      {current_role === 'ADMIN' && (
        <>

        
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="text-blue-500 hover:underline"
                  to={`/users/edit/${user.user_id}`}
                >
                  <Pencil size="17" className="inline mr-1" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit User</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>



          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="text-red-500 hover:underline"
                  // onClick={() => handleDelete(props.row.original.user_id)}
                >
                  <Trash2 size="17" className="inline mr-1" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete User</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>



          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="text-black-500 hover:underline"
                  onClick={handleOpenQRModal}>
                  <QrCode size="17" className="inline mr-1" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Qr Code User</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      )}



      {current_role === 'FINANCE' && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                className="text-blue-500 hover:underline"
                to={`/users/topup/${user.user_id}`}
              >
                <CircleDollarSign size="17" className="inline mr-1" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Top Up Wallet User</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        )}



        <QRCodeModal
        walletId={user.wallet?.id || ''}
        isOpen={isQRModalOpen}
        onClose={handleCloseQRModal} 
        username={user.name}
        houseNumber={String(user.house_number) || ''}/>
    </div>
  );
};

export default UserTableAction;
