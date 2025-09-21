
<template>
  <h1>Hola mundo con tailwind</h1>
    <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
    <h1 class="bg-amber-400">
    Hello world!
  </h1>
    <h1 class="">
    Hello world!
  </h1>
  <button class="btn btn-primary">One</button>
<button class="btn btn-secondary">Two</button>
<button class="btn btn-accent btn-outline">Three</button>
  <Counter />
  <Multiplication />
  <Pokemon />

</template>

<script setup>
import Counter from "@/components/Counter.vue";
import Multiplication from "@/components/Multiplication.vue"; 
import Pokemon from "@/components/PokemoncardBuscador.vue"
</script>