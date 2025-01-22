import { AlertCircle, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { Button } from './button';

interface ErrorProps {
  className?: string;
  title?: string;
  message?: string;
  retry?: () => void;
  fullScreen?: boolean;
}

export function Error({ className, title, message, retry, fullScreen }: ErrorProps) {
  const { t } = useTranslation();
  const defaultMessage = t('common.error');

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4 p-6 text-center">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <h2 className="text-lg font-semibold">
            {title || t('common.error')}
          </h2>
          <p className="text-sm text-muted-foreground max-w-md">
            {message || defaultMessage}
          </p>
          {retry && (
            <Button
              variant="outline"
              onClick={retry}
              className="flex items-center gap-2"
            >
              <RefreshCcw className="h-4 w-4" />
              {t('common.retry')}
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('rounded-lg border border-destructive/50 p-4', className)}>
      <div className="flex gap-3">
        <AlertCircle className="h-5 w-5 text-destructive" />
        <div className="flex-1">
          {title && (
            <h3 className="font-medium mb-1">
              {title}
            </h3>
          )}
          <p className="text-sm text-muted-foreground">
            {message || defaultMessage}
          </p>
          {retry && (
            <Button
              variant="ghost"
              size="sm"
              onClick={retry}
              className="mt-2 flex items-center gap-2"
            >
              <RefreshCcw className="h-4 w-4" />
              {t('common.retry')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
} 