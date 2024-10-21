import React from 'react';
import { Card } from '../../../../components/ui/card';

interface StatCardProps {
  title: string;
  amount: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, amount }) => {
  return (
    <Card className="flex flex-col items-stretch border p-0 sm:flex-row w-full ">
      <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
        <span className="text-xs text-muted-foreground self-start">
          {title}
        </span>
        <span className="text-lg font-bold leading-none sm:text-3xl place-self-end">
          {amount}
        </span>
      </div>
    </Card>
  );
};

export default StatCard;
