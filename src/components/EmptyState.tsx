import { RotateCcw, SearchX } from 'lucide-react';

interface EmptyStateProps {
  onReset: () => void;
  searchTerm?: string;
  selectedType?: string;
}

export default function EmptyState({ onReset, searchTerm, selectedType }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-900/40 border border-slate-800/60 rounded-3xl backdrop-blur-sm max-w-lg mx-auto my-12">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4 shadow-lg shadow-rose-500/10">
        <SearchX className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-bold text-white">No se encontraron Pokémon</h3>
      <p className="text-sm text-slate-400 mt-2 max-w-sm">
        No pudimos encontrar ningún Pokémon que coincida con{' '}
        {searchTerm && <span className="text-rose-400 font-semibold">"{searchTerm}"</span>}
        {searchTerm && selectedType && selectedType !== 'all' && ' y el tipo '}
        {selectedType && selectedType !== 'all' && (
          <span className="text-amber-400 font-semibold">"{selectedType}"</span>
        )}
        .
      </p>

      <button
        onClick={onReset}
        className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 text-white text-xs font-bold shadow-lg shadow-rose-600/30 hover:scale-105 transition-all cursor-pointer"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Restablecer Filtros</span>
      </button>
    </div>
  );
}
