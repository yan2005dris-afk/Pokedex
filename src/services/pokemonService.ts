import type { PokemonDetail, PokemonListResponse } from '../types/pokemon';

const API_BASE_URL = 'https://pokeapi.co/api/v2';
const pokemonCache = new Map<number | string, PokemonDetail>();

/**
 * Helper to extract Pokemon ID from its resource URL (e.g., https://pokeapi.co/api/v2/pokemon/25/)
 */
export function extractIdFromUrl(url: string): number {
  const parts = url.split('/').filter(Boolean);
  const idStr = parts[parts.length - 1];
  return parseInt(idStr, 10) || 1;
}

/**
 * Returns high-resolution official artwork URL based on Pokemon ID.
 */
export function getOfficialArtworkUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

/**
 * Fetches the first 151 Pokemon list from PokeAPI.
 */
export async function fetchPokemonList(limit: number = 150): Promise<PokemonListResponse> {
  const response = await fetch(`${API_BASE_URL}/pokemon?limit=${limit}`);
  if (!response.ok) {
    throw new Error(`Error ${response.status}: Failed to fetch Pokemon list`);
  }
  return response.json();
}

/**
 * Fetches full detail for a single Pokemon with memory cache.
 */
export async function fetchPokemonDetail(nameOrId: string | number): Promise<PokemonDetail> {
  if (pokemonCache.has(nameOrId)) {
    return pokemonCache.get(nameOrId)!;
  }

  const response = await fetch(`${API_BASE_URL}/pokemon/${nameOrId}`);
  if (!response.ok) {
    throw new Error(`Error ${response.status}: Failed to fetch Pokemon detail for "${nameOrId}"`);
  }
  const data: PokemonDetail = await response.json();
  pokemonCache.set(data.id, data);
  pokemonCache.set(data.name.toLowerCase(), data);
  return data;
}

/**
 * Fetches details for a list of Pokemon concurrently in controlled chunks to avoid rate limiting.
 */
export async function fetchAllPokemonDetails(
  pokemonUrls: { name: string; url: string }[],
  chunkSize: number = 25,
  onProgress?: (loaded: number, total: number) => void
): Promise<PokemonDetail[]> {
  const results: PokemonDetail[] = [];
  const total = pokemonUrls.length;

  for (let i = 0; i < total; i += chunkSize) {
    const chunk = pokemonUrls.slice(i, i + chunkSize);
    const chunkPromises = chunk.map((p) => {
      const id = extractIdFromUrl(p.url);
      return fetchPokemonDetail(id);
    });

    const chunkResults = await Promise.all(chunkPromises);
    results.push(...chunkResults);

    if (onProgress) {
      onProgress(results.length, total);
    }
  }

  return results.sort((a, b) => a.id - b.id);
}
