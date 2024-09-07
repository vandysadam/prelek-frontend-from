import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { useLocation } from 'react-router-dom'; // Import useLocation
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TooltipProvider } from '@radix-ui/react-tooltip';

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    href?: string;
  }[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  const location = useLocation(); // Get the current route

  return (
    <TooltipProvider>
      <div
        data-collapsed={isCollapsed}
        className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
      >
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map((link, index) => {
            // Determine if this link is the active route
            const isActive = location.pathname === link.href;

            return isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <a
                    href={link.href || '#'}
                    className={cn(
                      buttonVariants({
                        variant: isActive ? 'default' : 'ghost', // Use active state
                        size: 'icon',
                      }),
                      'h-9 w-9',
                      isActive &&
                        'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    <span className="sr-only">{link.title}</span>
                  </a>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.title}
                  {link.label && (
                    <span className="ml-auto text-muted-foreground">
                      {link.label}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            ) : (
              <a
                key={index}
                href={link.href || '#'}
                className={cn(
                  buttonVariants({
                    variant: isActive ? 'default' : 'ghost', // Use active state
                    size: 'sm',
                  }),
                  isActive &&
                    'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                  'justify-start',
                )}
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.title}
                {link.label && (
                  <span
                    className={cn(
                      'ml-auto',
                      isActive && 'text-background dark:text-white',
                    )}
                  >
                    {link.label}
                  </span>
                )}
              </a>
            );
          })}
        </nav>
      </div>
    </TooltipProvider>
  );
}
