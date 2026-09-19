import { ArrowUpDown, Filter, Sparkles } from 'lucide-react';
import type { PokemonTypeName, SortOption } from '../types/pokemon';
import { POKEMON_TYPES } from '../utils/typeColors';

interface TypeFilterProps {
  selectedType: PokemonTypeName;
  onSelectType: (type: PokemonTypeName) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalFiltered: number;
}

const TYPE_KEYS: PokemonTypeName[] = [
  'all',
  'fire',
  'water',
  'grass',
  'electric',
  'normal',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'steel',
  'fairy',
];

export default function TypeFilter({
  selectedType,
  onSelectType,
  sortBy,
  onSortChange,
  totalFiltered,
}: TypeFilterProps) {
  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-md mb-8">
      {/* Top Bar: Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/60">
        <div className="flex items-center gap-2 text-slate-300">
          <Filter className="w-4 h-4 text-rose-400" />
          <span className="text-sm font-bold uppercase tracking-wider text-slate-200">
            Filtrar por Tipo
          </span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
            {totalFiltered} encontrados
          </span>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <ArrowUpDown className="w-4 h-4 text-slate-400" />
          <label htmlFor="sort-select" className="text-xs font-medium text-slate-400 whitespace-nowrap">
            Ordenar por:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="w-full sm:w-auto bg-slate-950 border border-slate-800 text-slate-200 text-xs font-medium rounded-xl px-3 py-2 focus:outline-none focus:border-rose-500 cursor-pointer"
          >
            <option value="id-asc">N° Pokédex (Menor a Mayor)</option>
            <option value="id-desc">N° Pokédex (Mayor a Menor)</option>
            <option value="name-asc">Nombre (A - Z)</option>
            <option value="name-desc">Nombre (Z - A)</option>
            <option value="stats-desc">Poder Total (Estadísticas)</option>
          </select>
        </div>
      </div>

      {/* Horizontal Scrollable Types */}
      <div className="flex items-center gap-2 overflow-x-auto pt-4 pb-1 no-scrollbar">
        {TYPE_KEYS.map((typeKey) => {
          const isSelected = selectedType === typeKey;
          const isAll = typeKey === 'all';
          const typeData = !isAll ? POKEMON_TYPES[typeKey] : null;

          return (
            <button
              key={typeKey}
              onClick={() => onSelectType(typeKey)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer select-none ${
                isSelected
                  ? isAll
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 ring-2 ring-rose-400/40'
                    : `${typeData?.badgeBg} shadow-lg ring-2 ring-white/30 scale-105`
                  : 'bg-slate-950/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800/80'
              }`}
            >
              {isAll ? (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Todos</span>
                </>
              ) : (
                <>
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ backgroundColor: typeData?.accentHex }}
                  />
                  <span>{typeData?.nameEs || typeKey}</span>
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
