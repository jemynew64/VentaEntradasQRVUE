<script setup lang="ts">
import { ref, computed } from "vue";
import fetchPokemonData from "@/services/pokeapi"

const Namepuchamon = ref("")
const pokemonData = ref(null);
const isLoading = ref(false);
const error = ref("");

// Computed para capitalizar el nombre del Pokémon
const capitalizedPokemonName = computed(() => {
  return Namepuchamon.value.charAt(0).toUpperCase() + Namepuchamon.value.slice(1).toLowerCase();
});

async function searchPokemon() {
  if (!Namepuchamon.value.trim()) {
    error.value = "Por favor ingresa el nombre de un Pokémon";
    return;
  }
  
  try {
    isLoading.value = true;
    error.value = "";
    pokemonData.value = null;
    
    pokemonData.value = await fetchPokemonData(Namepuchamon.value.toLowerCase().trim()); 
  } catch (err) {
    error.value = "Pokémon no encontrado 😢 Verifica el nombre e intenta nuevamente";
    pokemonData.value = null;
  } finally {
    isLoading.value = false;
  }
}

// Función para buscar con Enter
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    searchPokemon();
  }
}

// Función para limpiar la búsqueda
function clearSearch() {
  Namepuchamon.value = "";
  pokemonData.value = null;
  error.value = "";
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-amber-50 to-orange-50 py-8">
    <div class="container mx-auto px-4 max-w-4xl">
      
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">🔍 PokéSearch</h1>
        <p class="text-gray-600">Descubre información sobre tu Pokémon favorito</p>
      </div>

      <!-- Search Section -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-8 transform transition-all duration-300 hover:shadow-xl">
        <div class="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <div class="flex-1 max-w-md">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Pokémon
            </label>
            <input 
              type="text" 
              v-model="Namepuchamon"
              @keypress="handleKeyPress"
              placeholder="Ej: Pikachu, Charizard, Bulbasaur..."
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
              :disabled="isLoading"
            >
          </div>
          
          <div class="flex gap-2 mt-6 sm:mt-0">
            <button 
              @click="searchPokemon()"
              :disabled="isLoading || !Namepuchamon.trim()"
              class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 transform hover:scale-105 active:scale-95"
            >
              <span v-if="isLoading" class="animate-spin">⏳</span>
              <span v-else>🔍</span>
              {{ isLoading ? 'Buscando...' : 'Buscar' }}
            </button>
            
            <button 
              @click="clearSearch()"
              v-if="Namepuchamon || pokemonData || error"
              class="px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 transform hover:scale-105 active:scale-95"
              title="Limpiar búsqueda"
            >
              ✖️
            </button>
          </div>
        </div>

        <!-- Preview del nombre mientras se escribe -->
        <div v-if="Namepuchamon && !isLoading" class="mt-4 text-center transition-all duration-300">
          <p class="text-sm text-gray-600">
            Buscando: <span class="font-semibold text-blue-600">{{ capitalizedPokemonName }}</span>
          </p>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 transform transition-all duration-300 animate-pulse">
        <div class="flex items-center">
          <span class="text-red-500 mr-2">⚠️</span>
          <p class="text-red-700">{{ error }}</p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12 transition-all duration-300">
        <div class="animate-spin text-6xl mb-4 transform">⚡</div>
        <p class="text-gray-600">Buscando tu Pokémon...</p>
      </div>

      <!-- Pokemon Card -->
      <div v-if="pokemonData && !isLoading" class="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-xl">
        <div class="lg:flex">
          
          <!-- Image Section -->
          <div class="lg:w-1/3 bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center p-8">
            <div class="text-center">
              <div class="w-48 h-48 mx-auto mb-4 bg-white rounded-full shadow-md flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <img
                  :src="pokemonData.sprite"
                  :alt="pokemonData.name"
                  class="w-40 h-40 object-contain transition-transform duration-300 hover:scale-110"
                />
              </div>
              <h2 class="text-2xl font-bold text-gray-800 capitalize">
                {{ pokemonData.name }}
              </h2>
            </div>
          </div>

          <!-- Info Section -->
          <div class="lg:w-2/3 p-6">
            
            <!-- Types -->
            <div class="mb-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                🏷️ Tipos
              </h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="type in pokemonData.types" 
                  :key="type"
                  class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium transform transition-all duration-200 hover:bg-blue-200 hover:scale-105"
                >
                  {{ type }}
                </span>
              </div>
            </div>

            <!-- Moves -->
            <div class="mb-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                ⚔️ Movimientos
                <span class="ml-2 text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {{ pokemonData.moves.length }} total
                </span>
              </h3>
              
              <div class="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div 
                    v-for="(movimiento, index) in pokemonData.moves" 
                    :key="index"
                    class="bg-white px-3 py-2 rounded-md shadow-sm border-l-4 border-blue-400 transform transition-all duration-200 hover:shadow-md hover:scale-[1.02] hover:border-blue-500"
                  >
                    <p class="text-sm text-gray-700 capitalize">{{ movimiento }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Stats adicionales si las tienes -->
            <div v-if="pokemonData.stats" class="mb-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                📊 Estadísticas
              </h3>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div 
                  v-for="stat in pokemonData.stats" 
                  :key="stat.name"
                  class="bg-gray-50 p-3 rounded-lg text-center transform transition-all duration-200 hover:bg-gray-100 hover:scale-105"
                >
                  <div class="font-semibold text-lg text-blue-600">{{ stat.value }}</div>
                  <div class="text-xs text-gray-600 capitalize">{{ stat.name }}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!pokemonData && !isLoading && !error" class="text-center py-12 transition-all duration-300">
        <div class="text-6xl mb-4 animate-bounce">🎮</div>
        <p class="text-gray-600 text-lg">¡Busca tu Pokémon favorito para comenzar!</p>
        <p class="text-gray-500 text-sm mt-2">Puedes buscar por nombre en español o inglés</p>
      </div>

    </div>
  </div>
</template>