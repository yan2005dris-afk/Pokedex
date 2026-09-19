import { Heart, Sparkles } from 'lucide-react';
import type { PokemonDetail } from '../types/pokemon';
import { getOfficialArtworkUrl } from '../services/pokemonService';
import { getTypeConfig } from '../utils/typeColors';

interface PokemonCardProps {
  pokemon: PokemonDetail;
  isFavorite: boolean;
  onToggleFavorite: (pokemon: PokemonDetail) => void;
  onSelect: (pokemon: PokemonDetail) => void;
}

export default function PokemonCard({
  pokemon,
  isFavorite,
  onToggleFavorite,
  onSelect,
}: PokemonCardProps) {
  const primaryType = pokemon.types[0]?.type.name || 'normal';
  const typeConfig = getTypeConfig(primaryType);
  const formattedId = `#${String(pokemon.id).padStart(3, '0')}`;
  const artworkUrl =
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    getOfficialArtworkUrl(pokemon.id);

  // Calculate total base stats
  const totalStats = pokemon.stats?.reduce((acc, curr) => acc + curr.base_stat, 0) || 0;

  return (
    <div
      onClick={() => onSelect(pokemon)}
      className={`group relative rounded-3xl p-5 bg-gradient-to-br ${typeConfig.bgGradient} border ${typeConfig.cardBorder} shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer overflow-hidden backdrop-blur-sm`}
    >
      {/* Background Decorative Pokeball Watermark */}
      <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full border-[14px] border-white/5 pointer-events-none group-hover:scale-110 transition-transform duration-500" />

      {/* Top Card Info: Number & Favorite Button */}
      <div className="flex items-center justify-between z-10">
        <span className="font-mono font-black text-sm text-slate-400/80 bg-slate-950/40 px-2.5 py-1 rounded-xl border border-white/5 backdrop-blur-md">
          {formattedId}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(pokemon);
          }}
          className={`p-2 rounded-xl transition-all cursor-pointer ${
            isFavorite
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40 scale-110'
              : 'bg-slate-950/40 text-slate-400 hover:text-rose-400 hover:bg-slate-900/80 border border-white/5'
          }`}
          title={isFavorite ? 'Quitar de mi equipo' : 'Agregar a mi equipo'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
        </button>
      </div>

      {/* Image Container with Glow */}
      <div className="relative py-4 flex items-center justify-center my-1">
        <div
          className={`absolute inset-0 m-auto w-24 h-24 rounded-full blur-2xl opacity-40 group-hover:opacity-75 transition-opacity duration-300`}
          style={{ backgroundColor: typeConfig.accentHex }}
        />
        <img
          src={artworkUrl}
          alt={pokemon.name}
          loading="lazy"
          className="relative z-10 w-36 h-36 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-300 transform-gpu"
        />
      </div>

      {/* Pokemon Details: Name & Types */}
      <div className="z-10 mt-1">
        <h3 className="text-lg font-black capitalize tracking-tight text-white group-hover:text-amber-200 transition-colors">
          {pokemon.name}
        </h3>

        {/* Types badges */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {pokemon.types.map((typeSlot) => {
            const config = getTypeConfig(typeSlot.type.name);
            return (
              <span
                key={typeSlot.slot}
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-lg shadow-sm border border-white/10 ${config.badgeBg}`}
              >
                {config.nameEs}
              </span>
            );
          })}
        </div>

        {/* Card Footer: Total Stats summary */}
        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1 font-medium">
            <Sparkles className="w-3 h-3 text-amber-400" />
            BST
          </span>
          <span className="font-bold text-slate-200">{totalStats} pts</span>
        </div>
      </div>
    </div>
  );
}
