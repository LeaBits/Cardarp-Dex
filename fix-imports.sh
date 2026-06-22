#!/bin/bash

echo "Updating imports..."

find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' \
  -e 's|./views/DexView|./views/dexview|g' \
  -e 's|./views/Navbar|./views/navbar|g' \
  -e 's|./views/DexSubNav|./views/dexsubnav|g' \
  -e 's|./views/FilterPanel|./views/filterpanel|g' \
  -e 's|./views/PokemonCard|./views/pokemoncard|g' \
  -e 's|../views/DexView|../views/dexview|g' \
  -e 's|../views/Navbar|../views/navbar|g' \
  -e 's|../views/DexSubNav|../views/dexsubnav|g' \
  -e 's|../views/FilterPanel|../views/filterpanel|g' \
  -e 's|../views/PokemonCard|../views/pokemoncard|g' \
  -e 's|./models/Dex|./models/dex|g' \
  -e 's|../models/Dex|../models/dex|g' \
  -e 's|./services/authService|./services/authservice|g' \
  -e 's|../services/authService|../services/authservice|g' \
  -e 's|./services/pokemonService|./services/pokemonservice|g' \
  -e 's|../services/pokemonService|../services/pokemonservice|g' \
  -e 's|./services/dexService|./services/dexservice|g' \
  -e 's|../services/dexService|../services/dexservice|g' \
  {} \;

echo "Done."