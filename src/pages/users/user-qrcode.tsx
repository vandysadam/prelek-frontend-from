import { FC, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from './ui/dialog';
// import { Button } from './ui/button';
// import { Dialog, DialogClose, DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import { DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Dialog } from '@radix-ui/react-dialog';

interface QRCodeModalProps {
  walletId: string;
  username: string;
  houseNumber: string; 
  isOpen: boolean;
  onClose: () => void;
}

const QRCodeModal: FC<QRCodeModalProps> = ({ walletId, username, isOpen, houseNumber, onClose }) => {
  const qrRef = useRef<HTMLCanvasElement>(null);

  
  const handleDownload = () => {
    if (qrRef.current) {
      const canvas = qrRef.current;
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = `${username}-qrcode.png`;
      link.click();
    }
  };

  const qrData = JSON.stringify({
    name: username,
    house_number: houseNumber,
    wallet_id: walletId,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>QR Code for Wallet ID: {username}</DialogTitle>
          <DialogClose onClick={onClose} />
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
        <p className="text-lg font-semibold">{username}</p> 
          <QRCodeCanvas
            ref={qrRef}
            value={qrData}
            size={150}
            level="H"
            marginSize={4}
          />
          <Button onClick={handleDownload}>Download QR Code</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeModal;
