export interface TypeConfig {
  nameEs: string;
  nameEn: string;
  bgGradient: string;
  cardBorder: string;
  badgeBg: string;
  badgeText: string;
  glowColor: string;
  accentHex: string;
}

export const POKEMON_TYPES: Record<string, TypeConfig> = {
  normal: {
    nameEs: 'Normal',
    nameEn: 'Normal',
    bgGradient: 'from-zinc-700/40 via-zinc-800/30 to-slate-900',
    cardBorder: 'border-zinc-500/30 hover:border-zinc-400/60',
    badgeBg: 'bg-zinc-600/80 text-zinc-100',
    badgeText: 'text-zinc-200',
    glowColor: 'shadow-zinc-500/20',
    accentHex: '#A8A878',
  },
  fire: {
    nameEs: 'Fuego',
    nameEn: 'Fire',
    bgGradient: 'from-amber-600/40 via-orange-900/30 to-slate-900',
    cardBorder: 'border-orange-500/30 hover:border-orange-400/60',
    badgeBg: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white',
    badgeText: 'text-orange-300',
    glowColor: 'shadow-orange-500/30',
    accentHex: '#F08030',
  },
  water: {
    nameEs: 'Agua',
    nameEn: 'Water',
    bgGradient: 'from-blue-600/40 via-cyan-900/30 to-slate-900',
    cardBorder: 'border-blue-500/30 hover:border-blue-400/60',
    badgeBg: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
    badgeText: 'text-blue-300',
    glowColor: 'shadow-blue-500/30',
    accentHex: '#6890F0',
  },
  grass: {
    nameEs: 'Planta',
    nameEn: 'Grass',
    bgGradient: 'from-emerald-600/40 via-teal-900/30 to-slate-900',
    cardBorder: 'border-emerald-500/30 hover:border-emerald-400/60',
    badgeBg: 'bg-gradient-to-r from-emerald-500 to-green-500 text-white',
    badgeText: 'text-emerald-300',
    glowColor: 'shadow-emerald-500/30',
    accentHex: '#78C850',
  },
  electric: {
    nameEs: 'Eléctrico',
    nameEn: 'Electric',
    bgGradient: 'from-yellow-500/40 via-amber-900/30 to-slate-900',
    cardBorder: 'border-yellow-500/30 hover:border-yellow-400/60',
    badgeBg: 'bg-gradient-to-r from-yellow-500 to-amber-400 text-slate-950 font-bold',
    badgeText: 'text-yellow-300',
    glowColor: 'shadow-yellow-500/30',
    accentHex: '#F8D030',
  },
  ice: {
    nameEs: 'Hielo',
    nameEn: 'Ice',
    bgGradient: 'from-cyan-400/40 via-sky-900/30 to-slate-900',
    cardBorder: 'border-cyan-400/30 hover:border-cyan-300/60',
    badgeBg: 'bg-gradient-to-r from-cyan-400 to-sky-300 text-slate-950 font-bold',
    badgeText: 'text-cyan-300',
    glowColor: 'shadow-cyan-400/30',
    accentHex: '#98D8D8',
  },
  fighting: {
    nameEs: 'Lucha',
    nameEn: 'Fighting',
    bgGradient: 'from-red-800/40 via-rose-950/30 to-slate-900',
    cardBorder: 'border-red-700/30 hover:border-red-500/60',
    badgeBg: 'bg-gradient-to-r from-red-700 to-rose-600 text-white',
    badgeText: 'text-red-300',
    glowColor: 'shadow-red-700/30',
    accentHex: '#C03028',
  },
  poison: {
    nameEs: 'Veneno',
    nameEn: 'Poison',
    bgGradient: 'from-purple-700/40 via-fuchsia-950/30 to-slate-900',
    cardBorder: 'border-purple-500/30 hover:border-purple-400/60',
    badgeBg: 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white',
    badgeText: 'text-purple-300',
    glowColor: 'shadow-purple-500/30',
    accentHex: '#A040A0',
  },
  ground: {
    nameEs: 'Tierra',
    nameEn: 'Ground',
    bgGradient: 'from-amber-800/40 via-yellow-950/30 to-slate-900',
    cardBorder: 'border-amber-700/30 hover:border-amber-500/60',
    badgeBg: 'bg-gradient-to-r from-amber-700 to-yellow-600 text-white',
    badgeText: 'text-amber-300',
    glowColor: 'shadow-amber-700/30',
    accentHex: '#E0C068',
  },
  flying: {
    nameEs: 'Volador',
    nameEn: 'Flying',
    bgGradient: 'from-indigo-500/40 via-sky-950/30 to-slate-900',
    cardBorder: 'border-indigo-400/30 hover:border-indigo-300/60',
    badgeBg: 'bg-gradient-to-r from-indigo-500 to-sky-400 text-white',
    badgeText: 'text-indigo-300',
    glowColor: 'shadow-indigo-500/30',
    accentHex: '#A890F0',
  },
  psychic: {
    nameEs: 'Psíquico',
    nameEn: 'Psychic',
    bgGradient: 'from-pink-600/40 via-rose-950/30 to-slate-900',
    cardBorder: 'border-pink-500/30 hover:border-pink-400/60',
    badgeBg: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white',
    badgeText: 'text-pink-300',
    glowColor: 'shadow-pink-500/30',
    accentHex: '#F85888',
  },
  bug: {
    nameEs: 'Bicho',
    nameEn: 'Bug',
    bgGradient: 'from-lime-600/40 via-emerald-950/30 to-slate-900',
    cardBorder: 'border-lime-500/30 hover:border-lime-400/60',
    badgeBg: 'bg-gradient-to-r from-lime-600 to-emerald-600 text-white',
    badgeText: 'text-lime-300',
    glowColor: 'shadow-lime-500/30',
    accentHex: '#A8B820',
  },
  rock: {
    nameEs: 'Roca',
    nameEn: 'Rock',
    bgGradient: 'from-yellow-800/40 via-stone-900/40 to-slate-900',
    cardBorder: 'border-yellow-700/30 hover:border-yellow-600/60',
    badgeBg: 'bg-gradient-to-r from-yellow-800 to-stone-600 text-white',
    badgeText: 'text-stone-300',
    glowColor: 'shadow-yellow-800/30',
    accentHex: '#B8A038',
  },
  ghost: {
    nameEs: 'Fantasma',
    nameEn: 'Ghost',
    bgGradient: 'from-indigo-900/50 via-purple-950/40 to-slate-900',
    cardBorder: 'border-indigo-600/40 hover:border-indigo-400/70',
    badgeBg: 'bg-gradient-to-r from-indigo-800 to-purple-800 text-white',
    badgeText: 'text-indigo-300',
    glowColor: 'shadow-indigo-600/40',
    accentHex: '#705898',
  },
  dragon: {
    nameEs: 'Dragón',
    nameEn: 'Dragon',
    bgGradient: 'from-violet-700/50 via-indigo-950/40 to-slate-900',
    cardBorder: 'border-violet-500/40 hover:border-violet-400/70',
    badgeBg: 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white',
    badgeText: 'text-violet-300',
    glowColor: 'shadow-violet-600/40',
    accentHex: '#7038F8',
  },
  steel: {
    nameEs: 'Acero',
    nameEn: 'Steel',
    bgGradient: 'from-slate-500/40 via-zinc-800/30 to-slate-900',
    cardBorder: 'border-slate-400/30 hover:border-slate-300/60',
    badgeBg: 'bg-gradient-to-r from-slate-500 to-zinc-400 text-slate-950 font-bold',
    badgeText: 'text-slate-300',
    glowColor: 'shadow-slate-400/30',
    accentHex: '#B8B8D0',
  },
  fairy: {
    nameEs: 'Hada',
    nameEn: 'Fairy',
    bgGradient: 'from-pink-400/40 via-rose-950/30 to-slate-900',
    cardBorder: 'border-pink-400/30 hover:border-pink-300/60',
    badgeBg: 'bg-gradient-to-r from-pink-400 to-rose-300 text-slate-950 font-bold',
    badgeText: 'text-pink-200',
    glowColor: 'shadow-pink-400/30',
    accentHex: '#EE99AC',
  },
};

export function getTypeConfig(type: string): TypeConfig {
  const normalized = type.toLowerCase();
  return (
    POKEMON_TYPES[normalized] || {
      nameEs: normalized,
      nameEn: normalized,
      bgGradient: 'from-slate-700/40 via-slate-800/30 to-slate-900',
      cardBorder: 'border-slate-600/30 hover:border-slate-500/60',
      badgeBg: 'bg-slate-700 text-white',
      badgeText: 'text-slate-300',
      glowColor: 'shadow-slate-500/20',
      accentHex: '#68A090',
    }
  );
}

export const STAT_NAMES: Record<string, { es: string; short: string; color: string }> = {
  hp: { es: 'Puntos de Salud', short: 'HP', color: 'bg-emerald-500' },
  attack: { es: 'Ataque', short: 'ATK', color: 'bg-red-500' },
  defense: { es: 'Defensa', short: 'DEF', color: 'bg-blue-500' },
  'special-attack': { es: 'Ataque Especial', short: 'Sp. ATK', color: 'bg-amber-500' },
  'special-defense': { es: 'Defensa Especial', short: 'Sp. DEF', color: 'bg-teal-500' },
  speed: { es: 'Velocidad', short: 'SPD', color: 'bg-fuchsia-500' },
};
