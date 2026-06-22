#!/bin/bash

set -e

echo "Renaming files to lowercase..."

# Models
git mv src/models/Dex.ts src/models/dex.ts 2>/dev/null || true

# Views
git mv src/views/DexView.ts src/views/dexview.ts 2>/dev/null || true
git mv src/views/Navbar.ts src/views/navbar.ts 2>/dev/null || true
git mv src/views/DexSubNav.ts src/views/dexsubnav.ts 2>/dev/null || true
git mv src/views/FilterPanel.ts src/views/filterpanel.ts 2>/dev/null || true
git mv src/views/PokemonCard.ts src/views/pokemoncard.ts 2>/dev/null || true

# Services
git mv src/services/AuthService.ts src/services/authservice.ts 2>/dev/null || true
git mv src/services/PokemonService.ts src/services/pokemonservice.ts 2>/dev/null || true
git mv src/services/DexService.ts src/services/dexservice.ts 2>/dev/null || true

echo "Done."