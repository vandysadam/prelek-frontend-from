import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { EyeIcon } from "lucide-react";
import { FC } from "react";
import { Link } from "react-router-dom";

interface ActivityTableActionProps {
    activity: {
      activity_id: string;
    };
  }
const ActivityTableAction: FC<ActivityTableActionProps> = ({ activity }) => {
    
    return (
      <div className="flex space-x-2">
        
  
        <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className="text-blue-500 hover:underline"
                    to={`/activities/details/${activity.activity_id}`}
                  >
                    <EyeIcon size="17" className="inline mr-1" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Detail</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
  
  
  
  
      </div>
    );
  };
  
  export default ActivityTableAction;