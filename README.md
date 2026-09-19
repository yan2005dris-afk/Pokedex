# 🔴 Pokédex Kanto (151 Pokémon) - React + TypeScript + Vite

Aplicación web moderna y reactiva desarrollada en **React 19**, **TypeScript** y **Tailwind CSS v4**, que consume en tiempo real los 151 Pokémon originales de la región de Kanto desde la **[PokéAPI v2](https://pokeapi.co/)**.

---

## 🚀 Características Principales

- **Consumo de API REST**: Consumo de la PokeAPI (`https://pokeapi.co/api/v2/pokemon?limit=151`) con carga concurrente por lotes y caché en memoria para máximo rendimiento.
- **Búsqueda Instantánea**: Búsqueda en tiempo real tanto por nombre (ej. `Charizard`) como por número de Pokédex (ej. `#006` o `6`).
- **Filtro por Tipos Elementales**: 18 filtros temáticos con esquemas de color específicos para cada tipo (Fuego, Agua, Planta, Eléctrico, etc.).
- **Ordenamiento Avanzado**: Por número (# asc/desc), alfabético (A-Z / Z-A) y por Poder Total (Base Stat Total).
- **Modal de Detalle Completo**:
  - Arte oficial en alta resolución y sprite animado de combate.
  - Reproducción del **grito/sonido original** del Pokémon.
  - Barras dinámicas de estadísticas base (HP, Ataque, Defensa, Sp. Atk, Sp. Def, Velocidad).
  - Medidas físicas (altura en metros, peso en kilogramos) y habilidades con indicador de habilidad oculta.
  - Navegación con teclado (Flechas `◀` y `▶`, tecla `ESC`).
- **Gestión de "Mi Equipo" (Favoritos)**:
  - Armado de equipo de hasta 6 Pokémon con persistencia en `localStorage`.
  - Panel lateral con métricas del equipo: Promedio de BST y diversidad de cobertura elemental.
- **Diseño Responsive & Glassmorphism**: Interfaz con micro-animaciones, efectos de luz acordes al tipo elemental y compatibilidad total con dispositivos móviles y escritorio.

---

## 🛠️ Stack Tecnológico

- **Framework**: [React 19](https://react.dev/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Empaquetador**: [Vite](https://vite.dev/)
- **Iconos**: [Lucide React](https://lucide.dev/)
- **Fuente de Datos**: [PokéAPI v2 REST](https://pokeapi.co/api/v2/pokemon?limit=151)

---

## 📁 Estructura del Proyecto

```
src/
├── types/
│   └── pokemon.ts             # Definiciones e interfaces TypeScript
├── services/
│   └── pokemonService.ts      # Cliente de consumo de PokeAPI con caché
├── utils/
│   └── typeColors.ts          # Configuración de colores y gradientes por tipo
├── components/
│   ├── Header.tsx             # Barra superior con buscador y contador
│   ├── TypeFilter.tsx         # Selector de tipos elementales y ordenamiento
│   ├── PokemonCard.tsx        # Tarjeta con imagen oficial y badge de tipos
│   ├── PokemonModal.tsx       # Modal de detalle, stats animadas y audio
│   ├── TeamDrawer.tsx         # Panel de gestión de equipo (hasta 6 Pokémon)
│   ├── LoadingSkeleton.tsx    # Esqueleto de carga animado
│   ├── EmptyState.tsx         # Estado vacío para búsquedas sin resultados
│   └── ErrorState.tsx         # Manejo de error de red con reintento
├── App.tsx                    # Orquestador y lógica de estado principal
├── main.tsx                   # Punto de entrada de React
└── index.css                  # Directivas de Tailwind CSS
```

---

## 💻 Instrucciones para Levantar en Entorno Local

### 1. Clonar el repositorio
```bash
git clone <URL_DE_TU_REPOSITORIO>
cd Actividad2
```

### 2. Instalar dependencias
```bash
pnpm install
# o con npm:
# npm install
```

### 3. Iniciar el servidor de desarrollo
```bash
pnpm run dev
# o con npm:
# npm run dev
```

Abrir en el navegador la dirección indicada en la terminal (por defecto: `http://localhost:5173`).

### 4. Compilar para producción
```bash
pnpm run build
```

---

## 📜 Licencia y Créditos
- Desarrollado con fines académicos para la asignatura de Frameworks.
- Los sprites, datos e imágenes son propiedad de Nintendo, Game Freak y The Pokémon Company a través de la PokéAPI.
