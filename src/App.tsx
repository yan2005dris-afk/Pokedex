import { useEffect, useMemo, useState } from 'react';
import type { PokemonDetail, PokemonTypeName, SortOption } from './types/pokemon';
import { fetchAllPokemonDetails, fetchPokemonList } from './services/pokemonService';
import Header from './components/Header';
import TypeFilter from './components/TypeFilter';
import PokemonCard from './components/PokemonCard';
import PokemonModal from './components/PokemonModal';
import TeamDrawer from './components/TeamDrawer';
import LoadingSkeleton from './components/LoadingSkeleton';
import EmptyState from './components/EmptyState';
import ErrorState from './components/ErrorState';
import { Globe, Sparkles } from 'lucide-react';

const FAVORITES_STORAGE_KEY = 'pokedex_kanto_team_v1';

export default function App() {
  const [pokemonList, setPokemonList] = useState<PokemonDetail[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadProgress, setLoadProgress] = useState<{ loaded: number; total: number }>({
    loaded: 0,
    total: 151,
  });
  const [error, setError] = useState<string | null>(null);

  // Filters & State
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedType, setSelectedType] = useState<PokemonTypeName>('all');
  const [sortBy, setSortBy] = useState<SortOption>('id-asc');

  // Favorites / Team State (persisted in localStorage)
  const [team, setTeam] = useState<PokemonDetail[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal State
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(null);
  const [isTeamOpen, setIsTeamOpen] = useState<boolean>(false);

  // Save team to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(team));
    } catch (e) {
      console.error('Error saving team to localStorage:', e);
    }
  }, [team]);

  const loadData = async (showLoadingState = false) => {
    if (showLoadingState) {
      setIsLoading(true);
      setError(null);
      setLoadProgress({ loaded: 0, total: 151 });
    }

    try {
      const listResponse = await fetchPokemonList(151);
      const detailedPokemon = await fetchAllPokemonDetails(
        listResponse.results,
        25,
        (loaded, total) => {
          setLoadProgress({ loaded, total });
        }
      );
      setPokemonList(detailedPokemon);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Error desconocido al conectar con la PokeAPI';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    async function initialize() {
      try {
        const listResponse = await fetchPokemonList(1000);
        const detailedPokemon = await fetchAllPokemonDetails(
          listResponse.results,
          25,
          (loaded, total) => {
            if (isMounted) {
              setLoadProgress({ loaded, total });
            }
          }
        );
        if (isMounted) {
          setPokemonList(detailedPokemon);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const msg =
            err instanceof Error ? err.message : 'Error desconocido al conectar con la PokeAPI';
          setError(msg);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    initialize();

    return () => {
      isMounted = false;
    };
  }, []);

  // Toggle favorite / team
  const handleToggleFavorite = (pokemon: PokemonDetail) => {
    setTeam((prev) => {
      const exists = prev.some((p) => p.id === pokemon.id);
      if (exists) {
        return prev.filter((p) => p.id !== pokemon.id);
      }
      if (prev.length >= 6) {
        alert('¡Tu equipo ya tiene 6 Pokémon! Quitá uno antes de agregar otro.');
        return prev;
      }
      return [...prev, pokemon];
    });
  };

  const handleClearTeam = () => {
    if (window.confirm('¿Estás seguro de que deseás vaciar tu equipo?')) {
      setTeam([]);
    }
  };

  // Filtered & Sorted Pokemon
  const filteredPokemon = useMemo(() => {
    return pokemonList
      .filter((poke) => {
        // Search filter (by name or by ID #025 or 25)
        const cleanQuery = searchTerm.trim().toLowerCase().replace('#', '');
        const matchesName = poke.name.toLowerCase().includes(cleanQuery);
        const matchesId = String(poke.id).includes(cleanQuery);
        const matchesSearch = cleanQuery === '' || matchesName || matchesId;

        // Type filter
        const matchesType =
          selectedType === 'all' ||
          poke.types.some((t) => t.type.name.toLowerCase() === selectedType.toLowerCase());

        return matchesSearch && matchesType;
      })
      .sort((a, b) => {
        if (sortBy === 'id-asc') return a.id - b.id;
        if (sortBy === 'id-desc') return b.id - a.id;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
        if (sortBy === 'stats-desc') {
          const totalA = a.stats.reduce((acc, curr) => acc + curr.base_stat, 0);
          const totalB = b.stats.reduce((acc, curr) => acc + curr.base_stat, 0);
          return totalB - totalA;
        }
        return 0;
      });
  }, [pokemonList, searchTerm, selectedType, sortBy]);

  // Modal navigation helpers
  const currentModalIndex = useMemo(() => {
    if (!selectedPokemon) return -1;
    return filteredPokemon.findIndex((p) => p.id === selectedPokemon.id);
  }, [selectedPokemon, filteredPokemon]);

  const handleNavigateNext = () => {
    if (currentModalIndex >= 0 && currentModalIndex < filteredPokemon.length - 1) {
      setSelectedPokemon(filteredPokemon[currentModalIndex + 1]);
    }
  };

  const handleNavigatePrev = () => {
    if (currentModalIndex > 0) {
      setSelectedPokemon(filteredPokemon[currentModalIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-rose-500 selection:text-white">
      {/* Header */}
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        teamCount={team.length}
        onOpenTeam={() => setIsTeamOpen(true)}
        totalLoaded={pokemonList.length}
      />

      {/* Hero Banner */}
      <section className="relative overflow-hidden py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-900 bg-gradient-to-b from-rose-950/20 via-slate-950 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-600/10 via-slate-900/0 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generación 1 · Región de Kanto</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-2xl mx-auto leading-tight">
            Explorá los <span className="bg-gradient-to-r from-rose-400 via-red-300 to-amber-300 bg-clip-text text-transparent">151 Pokémon</span> originales
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-medium">
            Interfaz reactiva consumiendo la PokeAPI en tiempo real. Consultá estadísticas base,
            tipos elementales, medidas y armá tu equipo de 6 integrantes.
          </p>

          {/* Loading progress bar indicator */}
          {isLoading && (
            <div className="mt-6 max-w-xs mx-auto">
              <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-semibold">
                <span>Cargando datos de PokeAPI...</span>
                <span>
                  {loadProgress.loaded} / {loadProgress.total}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-300 rounded-full"
                  style={{
                    width: `${Math.round((loadProgress.loaded / loadProgress.total) * 100)}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Type Filter & Sorter */}
        <TypeFilter
          selectedType={selectedType}
          onSelectType={setSelectedType}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalFiltered={filteredPokemon.length}
        />

        {/* States: Loading, Error, Empty, or Grid */}
        {error ? (
          <ErrorState message={error} onRetry={loadData} />
        ) : isLoading && pokemonList.length === 0 ? (
          <LoadingSkeleton count={12} />
        ) : filteredPokemon.length === 0 ? (
          <EmptyState
            onReset={() => {
              setSearchTerm('');
              setSelectedType('all');
            }}
            searchTerm={searchTerm}
            selectedType={selectedType}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 animate-in fade-in duration-300">
            {filteredPokemon.map((pokemon) => {
              const isFav = team.some((t) => t.id === pokemon.id);
              return (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  isFavorite={isFav}
                  onToggleFavorite={handleToggleFavorite}
                  onSelect={setSelectedPokemon}
                />
              );
            })}
          </div>
        )}
      </main>

      {/* Pokemon Detail Modal */}
      <PokemonModal
        pokemon={selectedPokemon}
        isOpen={Boolean(selectedPokemon)}
        onClose={() => setSelectedPokemon(null)}
        isFavorite={Boolean(selectedPokemon && team.some((t) => t.id === selectedPokemon.id))}
        onToggleFavorite={handleToggleFavorite}
        onNavigateNext={handleNavigateNext}
        onNavigatePrev={handleNavigatePrev}
        hasNext={currentModalIndex >= 0 && currentModalIndex < filteredPokemon.length - 1}
        hasPrev={currentModalIndex > 0}
      />

      {/* Team Drawer Panel */}
      <TeamDrawer
        isOpen={isTeamOpen}
        onClose={() => setIsTeamOpen(false)}
        team={team}
        onRemoveFromTeam={handleToggleFavorite}
        onClearTeam={handleClearTeam}
        onSelectPokemon={setSelectedPokemon}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Datos provistos en tiempo real por</span>
            <a
              href="https://pokeapi.co/"
              target="_blank"
              rel="noreferrer"
              className="text-rose-400 font-semibold hover:underline"
            >
              PokéAPI v2
            </a>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1 font-medium">
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              React 19 + TypeScript + Tailwind CSS
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
