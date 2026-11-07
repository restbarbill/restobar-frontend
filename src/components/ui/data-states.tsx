import React from 'react';
import { AlertTriangle, Database, Loader2, Plus, RefreshCw } from 'lucide-react';
import { extractErrorMessage } from '@/lib/api-client';

export const LoadingState: React.FC<{ label?: string }> = ({
  label = 'Consultando datos reales desde el servidor...',
}) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center">
    <Loader2 className="h-10 w-10 animate-spin text-emerald-400" />
    <p className="mt-4 text-sm font-medium text-slate-300">{label}</p>
  </div>
);

export const ErrorState: React.FC<{
  error: unknown;
  onRetry: () => void;
}> = ({ error, onRetry }) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-rose-500/30 bg-rose-950/20 p-10 text-center">
    <AlertTriangle className="h-10 w-10 text-rose-400" />
    <h3 className="mt-3 text-base font-semibold text-rose-200">
      Error de comunicación con el Backend
    </h3>
    <p className="mt-1 max-w-lg text-sm text-rose-300/80">
      {extractErrorMessage(error)}
    </p>
    <button
      type="button"
      onClick={onRetry}
      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-500 transition cursor-pointer"
    >
      <RefreshCw className="h-4 w-4" />
      Reintentar conexión
    </button>
  </div>
);

export const EmptyState: React.FC<{
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}> = ({ title, description, actionLabel, onAction }) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-12 text-center">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800/80 text-emerald-400">
      <Database className="h-6 w-6" />
    </div>
    <h3 className="mt-4 text-base font-semibold text-slate-200">{title}</h3>
    <p className="mt-1 max-w-md text-sm text-slate-400">{description}</p>
    {actionLabel && onAction && (
      <button
        type="button"
        onClick={onAction}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition cursor-pointer"
      >
        <Plus className="h-4 w-4" />
        {actionLabel}
      </button>
    )}
  </div>
);
