export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonTypeSlot {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbilitySlot {
  is_hidden: boolean;
  slot: number;
  ability: {
    name: string;
    url: string;
  };
}

export interface PokemonSprites {
  front_default: string;
  front_shiny?: string;
  other: {
    'official-artwork': {
      front_default: string;
      front_shiny?: string;
    };
    showdown?: {
      front_default?: string;
      front_shiny?: string;
    };
  };
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number; // In decimetres
  weight: number; // In hectograms
  base_experience: number;
  types: PokemonTypeSlot[];
  stats: PokemonStat[];
  abilities: PokemonAbilitySlot[];
  sprites: PokemonSprites;
  cries?: {
    latest?: string;
    legacy?: string;
  };
}

export type SortOption =
  | 'id-asc'
  | 'id-desc'
  | 'name-asc'
  | 'name-desc'
  | 'stats-desc';

export type PokemonTypeName =
  | 'all'
  | 'normal'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'steel'
  | 'fairy';
