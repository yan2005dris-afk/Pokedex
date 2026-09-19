import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-rose-950/20 border border-rose-500/30 rounded-3xl backdrop-blur-sm max-w-lg mx-auto my-12">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4 shadow-lg shadow-rose-500/20">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-bold text-white">Error al cargar la PokéAPI</h3>
      <p className="text-sm text-slate-300 mt-2 max-w-md">
        {message || 'Ocurrió un problema de conexión al intentar obtener los 151 Pokémon.'}
      </p>

      <button
        onClick={onRetry}
        className="mt-6 flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 text-white text-xs font-bold shadow-lg shadow-rose-600/30 hover:scale-105 transition-all cursor-pointer"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Reintentar Conexión</span>
      </button>
    </div>
  );
}
