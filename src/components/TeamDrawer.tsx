import { Award, ShieldAlert, Trash2, Users, X } from 'lucide-react';
import type { PokemonDetail } from '../types/pokemon';
import { getOfficialArtworkUrl } from '../services/pokemonService';
import { getTypeConfig } from '../utils/typeColors';

interface TeamDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  team: PokemonDetail[];
  onRemoveFromTeam: (pokemon: PokemonDetail) => void;
  onClearTeam: () => void;
  onSelectPokemon: (pokemon: PokemonDetail) => void;
}

export default function TeamDrawer({
  isOpen,
  onClose,
  team,
  onRemoveFromTeam,
  onClearTeam,
  onSelectPokemon,
}: TeamDrawerProps) {
  if (!isOpen) return null;

  const totalTeamBst = team.reduce(
    (acc, curr) =>
      acc + curr.stats.reduce((sAcc, sCurr) => sAcc + sCurr.base_stat, 0),
    0
  );
  const avgTeamBst = team.length > 0 ? Math.round(totalTeamBst / team.length) : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-950/95 border-l border-slate-800 shadow-2xl backdrop-blur-2xl flex flex-col z-10 text-slate-100 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Mi Equipo Pokémon</h3>
                <p className="text-xs text-slate-400 font-medium">
                  {team.length} de 6 integrantes
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {team.length > 0 && (
                <button
                  onClick={onClearTeam}
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-lg transition-colors cursor-pointer"
                  title="Vaciar equipo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          {team.length > 0 && (
            <div className="px-5 py-3 bg-slate-900/60 border-b border-slate-800/80 grid grid-cols-2 gap-3 text-center">
              <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-center gap-1">
                  <Award className="w-3 h-3 text-amber-400" /> Promedio BST
                </span>
                <span className="text-base font-black text-amber-300">{avgTeamBst} pts</span>
              </div>
              <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-center gap-1">
                  <ShieldAlert className="w-3 h-3 text-emerald-400" /> Cobertura
                </span>
                <span className="text-base font-black text-emerald-300">
                  {new Set(team.flatMap((p) => p.types.map((t) => t.type.name))).size} Tipos
                </span>
              </div>
            </div>
          )}

          {/* Team Slots List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {team.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mb-3 border border-slate-800">
                  <Users className="w-8 h-8 text-slate-600" />
                </div>
                <h4 className="font-bold text-slate-300 text-base">Equipo Vacío</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Hacé click en el ícono de corazón de cualquier tarjeta de Pokémon para agregarlo a tu equipo (máximo 6).
                </p>
              </div>
            ) : (
              team.map((pokemon) => {
                const primaryType = pokemon.types[0]?.type.name || 'normal';
                const typeConfig = getTypeConfig(primaryType);
                const artworkUrl =
                  pokemon.sprites?.other?.['official-artwork']?.front_default ||
                  getOfficialArtworkUrl(pokemon.id);
                const bst = pokemon.stats.reduce((acc, curr) => acc + curr.base_stat, 0);

                return (
                  <div
                    key={pokemon.id}
                    onClick={() => {
                      onSelectPokemon(pokemon);
                      onClose();
                    }}
                    className={`p-3 rounded-2xl bg-gradient-to-r ${typeConfig.bgGradient} border ${typeConfig.cardBorder} flex items-center justify-between gap-3 shadow-lg hover:border-slate-400 transition-all cursor-pointer group`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={artworkUrl}
                        alt={pokemon.name}
                        className="w-14 h-14 object-contain drop-shadow group-hover:scale-110 transition-transform"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-slate-400">
                            #{String(pokemon.id).padStart(3, '0')}
                          </span>
                          <span className="text-sm font-black capitalize text-white">
                            {pokemon.name}
                          </span>
                        </div>
                        <div className="flex gap-1 mt-1">
                          {pokemon.types.map((t) => {
                            const config = getTypeConfig(t.type.name);
                            return (
                              <span
                                key={t.slot}
                                className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${config.badgeBg}`}
                              >
                                {config.nameEs}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 font-medium block">BST</span>
                        <span className="text-xs font-bold text-amber-300">{bst}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveFromTeam(pokemon);
                        }}
                        className="p-2 rounded-lg bg-slate-900/60 hover:bg-rose-500 hover:text-white text-slate-400 transition-colors cursor-pointer"
                        title="Quitar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}

            {/* Empty slots placeholders up to 6 */}
            {Array.from({ length: Math.max(0, 6 - team.length) }).map((_, idx) => (
              <div
                key={`empty-${idx}`}
                className="p-4 rounded-2xl border-2 border-dashed border-slate-800/80 flex items-center justify-center text-slate-600 text-xs font-semibold gap-2"
              >
                <span>Ranura {team.length + idx + 1} Disponible</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
