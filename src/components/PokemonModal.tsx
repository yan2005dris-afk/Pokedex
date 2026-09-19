import { useEffect, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Volume2,
  VolumeX,
  X,
  Zap,
} from 'lucide-react';
import type { PokemonDetail } from '../types/pokemon';
import { getOfficialArtworkUrl } from '../services/pokemonService';
import { getTypeConfig, STAT_NAMES } from '../utils/typeColors';

interface PokemonModalProps {
  pokemon: PokemonDetail | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (pokemon: PokemonDetail) => void;
  onNavigateNext?: () => void;
  onNavigatePrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export default function PokemonModal({
  pokemon,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onNavigateNext,
  onNavigatePrev,
  hasNext = false,
  hasPrev = false,
}: PokemonModalProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Close on ESC key press & keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNavigateNext && hasNext) onNavigateNext();
      if (e.key === 'ArrowLeft' && onNavigatePrev && hasPrev) onNavigatePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNavigateNext, onNavigatePrev, hasNext, hasPrev]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !pokemon) return null;

  const primaryType = pokemon.types[0]?.type.name || 'normal';
  const typeConfig = getTypeConfig(primaryType);
  const formattedId = `#${String(pokemon.id).padStart(3, '0')}`;
  const artworkUrl =
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    getOfficialArtworkUrl(pokemon.id);
  const animatedSprite = pokemon.sprites?.other?.showdown?.front_default;
  const audioCryUrl = pokemon.cries?.latest || pokemon.cries?.legacy;

  const handlePlayCry = () => {
    if (!audioCryUrl) return;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    const audio = new Audio(audioCryUrl);
    audioRef.current = audio;
    setIsPlayingAudio(true);
    audio.play().catch((err) => console.log('Audio autoplay prevented:', err));
    audio.onended = () => setIsPlayingAudio(false);
    audio.onerror = () => setIsPlayingAudio(false);
  };

  const totalStats = pokemon.stats.reduce((acc, curr) => acc + curr.base_stat, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Dialog Content */}
      <div
        className={`relative w-full max-w-2xl bg-gradient-to-b ${typeConfig.bgGradient} border ${typeConfig.cardBorder} rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh] text-slate-100 animate-in zoom-in-95 duration-200`}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 backdrop-blur-md bg-slate-950/30">
          <div className="flex items-center gap-3">
            <span className="font-mono font-black text-sm px-3 py-1 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300">
              {formattedId}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black capitalize tracking-tight text-white">
              {pokemon.name}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Play Cry Audio */}
            {audioCryUrl && (
              <button
                onClick={handlePlayCry}
                className={`p-2.5 rounded-xl border border-white/10 transition-all cursor-pointer ${
                  isPlayingAudio
                    ? 'bg-amber-500 text-slate-950 animate-bounce'
                    : 'bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                title="Escuchar sonido / grito"
              >
                {isPlayingAudio ? (
                  <Volume2 className="w-5 h-5" />
                ) : (
                  <VolumeX className="w-5 h-5" />
                )}
              </button>
            )}

            {/* Favorite toggle */}
            <button
              onClick={() => onToggleFavorite(pokemon)}
              className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                isFavorite
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/50'
                  : 'bg-slate-900/60 text-slate-300 hover:text-rose-400 hover:bg-slate-800 border border-white/10'
              }`}
              title={isFavorite ? 'Quitar de mi equipo' : 'Agregar a mi equipo'}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-white' : ''}`} />
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-rose-600/80 text-slate-300 hover:text-white border border-white/10 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Main Visual & Types */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            {/* Image Preview */}
            <div className="relative flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/40 border border-white/5 overflow-hidden">
              <div
                className="absolute inset-0 m-auto w-36 h-36 rounded-full blur-3xl opacity-50"
                style={{ backgroundColor: typeConfig.accentHex }}
              />
              <img
                src={artworkUrl}
                alt={pokemon.name}
                className="relative z-10 w-44 h-44 object-contain drop-shadow-2xl hover:scale-105 transition-transform"
              />

              {animatedSprite && (
                <div className="mt-3 flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-full border border-white/10 text-xs font-semibold text-slate-300">
                  <img
                    src={animatedSprite}
                    alt={`${pokemon.name} animated`}
                    className="w-7 h-7 object-contain"
                  />
                  <span>Sprite Animado</span>
                </div>
              )}
            </div>

            {/* General Info & Types */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Tipos Elementales
                </span>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  {pokemon.types.map((typeSlot) => {
                    const config = getTypeConfig(typeSlot.type.name);
                    return (
                      <span
                        key={typeSlot.slot}
                        className={`text-xs font-bold px-3 py-1 rounded-xl shadow-md border border-white/10 ${config.badgeBg}`}
                      >
                        {config.nameEs} ({config.nameEn})
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Physical Attributes Grid */}
              <div className="grid grid-cols-3 gap-2.5 pt-2">
                <div className="bg-slate-950/50 p-3 rounded-xl border border-white/5 text-center">
                  <span className="text-[11px] font-semibold text-slate-400 block">Altura</span>
                  <span className="text-sm font-bold text-white">
                    {(pokemon.height / 10).toFixed(1)} m
                  </span>
                </div>
                <div className="bg-slate-950/50 p-3 rounded-xl border border-white/5 text-center">
                  <span className="text-[11px] font-semibold text-slate-400 block">Peso</span>
                  <span className="text-sm font-bold text-white">
                    {(pokemon.weight / 10).toFixed(1)} kg
                  </span>
                </div>
                <div className="bg-slate-950/50 p-3 rounded-xl border border-white/5 text-center">
                  <span className="text-[11px] font-semibold text-slate-400 block">Exp. Base</span>
                  <span className="text-sm font-bold text-amber-300">
                    {pokemon.base_experience ?? 'N/A'} XP
                  </span>
                </div>
              </div>

              {/* Abilities */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Habilidades
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {pokemon.abilities.map((ab) => (
                    <span
                      key={ab.slot}
                      className={`text-xs font-medium px-2.5 py-1 rounded-lg border ${
                        ab.is_hidden
                          ? 'bg-purple-950/50 border-purple-500/40 text-purple-300'
                          : 'bg-slate-900/60 border-slate-700/60 text-slate-200'
                      }`}
                    >
                      <span className="capitalize">{ab.ability.name.replace('-', ' ')}</span>
                      {ab.is_hidden && (
                        <span className="ml-1 text-[10px] uppercase font-bold text-purple-400">
                          (Oculta)
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Base Stats Section */}
          <div className="bg-slate-950/60 rounded-2xl p-4 sm:p-5 border border-white/5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-bold uppercase tracking-wider text-white">
                  Estadísticas Base
                </span>
              </div>
              <div className="text-xs font-extrabold text-amber-300 bg-amber-400/10 px-2.5 py-0.5 rounded-md border border-amber-400/20">
                Total: {totalStats} pts
              </div>
            </div>

            <div className="space-y-2.5 pt-1">
              {pokemon.stats.map((statItem) => {
                const statKey = statItem.stat.name;
                const statMeta = STAT_NAMES[statKey] || {
                  es: statKey,
                  short: statKey.toUpperCase(),
                  color: 'bg-slate-500',
                };
                const percentage = Math.min(Math.round((statItem.base_stat / 255) * 100), 100);

                return (
                  <div key={statKey} className="grid grid-cols-12 items-center gap-2 text-xs">
                    {/* Stat Name */}
                    <div className="col-span-4 sm:col-span-3 font-semibold text-slate-300 truncate">
                      {statMeta.es}
                    </div>

                    {/* Stat Value */}
                    <div className="col-span-2 sm:col-span-2 font-mono font-bold text-right text-white">
                      {statItem.base_stat}
                    </div>

                    {/* Visual Progress Bar */}
                    <div className="col-span-6 sm:col-span-7 bg-slate-900 rounded-full h-2.5 overflow-hidden p-0.5 border border-white/5">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ease-out ${statMeta.color}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Navigation Footer */}
        <div className="p-4 border-t border-white/10 bg-slate-950/40 flex items-center justify-between">
          <button
            onClick={onNavigatePrev}
            disabled={!hasPrev}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              hasPrev
                ? 'bg-slate-900 text-slate-200 hover:bg-slate-800 border border-white/10 cursor-pointer'
                : 'opacity-40 text-slate-500 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          <span className="text-xs text-slate-400 font-medium">
            Usa las flechas ◀ ▶ del teclado
          </span>

          <button
            onClick={onNavigateNext}
            disabled={!hasNext}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              hasNext
                ? 'bg-slate-900 text-slate-200 hover:bg-slate-800 border border-white/10 cursor-pointer'
                : 'opacity-40 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>Siguiente</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
