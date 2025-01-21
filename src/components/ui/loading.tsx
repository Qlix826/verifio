import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface LoadingProps {
  className?: string;
  size?: number;
  text?: string;
  fullScreen?: boolean;
}

export function Loading({ className, size = 24, text, fullScreen }: LoadingProps) {
  const { t } = useTranslation();
  const defaultText = t('common.loading');

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-sm text-muted-foreground">
            {text || defaultText}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Loader2 
        className="animate-spin" 
        size={size}
      />
      {text && (
        <span className="text-sm text-muted-foreground">
          {text || defaultText}
        </span>
      )}
    </div>
  );
} 