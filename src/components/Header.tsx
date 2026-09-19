import { Search, Sparkles, Users, X } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  teamCount: number;
  onOpenTeam: () => void;
  totalLoaded: number;
}

export default function Header({
  searchTerm,
  onSearchChange,
  teamCount,
  onOpenTeam,
  totalLoaded,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 shadow-lg shadow-rose-500/30 ring-2 ring-rose-400/20 group-hover:scale-105 transition-transform">
              <div className="w-5 h-5 rounded-full border-2 border-white bg-slate-900 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Poké<span className="text-rose-500">dex</span>
                </h1>
                <span className="px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  Kanto
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                151 Pokémon ({totalLoaded} cargados)
              </p>
            </div>
          </div>

          {/* Mobile Team Trigger */}
          <button
            onClick={onOpenTeam}
            className="md:hidden relative flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold hover:border-rose-500/50 transition-all cursor-pointer"
          >
            <Users className="w-4 h-4 text-rose-400" />
            <span>Equipo</span>
            <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black">
              {teamCount}/6
            </span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="w-full md:max-w-md relative">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar por nombre o número (ej. Pikachu o 25)..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all shadow-inner"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 p-1 text-slate-400 hover:text-white rounded-md transition-colors cursor-pointer"
                title="Limpiar búsqueda"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Desktop Team & Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOpenTeam}
            className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-rose-500/40 text-slate-200 hover:text-white text-sm font-semibold shadow-md transition-all group cursor-pointer hover:shadow-rose-500/10"
          >
            <div className="w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition-colors">
              <Sparkles className="w-4 h-4" />
            </div>
            <span>Mi Equipo</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-bold transition-all ${teamCount > 0
                ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/30'
                : 'bg-slate-800 text-slate-400'
                }`}
            >
              {teamCount}/6
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
